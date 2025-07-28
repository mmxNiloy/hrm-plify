"use server";
import React from "react";
import { CompanyByIDPageProps } from "../../../PageProps";
import { getPaginationParams } from "@/utils/Misc";
import { ISearchParamsProps } from "@/utils/Types";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import { StaticDataTable } from "@/components/ui/data-table";
import { ILeaveRequest, IPaginatedLeaveRequest } from "@/schema/LeaveSchema";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import { getCompanyLeaveTypes } from "@/app/(server)/actions/getCompanyLeaveTypes";
import { getEmployeeData } from "@/app/(server)/actions/getEmployeeData";
import { getLeaveRequests } from "@/app/(server)/actions/getLeaveRequests";
import LeaveRequestEditDialog from "@/components/custom/Dialog/Leave/LeaveRequestEditDialog";
import { LeaveRequestDataTableColumns } from "@/components/custom/DataTable/Columns/Leave/LeaveRequestDataTableColumns";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";

interface Props extends CompanyByIDPageProps, ISearchParamsProps {}

export default async function EmployeeLeaveRequestPage({
  params,
  searchParams,
}: Props) {
  const [sParams, mParams] = await Promise.all([searchParams, params]);

  const companyId = mParams.companyId;
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  const { page, limit } = getPaginationParams(sParams);

  // Get company data
  const [company, leaveTypes, employeeData, leaveRequests] = await Promise.all([
    getCompanyData(companyId),
    getCompanyLeaveTypes({
      company_id: Number.parseInt(companyId),
      page,
      limit,
    }),
    getEmployeeData(),
    getLeaveRequests({
      company_id: Number.parseInt(companyId),
      page,
      limit,
    }),
  ]);

  if (
    company.error ||
    leaveTypes.error ||
    employeeData.error ||
    leaveRequests.error
  ) {
    return (
      <main className="container flex flex-col gap-4 sm:gap-6 py-4 sm:py-6">
        <p className="text-lg sm:text-xl md:text-2xl font-semibold">
          Leave Requests
        </p>
        <ErrorFallbackCard
          error={
            company.error ??
            leaveTypes.error ??
            employeeData.error ??
            leaveRequests.error
          }
        />
      </main>
    );
  }

  // Check if the user has approval permissions
  // Render a readonly version for regular users
  // let leave approvers edit data
  return (
    <main className="container flex flex-col gap-4 sm:gap-6 py-4 sm:py-6">
      <p className="text-lg sm:text-xl md:text-2xl font-semibold">
        Leave Requests
      </p>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <MyBreadcrumbs title="Leave Requests" />

        {employeeData && (
          <LeaveRequestEditDialog
            employee_id={employeeData.data.data?.employee_id}
            company_id={Number.parseInt(companyId)}
            leaveTypes={leaveTypes.data}
          />
        )}
      </div>

      <StaticDataTable
        columns={LeaveRequestDataTableColumns}
        data={leaveRequests.data.data
          .filter((item) => {
            if (employeeData.data.data?.leave_approvers) return true;
            return item.employee_id == employeeData.data.data?.employee_id;
          })
          .map((item) => ({
            ...item,
            company_leave_types: leaveTypes.data,
            can_edit: Boolean(employeeData.data.data?.leave_approvers ?? false),
            currentEmployee: employeeData.data.data,
          }))}
        pageCount={leaveRequests.data.total_page}
      />
    </main>
  );
}
