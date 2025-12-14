"use server";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import React from "react";
import { CompanyByIDPageProps } from "../../../PageProps";
import { getCompanyDetails } from "@/app/(server)/actions/getCompanyDetails";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import { getCompanyEmployeeDocuments } from "@/app/(server)/actions/getCompanyEmployeeDocuments";
import { ISearchParamsProps } from "@/utils/Types";
import { getPaginationParams } from "@/utils/Misc";
import { DataTable } from "@/components/ui/data-table/data-table";
import { EmployeeDocumentDataTableColumns } from "@/components/custom/DataTable/Columns/Company/Employee/EmployeeDocumentDataTableColumns";
import { getCompanyRightToWorkChecks } from "@/app/(server)/actions/getCompanyRightToWorkChecks";
import { CompanyRTWDataTableColumns } from "@/components/custom/DataTable/Columns/Company/CompanyRTWDataTableColumns";
import { getDutyRosters } from "@/app/(server)/actions/getDutyRosters";
import RTWEditDialog from "@/components/custom/Dialog/Company/RTWEditDialog";
import { getCompanyEmployees } from "@/app/(server)/actions/getCompanyEmployees";
import { getCompanyExtraData } from "@/app/(server)/actions/getCompanyExtraData";

interface Props extends CompanyByIDPageProps, ISearchParamsProps {}

export default async function SCRightToWorkPage({
  params,
  searchParams,
}: Props) {
  const sParams = await searchParams;
  const mParams = await params;
  const companyId = mParams.companyId;
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  const { limit, page } = getPaginationParams(sParams);

  const [company, companyExtra, rtws] = await Promise.all([
    getCompanyDetails(companyId),
    getCompanyExtraData(Number.parseInt(companyId)),
    getCompanyRightToWorkChecks({
      companyId: Number.parseInt(companyId),
      page,
      limit,
    }),
  ]);

  if (company.error || companyExtra.error || rtws.error) {
    return (
      <main className="container flex flex-col gap-4 sm:gap-6 py-4 sm:py-6">
        <p className="text-lg sm:text-xl md:text-2xl font-semibold">
          Right to Work Checks
        </p>

        <ErrorFallbackCard
          error={company.error ?? companyExtra.error ?? rtws.error}
        />
      </main>
    );
  }

  return (
    <div className="w-full flex flex-col gap-4 sm:gap-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-lg sm:text-xl md:text-2xl font-semibold">
            Right to Work Checks
          </p>

          <MyBreadcrumbs parent={"Sponsor Compliance"} title={"Monitoring"} />
        </div>

        <RTWEditDialog
          company_id={Number.parseInt(companyId)}
          employees={companyExtra.data.employees}
        />
      </div>
      <DataTable
        columns={CompanyRTWDataTableColumns}
        data={rtws.data.data.map((item) => ({
          ...item.body,
          employee: item.employee,
          company_employees: companyExtra.data.employees,
          id: item.id,
        }))}
        pageCount={rtws.data.total_page}
        totalItems={rtws.data.data_count}
      />
    </div>
  );
}
