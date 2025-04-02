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
import AttendanceReportGenerator from "@/components/custom/PDF/AttendanceReportGenerator";
import { TPermission } from "@/schema/Permissions";
import AttendanceBulkUpdateDialog from "@/components/custom/Dialog/Company/AttendanceBulkUpdateDialog";

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
  const mCookies = await cookies();
  const user = JSON.parse(
    mCookies.get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  const mPermissions = JSON.parse(
    mCookies.get(process.env.NEXT_PUBLIC_COOKIE_USER_ACCESS_KEY!)?.value ?? "[]"
  ) as TPermission[];

  const readAccess = mPermissions.find((item) => item === "cmp_attend_read");
  const writeAccess = mPermissions.find((item) => item === "cmp_attend_create");
  const updateAccess = mPermissions.find(
    (item) => item === "cmp_attend_update"
  );

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
      <main className="container flex flex-col gap-4 sm:gap-6 py-4 sm:py-6">
        <p className="text-lg sm:text-xl md:text-2xl font-semibold">
          Attendance Report
        </p>
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
      <main className="container flex flex-col gap-4 sm:gap-6 py-4 sm:py-6">
        <p className="text-lg sm:text-xl md:text-2xl font-semibold">
          Attendance Report
        </p>
        <ErrorFallbackCard error={reports.error} />
      </main>
    );
  }

  return (
    <main className="container flex flex-col gap-4 sm:gap-6 py-4 sm:py-6">
      <p className="text-lg sm:text-xl md:text-2xl font-semibold">
        Attendance Report
      </p>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4">
        <MyBreadcrumbs
          {...{
            user,
            company: company.data,
            title: "Attendance Report",
          }}
        />

        <div className="flex flex-col sm:flex-row gap-4">
          {updateAccess && (
            <AttendanceBulkUpdateDialog
              company_id={companyId}
              employees={companyExtraData.data.employees}
            />
          )}
          <AttendanceReportGenerator company={company.data} filters={filters} />
          <AttendanceReportFilterPopover
            asEmployee
            {...companyExtraData.data}
          />
        </div>
      </div>

      <StaticDataTable
        data={reports.data.data.map((item) => ({
          ...item,
          company_id: companyId,
          updateAccess: updateAccess ? true : false,
        }))}
        columns={AttendanceReportDataTableColumns}
        pageCount={reports.data.total_page}
      />
    </main>
  );
}
