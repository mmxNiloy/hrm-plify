"use server";
import { getCompanyDetails } from "@/app/(server)/actions/getCompanyDetails";
import { getCompanyExtraData } from "@/app/(server)/actions/getCompanyExtraData";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import React from "react";
import { CompanyByIDPageProps } from "../../../PageProps";
import { ISearchParams, ISearchParamsProps } from "@/utils/Types";
import { getPaginationParams } from "@/utils/Misc";
import { getAttendanceReports } from "@/app/(server)/actions/getAttendanceReports";
import { getEmployeeData } from "@/app/(server)/actions/getEmployeeData";
import { IEmployeeWithUserMetadata } from "@/schema/EmployeeSchema";
import { notFound } from "next/navigation";
import { AttendanceReportDataTableColumns } from "@/components/custom/DataTable/Columns/Attendance/AttendanceReportDataTableColumns";
import { StaticDataTable } from "@/components/ui/data-table";
import AttendanceReportFilterPopover from "@/components/custom/Popover/Attendance/AttendanceReportFilterPopover";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";

interface Props extends CompanyByIDPageProps, ISearchParamsProps {}

function getFilters(
  searchParams: ISearchParams,
  employee: IEmployeeWithUserMetadata
) {
  return {
    employee_id: employee.employee_id,
    from_date: searchParams.datepicker_from_date as string | undefined,
    end_date: searchParams.datepicker_to_date as string | undefined,
    sort: (searchParams.sort as string | undefined) ?? "DESC",
  };
}

export default async function EmployeeAttendancePage({
  params,
  searchParams,
}: Props) {
  const user = JSON.parse(
    cookies().get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;
  const employee = await getEmployeeData();

  if (!employee.data) {
    notFound();
  }

  const company = await getCompanyDetails(params.companyId);

  const companyExtraData = await getCompanyExtraData(params.companyId);
  const filters = getFilters(searchParams, employee.data);
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
      <p className="text-xl font-semibold">Attendance Report</p>
      <div className="flex items-center justify-between">
        <MyBreadcrumbs
          {...{
            user,
            company,
            title: "Attendance Report",
          }}
        />

        <div className="flex gap-4">
          <form action={"/api/attendance/pdf"} method="POST" target="_blank">
            <div className="sr-only">
              <Input
                readOnly
                defaultValue={company.company_id}
                name="company_id"
              />
              <Input
                readOnly
                defaultValue={employee.data.employee_id}
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
          <AttendanceReportFilterPopover asEmployee {...companyExtraData} />
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
