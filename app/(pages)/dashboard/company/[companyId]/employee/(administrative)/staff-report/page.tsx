"use server";
import React from "react";
import { CompanyByIDPageProps } from "../../../PageProps";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import { TPermission } from "@/schema/Permissions";
import CompanyEmployeeSelect from "@/components/custom/Select/CompanyEmployeeSelect";
import { getCompanyExtraData } from "@/app/(server)/actions/getCompanyExtraData";
import { getCompanyStaffReportPaginated } from "@/app/(server)/actions/getCompanyStaffReportPaginated";
import { ISearchParamsProps } from "@/utils/Types";
import { getPaginationParams } from "@/utils/Misc";
import { StaticDataTable } from "@/components/ui/data-table";
import { StaffReportDataTableColumns } from "@/components/custom/DataTable/Columns/Company/Employee/StaffReportDataTableColumns";
import StaffReportGenerator from "@/components/custom/PDF/StaffReportGenerator";
import { getCompanyDetails } from "@/app/(server)/actions/getCompanyDetails";
import { Metadata } from "next";
import SiteConfig from "@/utils/SiteConfig";

interface Props extends CompanyByIDPageProps, ISearchParamsProps {}

export async function generateMetadata({
  params,
}: CompanyByIDPageProps): Promise<Metadata> {
  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);
  const company = await getCompanyDetails(companyId);
  return {
    title: `${SiteConfig.siteName} | ${
      company.data?.company_name ?? "Company Dashboard"
    } | Staff Report`,
  };
}

export default async function StaffReportPage({ params, searchParams }: Props) {
  const mCookies = await cookies();
  const mPermissions = JSON.parse(
    mCookies.get(process.env.NEXT_PUBLIC_COOKIE_USER_ACCESS_KEY!)?.value ?? "[]"
  ) as TPermission[];

  // TODO: Check Permissions here
  //   const readAccess = mPermissions.find((item) => item === "cmp_job_read");
  //   const writeAccess = mPermissions.find((item) => item === "cmp_job_create");
  //   const updateAccess = mPermissions.find((item) => item === "cmp_job_update");

  //   if (!readAccess) {
  //     return <AccessDenied />;
  //   }

  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);

  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  const sParams = await searchParams;
  const { page, limit } = getPaginationParams(sParams);

  const [company, staffReports] = await Promise.all([
    getCompanyData(companyId),
    getCompanyStaffReportPaginated({ companyId, page, limit }),
  ]);

  if (company.error || staffReports.error) {
    return (
      <main className="container flex flex-col gap-2">
        <p className="text-xl font-semibold">Job Applications</p>
        <ErrorFallbackCard error={company.error || staffReports.error} />
      </main>
    );
  }

  //   console.log("Staff report found >", staffReports);

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Job Applications</p>
      <div className="flex items-center justify-between">
        <MyBreadcrumbs
          company={company.data}
          user={user}
          parent="Employee Dashboard"
          title="Staff Report"
        />

        {/* Download PDF button here */}
        <StaffReportGenerator company={company.data} />
      </div>

      <StaticDataTable
        pageCount={staffReports.data.total_page}
        data={staffReports.data.data}
        columns={StaffReportDataTableColumns}
      />
    </main>
  );
}
