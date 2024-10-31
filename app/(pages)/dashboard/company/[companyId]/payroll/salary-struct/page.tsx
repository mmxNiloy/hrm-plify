"use server";
import React from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import { DataTable } from "@/components/ui/data-table";
import { ISearchParamsProps } from "@/utils/Types";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import { getSalaryStructure } from "@/app/(server)/actions/getSalaryStructure";
import { SalaryStructureDataTableColumns } from "@/components/custom/DataTable/Columns/Payroll/SalaryStructureDataTableColumns";
import { getCompanyExtraData } from "@/app/(server)/actions/getCompanyExtraData";
import SalaryStructureEditDialog from "@/components/custom/Dialog/Payroll/SalaryStructureEditDialog";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";

interface Props extends CompanyByIDPageProps, ISearchParamsProps {}

export default async function SalaryStructPage({
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
        <p className="text-xl font-semibold">Salary Structure</p>
        <ErrorFallbackCard error={company.error ?? companyExtra.error} />
      </main>
    );
  }

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Salary Structure</p>
      <div className="flex items-center justify-between">
        <MyBreadcrumbs
          company={company.data}
          user={user}
          parent="Payroll"
          title="Salary Structure"
        />

        <SalaryStructureEditDialog
          company_id={companyId}
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
