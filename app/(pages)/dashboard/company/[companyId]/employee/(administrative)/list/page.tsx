"use server";

import getCompanyMeta from "@/app/(server)/actions/company/get-company-meta.controller";
import DataTableSkeleton from "@/components/ui/data-table/data-table-skeleton";
import { CompanyIDURLParamSchema } from "@/schema/misc/URLParamSchema";
import { searchParamsCache, serialize } from "@/utils/searchParamsParsers";
import { Metadata } from "next";
import { SearchParams } from "nuqs";
import React, { Suspense } from "react";
import EmployeeTable from "./features/table/employee-table";
import getCurrentUserPermissions from "@/app/(server)/actions/user/get-current-user-permissions.controller";
import AccessDenied from "@/components/custom/AccessDenied";
export async function generateMetadata({
  params,
}: CompanyIDURLParamSchema): Promise<Metadata> {
  const mParams = await params;
  const companyId = mParams.companyId;
  return await getCompanyMeta(companyId, "Employee List");
}

interface Props extends CompanyIDURLParamSchema {
  searchParams: Promise<SearchParams>;
}

export default async function EmployeeListPage({
  searchParams,
  params,
}: Props) {
  const [mParams, sParams, mPermissions] = await Promise.all([
    params,
    searchParams,
    getCurrentUserPermissions(),
  ]);
  const companyId = mParams.companyId;

  const readAccess = mPermissions?.find((item) => item === "cmp_emp_read");
  const updateAccess = mPermissions?.find((item) => item === "cmp_emp_update");

  if (!readAccess) return <AccessDenied />;

  searchParamsCache.parse(sParams);
  const page = searchParamsCache.get("page");
  const limit = searchParamsCache.get("limit");
  const isForeign = searchParamsCache.get("isForeign");
  const employeeStatus = searchParamsCache.get("employeeStatus");

  const key = serialize({
    page,
    limit,
    isForeign,
    employeeStatus,
  });
  return (
    <>
      <Suspense key={key} fallback={<DataTableSkeleton />}>
        <EmployeeTable updateAccess={!!updateAccess} companyId={companyId} />
      </Suspense>
    </>
  );
}
