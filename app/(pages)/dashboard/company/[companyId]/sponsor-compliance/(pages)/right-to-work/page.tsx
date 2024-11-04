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
import { StaticDataTable } from "@/components/ui/data-table";
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
  const companyId = (await params).companyId;
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  const { limit, page } = getPaginationParams(sParams);

  const [company, companyExtra, rtws] = await Promise.all([
    getCompanyDetails(companyId),
    getCompanyExtraData(companyId),
    getCompanyRightToWorkChecks({ companyId, page, limit, experimental: true }),
  ]);

  if (company.error || companyExtra.error || rtws.error) {
    return (
      <main className="container flex flex-col gap-2">
        <p className="text-xl font-semibold">Sponsor Management Dossier</p>

        <ErrorFallbackCard
          error={company.error ?? companyExtra.error ?? rtws.error}
        />
      </main>
    );
  }

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Monitoring and Reporting</p>

      <div className="flex items-center justify-between">
        <MyBreadcrumbs
          company={company.data}
          user={user}
          parent={"Sponsor Compliance"}
          title={"Monitoring"}
        />

        <RTWEditDialog
          company_id={companyId}
          employees={companyExtra.data.employees}
        />
      </div>
      <StaticDataTable
        columns={CompanyRTWDataTableColumns}
        data={rtws.data.data}
        pageCount={rtws.data.total_page}
      />
    </main>
  );
}
