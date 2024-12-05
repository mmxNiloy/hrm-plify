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
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";

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
  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  const [employee, company, companyExtraData, sParams] = await Promise.all([
    getEmployeeData(),
    getCompanyDetails(companyId),
    getCompanyExtraData(companyId),
    searchParams,
  ]);
  const { limit, page } = getPaginationParams(sParams);

  if (
    employee.error ||
    !employee.data.data ||
    company.error ||
    companyExtraData.error
  ) {
    return (
      <main className="container flex flex-col gap-2">
        <p className="text-xl font-semibold">Attendance Report</p>
        <ErrorFallbackCard
          error={employee.error ?? company.error ?? companyExtraData.error}
        />
      </main>
    );
  }

  const filters = getFilters(sParams, employee.data.data);

  // Get report data from the server
  const reports = await getAttendanceReports({
    company_id: Number.parseInt(`${companyId}`),
    limit,
    page,
    filters,
  });

  if (reports.error) {
    return (
      <main className="container flex flex-col gap-2">
        <p className="text-xl font-semibold">Attendance Report</p>
        <ErrorFallbackCard error={reports.error} />
      </main>
    );
  }

  return (
    <main className="container flex flex-col gap-2">
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
          <form action={"/api/attendance/pdf"} method="POST" target="_blank">
            <div className="sr-only">
              <Input readOnly defaultValue={companyId} name="company_id" />
              <Input
                readOnly
                defaultValue={employee.data.data.employee_id}
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
          <AttendanceReportFilterPopover
            asEmployee
            {...companyExtraData.data}
          />
        </div>
      </div>

      <StaticDataTable
        data={reports.data}
        columns={AttendanceReportDataTableColumns}
        // pageCount={paginatedAttendance.total_page}
      />
    </main>
  );
}
