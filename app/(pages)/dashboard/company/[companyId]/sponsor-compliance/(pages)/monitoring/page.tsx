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

interface Props extends CompanyByIDPageProps, ISearchParamsProps {}

export default async function SCMonitoringPage({
  params,
  searchParams,
}: Props) {
  const sParams = await searchParams;
  const mParams = await params;
  const companyId = mParams.companyId;

  const { limit, page } = getPaginationParams(sParams);

  const [company, empDocs] = await Promise.all([
    getCompanyDetails(companyId),
    getCompanyEmployeeDocuments({
      companyId: Number.parseInt(companyId),
      page,
      limit,
    }),
  ]);

  if (company.error || empDocs.error) {
    return (
      <main className="container flex flex-col gap-2">
        <p className="text-xl font-semibold">Sponsor Management Dossier</p>

        <ErrorFallbackCard error={company.error ?? empDocs.error} />
      </main>
    );
  }

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Monitoring and Reporting</p>

      <MyBreadcrumbs parent={"Sponsor Compliance"} title={"Monitoring"} />

      <StaticDataTable
        columns={EmployeeDocumentDataTableColumns}
        data={empDocs.data.data}
        pageCount={empDocs.data.total_page}
      />
    </main>
  );
}
