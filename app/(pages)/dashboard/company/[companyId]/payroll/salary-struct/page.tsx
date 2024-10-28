"use server";
import React from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import { DataTable } from "@/components/ui/data-table";
import { ILeaveType } from "@/schema/LeaveSchema";
import { ISearchParamsProps } from "@/utils/Types";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import { getCompanyLeaveTypes } from "@/app/(server)/actions/getCompanyLeaveTypes";
import LeaveTypeEditDialog from "@/components/custom/Dialog/Leave/LeaveTypeEditDialog";
import { LeaveTypeDataTableColumns } from "@/components/custom/DataTable/Columns/Leave/LeaveTypeDataTableColumns";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import { ISalaryStructure } from "@/schema/Payroll";
import { getSalaryStructure } from "@/app/(server)/actions/getSalaryStructure";
import { SalaryStructureDataTableColumns } from "@/components/custom/DataTable/Columns/Payroll/SalaryStructureDataTableColumns";
import { getCompanyExtraData } from "@/app/(server)/actions/getCompanyExtraData";
import SalaryStructureEditDialog from "@/components/custom/Dialog/Payroll/SalaryStructureEditDialog";

interface Props extends CompanyByIDPageProps, ISearchParamsProps {}

export default async function SalaryStructPage({
  params,
  searchParams,
}: Props) {
  const user = JSON.parse(
    cookies().get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  const [company, salaryStructs, companyExtra] = await Promise.all([
    getCompanyData(params.companyId),
    getSalaryStructure({
      company_id: params.companyId,
      searchParams,
    }),
    getCompanyExtraData(params.companyId),
  ]);

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Leave Type</p>
      <div className="flex items-center justify-between">
        <MyBreadcrumbs
          company={company}
          user={user}
          parent="Leave"
          title="Leave Type"
        />

        <SalaryStructureEditDialog
          company_id={company.company_id}
          employees={companyExtra.employees}
        />
      </div>

      <DataTable
        columns={SalaryStructureDataTableColumns}
        data={salaryStructs.map((item) => ({
          ...item,
          companyEmployees: companyExtra.employees,
        }))}
      />
    </main>
  );
}
