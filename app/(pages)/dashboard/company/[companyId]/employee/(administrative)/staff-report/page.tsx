"use server";
import React from "react";
import { CompanyByIDPageProps } from "../../../PageProps";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import { TPermission } from "@/schema/Permissions";
import { getCompanyStaffReportPaginated } from "@/app/(server)/actions/getCompanyStaffReportPaginated";
import { ISearchParamsProps } from "@/utils/Types";
import { getPaginationParams } from "@/utils/Misc";
import { StaticDataTable } from "@/components/ui/data-table";
import { StaffReportDataTableColumns } from "@/components/custom/DataTable/Columns/Company/Employee/StaffReportDataTableColumns";
import StaffReportGenerator from "@/components/custom/PDF/StaffReportGenerator";
import { getCompanyDetails } from "@/app/(server)/actions/getCompanyDetails";
import { Metadata } from "next";
import SiteConfig from "@/utils/SiteConfig";
import { notFound } from "next/navigation";
import { DataTable } from "@/components/ui/data-table/data-table";

interface Props extends CompanyByIDPageProps, ISearchParamsProps {}

export async function generateMetadata({
  params,
}: CompanyByIDPageProps): Promise<Metadata> {
  const mParams = await params;
  const companyId = mParams.companyId;
  const company = await getCompanyDetails(companyId);
  return {
    title: `${SiteConfig.siteName} | ${
      company.data?.company_name ?? "Company Dashboard"
    } | Staff Report`,
  };
}

export default async function StaffReportPage({ params, searchParams }: Props) {
  const mCookies = await cookies();
  // TODO: Check Permissions here
  //   const readAccess = mPermissions.find((item) => item === "cmp_job_read");
  //   const writeAccess = mPermissions.find((item) => item === "cmp_job_create");
  //   const updateAccess = mPermissions.find((item) => item === "cmp_job_update");

  //   if (!readAccess) {
  //     return <AccessDenied />;
  //   }
  const mParams = await params;
  const companyId = mParams.companyId;

  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  const sParams = await searchParams;
  const { page, limit } = getPaginationParams(sParams);

  const [company, staffReports] = await Promise.all([
    getCompanyData(companyId),
    getCompanyStaffReportPaginated({
      companyId: Number.parseInt(companyId),
      page,
      limit,
    }),
  ]);

  if (company.error || staffReports.error) {
    return notFound();
  }

  //   console.log("Staff report found >", staffReports);

  return (
    <DataTable
      pageCount={staffReports.data.total_page}
      data={staffReports.data.data}
      columns={StaffReportDataTableColumns}
    />
  );
}
