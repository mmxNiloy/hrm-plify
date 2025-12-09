"use server";

import getBanks from "@/app/(server)/actions/bank/get-banks.controller";
import getCurrentUserPermissions from "@/app/(server)/actions/user/get-current-user-permissions.controller";
import { DataTable } from "@/components/ui/data-table/data-table";
import { DataTableError } from "@/components/ui/data-table/data-table-error";
import { searchParamsCache } from "@/utils/searchParamsParsers";
import React from "react";
import { columns } from "./table/columns";

export default async function BankTable() {
  const page = searchParamsCache.get("page");
  const limit = searchParamsCache.get("limit");
  const search = searchParamsCache.get("search");

  const [bankData, mPermissions] = await Promise.all([
    getBanks({
      page,
      limit,
      search,
    }),
    getCurrentUserPermissions(),
  ]);

  const updateAccess = mPermissions?.find((item) => item === "cmp_bank_update");

  if (bankData.error) {
    return <DataTableError errorMessage="Failed to fetch banks." />;
  }

  const banks = bankData.payload;
  const meta = bankData.meta!;

  return (
    <DataTable
      columns={columns}
      data={banks.map((item) => ({ ...item, updateAccess: !!updateAccess }))}
      pageCount={meta.pageCount}
      totalItems={meta.total}
    />
  );
}
