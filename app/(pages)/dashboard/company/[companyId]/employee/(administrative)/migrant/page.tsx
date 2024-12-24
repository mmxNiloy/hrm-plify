"use server";
import React from "react";
import { CompanyByIDPageProps } from "../../../PageProps";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import { getCompanyExtraData } from "@/app/(server)/actions/getCompanyExtraData";
import EmployeeOnboardingDialog from "@/components/custom/Dialog/Company/EmployeeOnboardingDialog";
import { ISearchParamsProps } from "@/utils/Types";
import { getPaginationParams } from "@/utils/Misc";
import { StaticDataTable } from "@/components/ui/data-table";
import { CompanyUserDataTableColumns } from "@/components/custom/DataTable/Columns/Company/CompanyUserDataTableColumns";
import { getCompanyEmployees } from "@/app/(server)/actions/getCompanyEmployees";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import { getCompanyDetails } from "@/app/(server)/actions/getCompanyDetails";
import { Metadata } from "next";

interface MigrantEmployeePageProps
  extends ISearchParamsProps,
    CompanyByIDPageProps {}

export async function generateMetadata({
  params,
}: CompanyByIDPageProps): Promise<Metadata> {
  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);
  const company = await getCompanyDetails(companyId);
  return {
    title: `Artemis | ${
      company.data?.company_name ?? "Company Dashboard"
    } | Migrant Employees`,
  };
}

export default async function MigrantEmployeePage({
  params,
  searchParams,
}: MigrantEmployeePageProps) {
  // Get company information
  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);
  const sParams = await searchParams;
  const { limit, page } = getPaginationParams(sParams);

  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  const [company, companyExtraData, employees] = await Promise.all([
    getCompanyData(companyId),
    getCompanyExtraData(companyId),
    getCompanyEmployees({
      companyId,
      page,
      limit,
      showMigrantEmployeesOnly: true,
    }),
  ]);

  if (company.error || companyExtraData.error || employees.error) {
    return (
      <main className="container flex flex-col gap-2">
        <p className="text-xl font-semibold">Migrant Employees</p>
        <ErrorFallbackCard
          error={company.error ?? companyExtraData.error ?? employees.error}
        />
      </main>
    );
  }

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Migrant Employees</p>
      <div className="flex items-center justify-between">
        <MyBreadcrumbs
          company={company.data}
          user={user}
          parent={"Company Management"}
          title={"Migrant Employees"}
        />
      </div>

      <StaticDataTable
        data={employees.data.data.map((item) => ({ ...item }))}
        columns={CompanyUserDataTableColumns}
        pageCount={employees.data.total_page}
      />
    </main>
  );
}
