"use server";

import getCurrentUserPermissions from "@/app/(server)/actions/user/get-current-user-permissions.controller";
import AccessDenied from "@/components/custom/AccessDenied";
import DataTableSkeleton from "@/components/ui/data-table/data-table-skeleton";
import { searchParamsCache, serialize } from "@/utils/searchParamsParsers";
import { SearchParams } from "nuqs";
import React, { Suspense } from "react";
import BankTable from "./features/bank-table";

interface Props {
  searchParams: Promise<SearchParams>;
}

export default async function BankPage({ searchParams }: Props) {
  const [sParams, mPermissions] = await Promise.all([
    searchParams,
    getCurrentUserPermissions(),
  ]);

  // Read permissions
  const readPermission = mPermissions?.find((item) => item === "cmp_bank_read");

  if (!readPermission) return <AccessDenied />;

  searchParamsCache.parse(sParams);
  const key = serialize(sParams);
  return (
    <Suspense key={key} fallback={<DataTableSkeleton />}>
      <BankTable />
    </Suspense>
  );
}
