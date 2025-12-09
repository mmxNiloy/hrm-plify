"use server";
import React, { Suspense } from "react";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import ChangeOfCircumstancesDataTable from "@/components/custom/DataTable/Company/Employee/ChangeOfCircumstancesDataTable";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import { getCompanyExtraData } from "@/app/(server)/actions/getCompanyExtraData";
import { SearchParams } from "nuqs";
import { searchParamsCache, serialize } from "@/utils/searchParamsParsers";
import EmployeeCombobox from "@/components/custom/Select/EmployeeCombobox";
import DataTableSkeleton from "@/components/ui/data-table/data-table-skeleton";
import { ChangeOfCircumstancesDataTableColumns } from "@/components/custom/DataTable/Columns/Company/ChangeOfCircumstancesDataTableColumns";
import { Skeleton } from "@/components/ui/skeleton";

interface IChangeOfCircumstancesPageProps {
  params: Promise<{ companyId: string }>;
  searchParams: Promise<SearchParams>;
}

export default async function ChangeOfCircumstancesPage({
  params,
  searchParams,
}: IChangeOfCircumstancesPageProps) {
  const [sParams, mParams] = await Promise.all([searchParams, params]);

  searchParamsCache.parse(sParams);
  const key = serialize({ ...sParams });

  const cId = Number.parseInt(mParams.companyId);

  const [company, companyExtra] = await Promise.all([
    getCompanyData(mParams.companyId),
    getCompanyExtraData(cId),
  ]);

  if (company.error || companyExtra.error) {
    return (
      <main className="container flex flex-col gap-2">
        <p className="text-xl font-semibold">Change of Circumstances</p>
        <ErrorFallbackCard error={company.error} />
      </main>
    );
  }

  return (
    <Suspense key={key} fallback={<DataTableSkeleton columns={8} />}>
      <ChangeOfCircumstancesDataTable />
    </Suspense>
  );
}
