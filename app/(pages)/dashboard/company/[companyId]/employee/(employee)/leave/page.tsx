"use server";
import React from "react";
import { CompanyByIDPageProps } from "../../../PageProps";
import { getPaginationParams } from "@/utils/Misc";
import { ISearchParamsProps } from "@/utils/Types";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { StaticDataTable } from "@/components/ui/data-table";
import { ILeaveRequest, IPaginatedLeaveRequest } from "@/schema/LeaveSchema";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import { getCompanyLeaveTypes } from "@/app/(server)/actions/getCompanyLeaveTypes";
import { getEmployeeData } from "@/app/(server)/actions/getEmployeeData";
import { getLeaveRequests } from "@/app/(server)/actions/getLeaveRequests";
import LeaveRequestEditDialog from "@/components/custom/Dialog/Leave/LeaveRequestEditDialog";
import { LeaveRequestDataTableColumns } from "@/components/custom/DataTable/Columns/Leave/LeaveRequestDataTableColumns";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";

interface Props extends CompanyByIDPageProps, ISearchParamsProps {}

export default async function EmployeeLeaveRequestPage({
  params,
  searchParams,
}: Props) {
  const user = JSON.parse(
    cookies().get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  const { page, limit } = getPaginationParams(searchParams);

  // Get company data
  const company = await getCompanyData(params.companyId);
  const leaveTypes = await getCompanyLeaveTypes({
    company_id: params.companyId,
    searchParams,
  });

  // Get user stat
  const employeeData = await getEmployeeData();

  // Get leave requests (of the company if the user is not a regular employee)
  var leaveRequests: IPaginatedLeaveRequest = await getLeaveRequests({
    company_id: company.company_id,
    page,
    limit,
  });

  // Check if the user has approval permissions
  // Render a readonly version for regular users
  // let leave approvers edit data
  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Leave Requests</p>
      <div className="flex items-center justify-between">
        <MyBreadcrumbs company={company} user={user} title="Leave Requests" />

        {employeeData && (
          <LeaveRequestEditDialog
            employee_id={employeeData.data?.employee_id}
            company_id={company.company_id}
            leaveTypes={leaveTypes}
          />
        )}
      </div>

      <StaticDataTable
        columns={LeaveRequestDataTableColumns}
        data={leaveRequests.data.map((item) => ({
          ...item,
          company_leave_types: leaveTypes,
          can_edit: Boolean(employeeData.data?.leave_approvers ?? false),
          currentEmployee: employeeData.data,
        }))}
        pageCount={leaveRequests.total_page}
      />
    </main>
  );
}
