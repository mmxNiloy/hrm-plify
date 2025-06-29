"use server";
import React, { Suspense } from "react";
import AccessDenied from "@/components/custom/AccessDenied";
import { getCompanyDetails } from "@/app/(server)/actions/getCompanyDetails";
import { Metadata } from "next";
import SiteConfig from "@/utils/SiteConfig";
import { CompanyIDURLParamSchema } from "@/schema/misc/URLParamSchema";
import getAllDepartments from "@/app/(server)/actions/company/department/get-all-departments.controller";
import getCurrentUserPermissions from "@/app/(server)/actions/user/get-current-user-permissions.controller";
import { DataTableError } from "@/components/ui/data-table/data-table-error";
import DepartmentListProvider from "./(ui)/providers/department-list-provider";
import { DesignationTable } from "./(ui)/features";
import { SearchParams } from "nuqs";
import { searchParamsCache, serialize } from "@/utils/searchParamsParsers";
import DataTableSkeleton from "@/components/ui/data-table/data-table-skeleton";
import getCompanyMeta from "@/app/(server)/actions/company/get-company-meta.controller";

interface Props extends CompanyIDURLParamSchema {
  searchParams: Promise<SearchParams>;
}

export async function generateMetadata({
  params,
}: CompanyIDURLParamSchema): Promise<Metadata> {
  const mParams = await params;
  const companyId = mParams.companyId;
  return getCompanyMeta(companyId, "Designations");
}

export default async function DesignationsPage({
  params,
  searchParams,
}: Props) {
  const [mParams, mPermissions, sParams] = await Promise.all([
    params,
    getCurrentUserPermissions(),
    searchParams,
  ]);

  const readAccess = mPermissions?.find((item) => item === "cmp_desg_read");

  if (!readAccess) {
    return <AccessDenied />;
  }

  const companyId = mParams.companyId;
  const deptRes = await getAllDepartments({ companyId });

  if (deptRes.error) {
    return <DataTableError errorMessage="Failed to fetch departments" />;
  }

  const departments = deptRes.payload;

  searchParamsCache.parse(sParams);
  const key = serialize(sParams);

  return (
    <DepartmentListProvider departments={departments}>
      <Suspense key={key} fallback={<DataTableSkeleton columns={6} />}>
        <DesignationTable companyId={companyId} />
      </Suspense>
    </DepartmentListProvider>
  );
}
