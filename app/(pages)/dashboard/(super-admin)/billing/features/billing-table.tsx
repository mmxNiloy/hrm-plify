"use server";

import getCurrentUserPermissions from "@/app/(server)/actions/user/get-current-user-permissions.controller";
import { DataTable } from "@/components/ui/data-table/data-table";
import { DataTableError } from "@/components/ui/data-table/data-table-error";
import { searchParamsCache } from "@/utils/searchParamsParsers";
import React from "react";
import { columns } from "./table/column";
import getBillings from "@/app/(server)/actions/billing/get-billings.controller";

export default async function BillingTable() {
  const page = searchParamsCache.get("page");
  const limit = searchParamsCache.get("limit");
  const search = searchParamsCache.get("search");

  const [billingData, mPermissions] = await Promise.all([
    getBillings({
      page,
      limit,
      search,
    }),
    getCurrentUserPermissions(),
  ]);

  const updateAccess = mPermissions?.find(
    (item) => item === "sys_billing_update"
  );

  console.log("Billing Data", billingData);

  if (billingData.error) {
    return <DataTableError errorMessage="Failed to fetch banks." />;
  }

  const billings = billingData.payload;
  const meta = billingData.meta!;

  return (
    <DataTable
      columns={columns}
      data={billings.map((item) => ({ ...item, updateAccess: !!updateAccess }))}
      pageCount={meta.pageCount}
      totalItems={meta.total}
    />
  );
}
