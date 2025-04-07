"use server";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import React from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import { getCompanyExtraData } from "@/app/(server)/actions/getCompanyExtraData";
import AttendanceReportFilterPopover from "@/components/custom/Popover/Attendance/AttendanceReportFilterPopover";
import { ISearchParams, ISearchParamsProps } from "@/utils/Types";
import { getPaginationParams } from "@/utils/Misc";
import { StaticDataTable } from "@/components/ui/data-table";
import { AttendanceReportDataTableColumns } from "@/components/custom/DataTable/Columns/Attendance/AttendanceReportDataTableColumns";
import { getAbsentReports } from "@/app/(server)/actions/getAbsentReport";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import AbsentReportGenerator from "@/components/custom/PDF/AbsentReportGenerator";
import { getCompanyDetails } from "@/app/(server)/actions/getCompanyDetails";
import { Metadata } from "next";
import SiteConfig from "@/utils/SiteConfig";
import { ESortFilter } from "@/schema/enum/sort-filter";

interface Props extends CompanyByIDPageProps, ISearchParamsProps {}

function getFilters(searchParams: ISearchParams) {
  return {
    employee_ids:
      (searchParams.employees as string | undefined)
        ?.split(",")
        .map((id) => Number.parseInt(id)) ?? [],
    from_date: searchParams.fromDate as string | undefined,
    end_date: searchParams.toDate as string | undefined,
    sort: (searchParams.sort as ESortFilter | undefined) ?? ESortFilter.DESC,
  };
}

export async function generateMetadata({
  params,
}: CompanyByIDPageProps): Promise<Metadata> {
  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);
  const company = await getCompanyDetails(companyId);
  return {
    title: `${SiteConfig.siteName} | ${
      company.data?.company_name ?? "Company Dashboard"
    } | Absent Report`,
  };
}

export default async function AbsentReportPage({
  params,
  searchParams,
}: Props) {
  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;
  const sParams = await searchParams;
  const filters = getFilters(sParams);
  const { limit, page } = getPaginationParams(sParams);

  const [company, companyExtraData, reports] = await Promise.all([
    getCompanyData(companyId),
    getCompanyExtraData(companyId),
    getAbsentReports({
      company_id: companyId,
      limit,
      page,
      filters,
    }),
  ]);

  if (company.error || companyExtraData.error || reports.error) {
    return (
      <main className="container flex flex-col gap-2">
        <p className="text-xl font-semibold">Absent Report</p>
        <ErrorFallbackCard
          error={company.error ?? companyExtraData.error ?? reports.error}
        />
      </main>
    );
  }

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Absent Report</p>
      <div className="flex items-center justify-between">
        <MyBreadcrumbs
          {...{
            user,
            company: company.data,
            title: "Absent Report",
          }}
        />

        <div className="flex gap-4">
          <AbsentReportGenerator company={company.data} filters={filters} />
          <AttendanceReportFilterPopover {...companyExtraData.data} />
        </div>
      </div>

      <StaticDataTable
        data={reports.data.data.map((item) => ({
          ...item,
          company_id: companyId,
        }))}
        pageCount={reports.data.total_page}
        columns={AttendanceReportDataTableColumns}
      />
    </main>
  );
}
