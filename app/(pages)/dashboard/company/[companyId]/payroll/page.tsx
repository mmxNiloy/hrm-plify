"use server";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import { getCompanyExtraData } from "@/app/(server)/actions/getCompanyExtraData";
import { getSalaryStructure } from "@/app/(server)/actions/getSalaryStructure";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import WIPPage from "@/components/custom/Placeholder/WIPPage";
import { IUser } from "@/schema/UserSchema";
import { ISearchParamsProps } from "@/utils/Types";
import { cookies } from "next/headers";
import React from "react";
import { CompanyByIDPageProps } from "../PageProps";
import PayrollEditDialog from "@/components/custom/Dialog/Payroll/PayrollEditDialog";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";

interface Props extends ISearchParamsProps, CompanyByIDPageProps {}

export default async function PayRollManagementPage({
  params,
  searchParams,
}: Props) {
  const companyId = (await params).companyId;
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  const [company, salaryStructs, companyExtra] = await Promise.all([
    getCompanyData(companyId),
    getSalaryStructure({
      company_id: companyId,
      searchParams,
    }),
    getCompanyExtraData(companyId),
  ]);

  if (company.error || companyExtra.error) {
    return (
      <main className="container flex flex-col gap-2">
        <p className="text-xl font-semibold">Payroll</p>
        <ErrorFallbackCard error={company.error ?? companyExtra.error} />
      </main>
    );
  }

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Payroll</p>
      <div className="flex items-center justify-between">
        <MyBreadcrumbs company={company.data} user={user} title="Payroll" />

        <PayrollEditDialog
          company_id={company.data.company_id}
          employees={companyExtra.data.employees}
        />
      </div>

      {/* <DataTable
        columns={SalaryStructureDataTableColumns}
        data={salaryStructs.map((item) => ({
          ...item,
          companyEmployees: companyExtra.employees,
        }))}
      /> */}
    </main>
  );
}
