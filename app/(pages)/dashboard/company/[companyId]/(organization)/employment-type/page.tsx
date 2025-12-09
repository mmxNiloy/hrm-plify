"use server";
import React, { Suspense } from "react";
import DataTableSkeleton from "@/components/ui/data-table/data-table-skeleton";
import EmploymentTypeTable from "./features/employment-type-table";
import { Metadata } from "next";
import SiteConfig from "@/utils/SiteConfig";
import { SearchParams } from "nuqs";
import { searchParamsCache, serialize } from "@/utils/searchParamsParsers";
import { CompanyIDURLParamSchema } from "@/schema/misc/URLParamSchema";
import getCompanyMeta from "@/app/(server)/actions/company/get-company-meta.controller";

export async function generateMetadata({
  params,
}: CompanyIDURLParamSchema): Promise<Metadata> {
  const mParams = await params;
  const companyId = mParams.companyId;
  return await getCompanyMeta(companyId, "Employment Types");
}
export default async function EmploymentTypePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sParams = await searchParams;

  searchParamsCache.parse(sParams);
  const key = serialize(sParams);

  return (
    <Suspense key={key} fallback={<DataTableSkeleton rows={10} columns={4} />}>
      <EmploymentTypeTable />
    </Suspense>
  );
}
