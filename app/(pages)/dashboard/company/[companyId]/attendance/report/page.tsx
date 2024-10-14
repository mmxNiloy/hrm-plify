"use server";
import { getCompanyDetails } from "@/app/(server)/actions/getCompanyDetails";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import React from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import { getCompanyExtraData } from "@/app/(server)/actions/getCompanyExtraData";
import AttendanceReportFilterPopover from "@/components/custom/Popover/Attendance/AttendanceReportFilterPopover";
import { ISearchParams, ISearchParamsProps } from "@/utils/Types";
import { getPaginationParams } from "@/utils/Misc";
import { getAttendanceReports } from "@/app/(server)/actions/getAttendanceReports";
import { StaticDataTable } from "@/components/ui/data-table";
import { AttendanceReportDataTableColumns } from "@/components/custom/DataTable/Columns/Attendance/AttendanceReportDataTableColumns";

interface Props extends CompanyByIDPageProps, ISearchParamsProps {}

function getFilters(searchParams: ISearchParams) {
  return {
    employee_id: Math.max(
      0,
      Number.parseInt((searchParams.employee_id as string | undefined) ?? "0")
    ),
    from_date: searchParams.datepicker_from_date as string | undefined,
    end_date: searchParams.datepicker_to_date as string | undefined,
    sort: (searchParams.sort as string | undefined) ?? "DESC",
  };
}

export default async function GenerateReportPage({
  params,
  searchParams,
}: Props) {
  const user = JSON.parse(
    cookies().get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;
  const company = await getCompanyDetails(params.companyId);

  const companyExtraData = await getCompanyExtraData(params.companyId);
  const filters = getFilters(searchParams);
  const { limit, page } = getPaginationParams(searchParams);

  // Get report data from the server
  const reports = await getAttendanceReports({
    company_id: company.company_id,
    limit,
    page,
    filters,
  });

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Generate Attendance</p>
      <div className="flex items-center justify-between">
        <MyBreadcrumbs
          {...{
            user,
            company,
            title: "Generate Report",
            parent: "Attendance Management",
          }}
        />
        <AttendanceReportFilterPopover {...companyExtraData} />
      </div>
      <div className="flex flex-col gap-4">
        {/* <AttendanceReportGenerationTable
          employees={companyExtraData.employees}
          companyId={company.company_id}
        /> */}
      </div>

      <StaticDataTable
        data={reports}
        columns={AttendanceReportDataTableColumns}
        // pageCount={paginatedAttendance.total_page}
      />
    </main>
  );
}
