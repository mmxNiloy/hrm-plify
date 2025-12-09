"use server";

import { getCompanyAdmins } from "@/app/(server)/actions/company/admin/get-company-admins.controller";
import { DataTable } from "@/components/ui/data-table/data-table";
import { DataTableError } from "@/components/ui/data-table/data-table-error";
import { searchParamsCache } from "@/utils/searchParamsParsers";
import React from "react";
import { columns } from "./columns";

export default async function CompanyAdminTable({
  companyId,
  updateAccess,
}: {
  companyId: string;
  updateAccess?: boolean;
}) {
  const page = searchParamsCache.get("page");
  const limit = searchParamsCache.get("limit");

  const adminRes = await getCompanyAdmins({ companyId, page, limit });

  if (adminRes.error) {
    return <DataTableError errorMessage="Failed to fetch company admins" />;
  }

  const admins = adminRes.payload;
  const meta = adminRes.meta!;

  return (
    <DataTable
      data={admins.map((item) => ({ ...item, updateAccess }))}
      columns={columns}
      pageCount={meta.pageCount}
      totalItems={meta.total}
    />
  );
}
