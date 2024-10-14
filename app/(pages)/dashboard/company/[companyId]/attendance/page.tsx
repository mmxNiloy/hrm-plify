"use server";
import { getCompanyDetails } from "@/app/(server)/actions/getCompanyDetails";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import React from "react";
import { CompanyByIDPageProps } from "../PageProps";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import { getCompanyExtraData } from "@/app/(server)/actions/getCompanyExtraData";
import AttendanceFilterPopover from "@/components/custom/Popover/Attendance/AttendanceFilterPopover";
import { IAttendance, IPaginatedAttendance } from "@/schema/AttendanceSchema";
import { StaticDataTable } from "@/components/ui/data-table";
import { AttendanceDataTableColumns } from "@/components/custom/DataTable/Columns/Attendance/AttendanceDataTableColumns";
import { ISearchParams, ISearchParamsProps } from "@/utils/Types";
import { getPaginationParams } from "@/utils/Misc";
import { getAttendance } from "@/app/(server)/actions/getAttendance";

interface Props extends CompanyByIDPageProps, ISearchParamsProps {}

function getFilters(searchParams: ISearchParams) {
  const department = searchParams.department as string | undefined;
  const designation = searchParams.department as string | undefined;
  const employee = searchParams.department as string | undefined;
  const from_date = searchParams.department as string | undefined;
  const to_date = searchParams.department as string | undefined;

  return {
    department: department ? Number.parseInt(department) : undefined,
    designation: designation ? Number.parseInt(designation) : undefined,
    employee: employee ? Number.parseInt(employee) : undefined,
    from_date,
    to_date,
  };
}

export default async function AttendanceManagementPage({
  params,
  searchParams,
}: Props) {
  const user = JSON.parse(
    cookies().get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;
  const company = await getCompanyDetails(params.companyId);
  const companyExtraData = await getCompanyExtraData(params.companyId);

  const { limit, page } = getPaginationParams(searchParams);
  const filters = getFilters(searchParams);
  const paginatedAttendance: IPaginatedAttendance = await getAttendance({
    company_id: params.companyId,
    limit,
    page,
    filters,
  });

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Attendance Management</p>
      <div className="flex items-center justify-between">
        <MyBreadcrumbs {...{ user, company, title: "Attendance Management" }} />
        <AttendanceFilterPopover {...companyExtraData} />
      </div>

      <StaticDataTable
        data={paginatedAttendance.data}
        columns={AttendanceDataTableColumns}
        pageCount={paginatedAttendance.total_page}
      />
    </main>
  );
}
