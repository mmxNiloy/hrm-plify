"use server";
import { DataTable } from "@/components/ui/data-table/data-table";
import React from "react";
import { columns } from "./columns";
import { searchParamsCache } from "@/utils/searchParamsParsers";
import { DataTableError } from "@/components/ui/data-table/data-table-error";
import getSystemUsers from "@/app/(server)/actions/user/system-user/get-system-users.controller";
import getPermissions from "@/app/(server)/actions/permissions/get-permissions.controller";
import getCurrentUserPermissions from "@/app/(server)/actions/user/get-current-user-permissions.controller";

export default async function SystemUserTable() {
  const page = searchParamsCache.get("page");
  const limit = searchParamsCache.get("limit");
  const isActive = searchParamsCache.get("isActive");

  const [users, permissions, perms] = await Promise.all([
    getSystemUsers({
      page,
      limit,
      isActive,
    }),
    getPermissions({ isActive: true }),
    getCurrentUserPermissions(),
  ]);

  if (users.error) {
    return <DataTableError errorMessage="Failed to fetch system users." />;
  }

  if (permissions.error) {
    return <DataTableError errorMessage="Failed to fetch permissions." />;
  }

  const data = users.payload;
  const meta = users.meta!;

  return (
    <DataTable
      columns={columns}
      data={data.map((item) => ({
        ...item,
        permissions: permissions.payload,
        updateAccess: !!perms?.find((item) => item === "sys_user_update"),
      }))}
      pageCount={meta.pageCount}
      totalItems={meta.total}
    />
  );
}
