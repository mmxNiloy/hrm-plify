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
import { DataTableSkeleton } from "@/components/ui/data-table";
import { ChangeOfCircumstancesDataTableColumns } from "@/components/custom/DataTable/Columns/Company/ChangeOfCircumstancesDataTableColumns";

interface IChangeOfCircumstancesPageProps {
  params: Promise<{ companyId: string }>;
  searchParams: Promise<SearchParams>;
}

export default async function ChangeOfCircumstancesPage({
  params,
  searchParams,
}: IChangeOfCircumstancesPageProps) {
  const [sParams, mParams, mCookies] = await Promise.all([
    searchParams,
    params,
    cookies(),
  ]);

  searchParamsCache.parse(sParams);
  const key = serialize({ ...sParams });

  const user = JSON.parse(
    mCookies.get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  const cId = Number.parseInt(mParams.companyId);

  const [company, companyExtra] = await Promise.all([
    getCompanyData(cId),
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
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Change of Circumstances</p>
      <div className="flex items-center justify-between">
        <MyBreadcrumbs
          title="Change of Circumstances"
          parent="Employee Management"
          company={company.data}
          user={user}
        />

        <EmployeeCombobox employees={companyExtra.data.employees} />
      </div>

      <Suspense
        key={key}
        fallback={
          <DataTableSkeleton columns={ChangeOfCircumstancesDataTableColumns} />
        }
      >
        <ChangeOfCircumstancesDataTable />
      </Suspense>
    </main>
  );
}
