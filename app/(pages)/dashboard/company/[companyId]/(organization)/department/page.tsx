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

interface Props extends CompanyByIDPageProps {
  searchParams: Promise<SearchParams>;
}

export async function generateMetadata({
  params,
}: CompanyByIDPageProps): Promise<Metadata> {
  const prms = await params;
  var companyId = prms.companyId;
  const company = await getCompanyDetails(companyId);
  return {
    title: `${SiteConfig.siteName} | ${
      company.data?.company_name ?? "Company Dashboard"
    } | Department`,
  };
}

export default async function DepartmentPage({ params, searchParams }: Props) {
  const [prms, sParams] = await Promise.all([params, searchParams]);

  searchParamsCache.parse(sParams);
  const key = serialize({ ...sParams });

  var companyId = prms.companyId;

  return (
    <main className="container flex flex-col gap-4 sm:gap-6 py-4 sm:py-6">
      <p className="text-lg sm:text-xl md:text-2xl font-semibold">
        Company Departments
      </p>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <Suspense fallback={<Skeleton className="w-3/5 h-4" />}>
          <MyBreadcrumbs companyId={companyId} title="Departments" />
        </Suspense>
        <Suspense fallback={<ActionsSkeleton />}>
          <Actions companyId={companyId} />
        </Suspense>
      </div>

      <Suspense key={key} fallback={<DataTableSkeleton />}>
        <DepartmentTable companyId={companyId} />
      </Suspense>
    </main>
  );
}
