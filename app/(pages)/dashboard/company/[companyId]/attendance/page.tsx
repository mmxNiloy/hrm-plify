"use server";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import React from "react";
import { CompanyByIDPageProps } from "../PageProps";
import { getCompanyExtraData } from "@/app/(server)/actions/getCompanyExtraData";
import AttendanceReportFilterPopover from "@/components/custom/Popover/Attendance/AttendanceReportFilterPopover";
import { ISearchParams, ISearchParamsProps } from "@/utils/Types";
import { getPaginationParams } from "@/utils/Misc";
import { getAttendanceReports } from "@/app/(server)/actions/getAttendanceReports";
import { StaticDataTable } from "@/components/ui/data-table";
import { AttendanceReportDataTableColumns } from "@/components/custom/DataTable/Columns/Attendance/AttendanceReportDataTableColumns";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import AttendanceReportGenerator from "@/components/custom/PDF/AttendanceReportGenerator";

interface Props extends CompanyByIDPageProps, ISearchParamsProps {}

function getFilters(searchParams: ISearchParams) {
  return {
    employee_id: Math.max(
      0,
      Number.parseInt((searchParams.employee as string | undefined) ?? "0")
    ),
    from_date: searchParams.datepicker_from_date as string | undefined,
    end_date: searchParams.datepicker_to_date as string | undefined,
    sort: (searchParams.sort as string | undefined) ?? "DESC",
  };
}

export default async function AttendanceReportPage({
  params,
  searchParams,
}: Props) {
  const sParams = await searchParams;
  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;
  const filters = getFilters(sParams);
  const { limit, page } = getPaginationParams(sParams);

  const [company, companyExtraData, reports] = await Promise.all([
    getCompanyData(companyId),
    getCompanyExtraData(companyId),
    getAttendanceReports({
      company_id: companyId,
      limit,
      page,
      filters,
    }),
  ]);

  if (company.error || companyExtraData.error || reports.error) {
    return (
      <main className="container flex flex-col gap-2">
        <p className="text-xl font-semibold">Attendance Report</p>
        <ErrorFallbackCard
          error={company.error ?? companyExtraData.error ?? reports.error}
        />
      </main>
    );
  }

  return (
    <main id="pdf-view" className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Attendance Report</p>
      <div className="flex items-center justify-between">
        <MyBreadcrumbs
          {...{
            user,
            company: company.data,
            title: "Attendance Report",
          }}
        />

        <div className="flex gap-4">
          <AttendanceReportGenerator company={company.data} filters={filters} />

          <AttendanceReportFilterPopover {...companyExtraData.data} />
        </div>
      </div>

      <StaticDataTable
        data={reports.data.data}
        pageCount={reports.data.total_page}
        columns={AttendanceReportDataTableColumns}
      />
    </main>
  );
}
