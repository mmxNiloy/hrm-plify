"use server";
import { getCompanyData } from "@/app/actions/getCompanyData";
import React from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import { getPaginationParams } from "@/utils/Misc";
import { ISearchParamsProps } from "@/utils/Types";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import { getEmployeeData } from "@/app/actions/getEmployeeData";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import LeaveRequestEditDialog from "@/app/Components/Leave/Edit/LeaveRequestEditDialog";
import { getCompanyLeaveTypes } from "@/app/actions/getCompanyLeaveTypes";
import { StaticDataTable } from "@/components/ui/data-table";
import { LeaveRequestDataTableColumns } from "@/app/Components/Leave/LeaveRequestDataTableColumns";
import { ILeaveRequest, IPaginatedLeaveRequest } from "@/schema/LeaveSchema";
import { getLeaveRequests } from "@/app/actions/getLeaveRequests";
import Icons from "@/components/ui/icons";
import { Row } from "@tanstack/react-table";

interface Props extends CompanyByIDPageProps, ISearchParamsProps {}

export default async function LeaveRequestPage({
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
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            {(user.user_roles?.roles.role_name === "Super Admin" ||
              user.user_roles?.roles.role_name === "Admin") && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink
                    className="line-clamp-1 text-ellipsis max-w-32"
                    href="/dashboard/leave"
                  >
                    Leave
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                className="line-clamp-1 text-ellipsis max-w-32"
                href={`/dashboard/company/${company.company_id}`}
              >
                {company.company_name}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Leave Requests</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* {employeeData && (
          <LeaveRequestEditDialog
            employee={employeeData}
            company_id={company.company_id}
            leaveTypes={leaveTypes}
          />
        )} */}
      </div>

      <StaticDataTable
        columns={LeaveRequestDataTableColumns}
        data={leaveRequests.data}
        pageCount={leaveRequests.total_page}
      />
    </main>
  );
}
