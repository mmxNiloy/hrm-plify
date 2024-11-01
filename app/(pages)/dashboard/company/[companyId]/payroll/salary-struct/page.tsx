"use server";
import React from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import { DataTable, StaticDataTable } from "@/components/ui/data-table";
import { ISearchParamsProps } from "@/utils/Types";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import { getSalaryStructure } from "@/app/(server)/actions/getSalaryStructure";
import { SalaryStructureDataTableColumns } from "@/components/custom/DataTable/Columns/Payroll/SalaryStructureDataTableColumns";
import { getCompanyExtraData } from "@/app/(server)/actions/getCompanyExtraData";
import SalaryStructureEditDialog from "@/components/custom/Dialog/Payroll/SalaryStructureEditDialog";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import { getPaginationParams } from "@/utils/Misc";

interface Props extends CompanyByIDPageProps, ISearchParamsProps {}

export default async function SalaryStructPage({
  params,
  searchParams,
}: Props) {
  const { page, limit } = getPaginationParams(await searchParams);
  const companyId = (await params).companyId;
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  const [company, salaryStructs, companyExtra] = await Promise.all([
    getCompanyData(companyId),
    getSalaryStructure({
      company_id: companyId,
      page,
      limit,
    }),
    getCompanyExtraData(companyId),
  ]);

  if (company.error || companyExtra.error || salaryStructs.error) {
    return (
      <main className="container flex flex-col gap-2">
        <p className="text-xl font-semibold">Salary Structure</p>
        <ErrorFallbackCard
          error={company.error ?? companyExtra.error ?? salaryStructs.error}
        />
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

      <StaticDataTable
        columns={SalaryStructureDataTableColumns}
        data={salaryStructs.data.data.map((item) => ({
          ...item,
          companyEmployees: companyExtra.data.employees,
        }))}
        pageCount={salaryStructs.data.total_page}
      />
    </main>
  );
}
