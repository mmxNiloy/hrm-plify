"use server";
import { DataTable } from "@/components/ui/data-table/data-table";
import { searchParamsCache } from "@/utils/searchParamsParsers";
import React from "react";
import { columns } from "./columns";
import getEmploymentType from "@/app/(server)/actions/employment-type/get-employment-type.controller";
import { DataTableError } from "@/components/ui/data-table/data-table-error";

export default async function EmploymentTypeTable() {
  const page = searchParamsCache.get("page");
  const limit = searchParamsCache.get("limit");
  const isActive = searchParamsCache.get("isActive");

  const empTypes = await getEmploymentType({ page, limit, isActive });

  if (empTypes.error) {
    console.error("Employment types error", empTypes);
    return <DataTableError errorMessage="Failed to fetch employment types." />;
  }

  const data = empTypes.payload;
  const meta = empTypes.meta!;

  return (
    <DataTable
      columns={columns}
      data={data}
      pageCount={meta.pageCount}
      totalItems={meta.total}
    />
  );
}
