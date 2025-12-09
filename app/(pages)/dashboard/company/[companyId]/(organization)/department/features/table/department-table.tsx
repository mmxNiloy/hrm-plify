"use server";
import getDepartments from "@/app/(server)/actions/company/department/get-departments.controller";
import AccessDenied from "@/components/custom/AccessDenied";
import { DataTable } from "@/components/ui/data-table/data-table";
import { DataTableError } from "@/components/ui/data-table/data-table-error";
import { TPermission } from "@/schema/Permissions";
import { searchParamsCache } from "@/utils/searchParamsParsers";
import { cookies } from "next/headers";
import React from "react";
import { columns } from "./columns";

export default async function DepartmentTable({
  companyId,
}: {
  companyId: string;
}) {
  const mCookies = await cookies();
  const mPermissions = JSON.parse(
    mCookies.get(process.env.NEXT_PUBLIC_COOKIE_USER_ACCESS_KEY!)?.value ?? "[]"
  ) as TPermission[];

  const readAccess = mPermissions.find((item) => item === "cmp_dept_read");
  const updateAccess = mPermissions.find((item) => item === "cmp_dept_update");

  if (!readAccess) {
    return <AccessDenied className="h-[60vh]" />;
  }

  const page = searchParamsCache.get("page") ?? 1;
  const limit = searchParamsCache.get("limit") ?? 10;
  const search = searchParamsCache.get("search") ?? "";
  const isActive = searchParamsCache.get("status") ?? "all";

  const paginatedDepartments = await getDepartments({
    companyId,
    page,
    limit,
    search,
    isActive,
  });

  if (paginatedDepartments.error) {
    return <DataTableError errorMessage="Failed to fetch departments." />;
  }

  const departments = paginatedDepartments.payload;
  const meta = paginatedDepartments.meta!;

  return (
    <DataTable
      data={departments.map((item) => ({
        ...item,
        updateAccess: !!updateAccess,
      }))}
      totalItems={meta.total}
      pageCount={meta.pageCount}
      columns={columns}
    />
  );
}
