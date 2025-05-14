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
import { DataTable, DataTableSkeleton } from "@/components/ui/data-table";
import { ChangeOfCircumstancesDataTableColumns } from "@/components/custom/DataTable/Columns/Company/ChangeOfCircumstancesDataTableColumns";
import { getEmployeeData } from "@/app/(server)/actions/getEmployeeData";
import getChangeOfCircumstances from "@/app/(server)/actions/change-of-circumstances/get-change-of-circumstances.controller";

interface IChangeOfCircumstancesPageProps {
  params: Promise<{ companyId: string }>;
  searchParams: Promise<SearchParams>;
}

export default async function EmployeeChangeOfCircumstancesPage({
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

  const [company, employee] = await Promise.all([
    getCompanyData(cId),
    getEmployeeData(),
  ]);

  if (company.error || employee.error) {
    return (
      <main className="container flex flex-col gap-2">
        <p className="text-xl font-semibold">Change of Circumstances</p>
        <ErrorFallbackCard error={company.error || employee.error} />
      </main>
    );
  }

  const cocData = await getChangeOfCircumstances({
    employeeId: employee.data.data?.employee_id ?? 0,
  });

  if (!cocData.ok) {
    return (
      <ErrorFallbackCard
        error={new Error("Failed to get change of circumstances data")}
      />
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

        {/* <EmployeeCombobox employees={companyExtra.data.employees} /> */}
      </div>

      <DataTable
        data={cocData.data.data}
        columns={ChangeOfCircumstancesDataTableColumns}
      />
    </main>
  );
}
