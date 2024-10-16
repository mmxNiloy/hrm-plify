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
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { getAbsentReports } from "@/app/(server)/actions/getAbsentReport";

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

export default async function AbsentReportPage({
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
  const reports = await getAbsentReports({
    company_id: company.company_id,
    limit,
    page,
    filters,
  });

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Absent Report</p>
      <div className="flex items-center justify-between">
        <MyBreadcrumbs
          {...{
            user,
            company,
            title: "Absent Report",
          }}
        />

        <div className="flex gap-4">
          <form
            action={"/api/attendance/pdf?_ref=absent"}
            method="POST"
            target="_blank"
          >
            <div className="sr-only">
              <Input
                readOnly
                defaultValue={company.company_id}
                name="company_id"
              />
              <Input
                readOnly
                defaultValue={filters.employee_id}
                name="employee_id"
              />
              <Input
                readOnly
                defaultValue={filters.from_date}
                name="from_date"
              />
              <Input readOnly defaultValue={filters.end_date} name="end_date" />
              <Input readOnly defaultValue={filters.sort} name="sort" />
            </div>
            <Button
              disabled
              variant={"destructive"}
              className="gap-2 rounded-full"
            >
              <Icons.pdf />
              Download PDF (WIP)
            </Button>
          </form>
          <AttendanceReportFilterPopover {...companyExtraData} />
        </div>
      </div>

      <StaticDataTable
        data={reports}
        columns={AttendanceReportDataTableColumns}
        // pageCount={paginatedAttendance.total_page}
      />
    </main>
  );
}
