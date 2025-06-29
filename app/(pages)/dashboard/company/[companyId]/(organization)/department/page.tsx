"use server";
import React, { Suspense } from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import { getCompanyDetails } from "@/app/(server)/actions/getCompanyDetails";
import { Metadata } from "next";
import SiteConfig from "@/utils/SiteConfig";
import { Skeleton } from "@/components/ui/skeleton";
import { SearchParams } from "nuqs/server";
import { searchParamsCache, serialize } from "@/utils/searchParamsParsers";
import DataTableSkeleton from "@/components/ui/data-table/data-table-skeleton";
import DepartmentTable from "./features/table/department-table";
import ActionsSkeleton from "./features/actions/actions-skeleton";
import Actions from "./features/actions/actions";
import { CompanyIDURLParamSchema } from "@/schema/misc/URLParamSchema";
import getCompanyMeta from "@/app/(server)/actions/company/get-company-meta.controller";

interface Props extends CompanyIDURLParamSchema {
  searchParams: Promise<SearchParams>;
}

export async function generateMetadata({
  params,
}: CompanyIDURLParamSchema): Promise<Metadata> {
  const prms = await params;
  var companyId = prms.companyId;
  return await getCompanyMeta(companyId, "Departments");
}

export default async function DepartmentPage({ params, searchParams }: Props) {
  const [prms, sParams] = await Promise.all([params, searchParams]);

  searchParamsCache.parse(sParams);
  const key = serialize({ ...sParams });

  var companyId = prms.companyId;

  return (
    <Suspense key={key} fallback={<DataTableSkeleton />}>
      <DepartmentTable companyId={companyId} />
    </Suspense>
  );
}
