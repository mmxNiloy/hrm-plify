"use server";
import { DataTable } from "@/components/ui/data-table/data-table";
import React from "react";
import { columns } from "./columns";
import { searchParamsCache } from "@/utils/searchParamsParsers";
import { DataTableError } from "@/components/ui/data-table/data-table-error";
import { getCompanies } from "@/app/(server)/actions/company/get-companies.controller";

export default async function CompanyListTable() {
  const page = searchParamsCache.get("page");
  const limit = searchParamsCache.get("limit");

  const companies = await getCompanies({ page, limit });

  if (companies.error) {
    return <DataTableError errorMessage="Failed to fetch companies." />;
  }

  const data = companies.payload;
  const meta = companies.meta!;

  return (
    <DataTable
      columns={columns}
      data={data}
      pageCount={meta.pageCount}
      totalItems={meta.total}
    />
  );
}
