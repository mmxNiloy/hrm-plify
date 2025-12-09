"use server";

import getEmployees from "@/app/(server)/actions/company/employee/get-employees.controller";
import { DataTable } from "@/components/ui/data-table/data-table";
import { DataTableError } from "@/components/ui/data-table/data-table-error";
import { searchParamsCache } from "@/utils/searchParamsParsers";
import React from "react";
import { columns } from "./columns";

interface Props {
  companyId: string;
  updateAccess?: boolean;
}

export default async function EmployeeTable({
  companyId,
  updateAccess,
}: Props) {
  const page = searchParamsCache.get("page");
  const limit = searchParamsCache.get("limit");
  const isForeign = searchParamsCache.get("isForeign");
  const employeeStatus = searchParamsCache.get("employeeStatus");

  const employees = await getEmployees({
    companyId,
    page,
    limit,
    isForeign,
    employeeStatus,
  });

  // console.log("Employees", employees);

  if (employees.error) {
    return <DataTableError errorMessage="Failed to fetch employees" />;
  }

  const data = employees.payload;
  const meta = employees.meta!;

  return (
    <DataTable
      data={data.map((item) => ({ ...item, updateAccess }))}
      columns={columns}
      pageCount={meta.pageCount}
      totalItems={meta.total}
    />
  );
}
