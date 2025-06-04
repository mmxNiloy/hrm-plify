"use server";
import { getDepartments } from "@/app/(server)/actions/getDepartments";
import AccessDenied from "@/components/custom/AccessDenied";
import { StaticDataTable } from "@/components/ui/data-table";
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

  const paginatedDepartments = await getDepartments({
    company_id: companyId,
    page,
    limit,
  });

  if (paginatedDepartments.error) {
    return <DataTableError />;
  }

  return (
    <DataTable
      data={paginatedDepartments.data.data.map((item) => ({
        ...item,
        updateAccess: updateAccess ? true : false,
      }))}
      totalItems={paginatedDepartments.data.data_count}
      pageCount={paginatedDepartments.data.total_page}
      columns={columns}
    />
  );
}
