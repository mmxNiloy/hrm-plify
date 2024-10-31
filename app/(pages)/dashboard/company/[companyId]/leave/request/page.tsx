"use server";
import React from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import { getPaginationParams } from "@/utils/Misc";
import { ISearchParamsProps } from "@/utils/Types";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import { StaticDataTable } from "@/components/ui/data-table";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import { getCompanyLeaveTypes } from "@/app/(server)/actions/getCompanyLeaveTypes";
import { getLeaveRequests } from "@/app/(server)/actions/getLeaveRequests";
import { LeaveRequestDataTableColumns } from "@/components/custom/DataTable/Columns/Leave/LeaveRequestDataTableColumns";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";

interface Props extends CompanyByIDPageProps, ISearchParamsProps {}

export default async function LeaveRequestPage({
  params,
  searchParams,
}: Props) {
  const companyId = (await params).companyId;
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  const { page, limit } = getPaginationParams(await searchParams);

  // Get company data
  // Get leave requests (of the company if the user is not a regular employee)
  // Check if the user has approval permissions
  // Render a readonly version for regular users
  // let leave approvers edit data

  const [company, leaveTypes, leaveRequests] = await Promise.all([
    getCompanyData(companyId),
    getCompanyLeaveTypes({
      company_id: companyId,
      searchParams,
    }),
    getLeaveRequests({
      company_id: companyId,
      page,
      limit,
    }),
  ]);

  if (company.error || leaveRequests.error || leaveTypes.error) {
    return (
      <main className="container flex flex-col gap-2">
        <p className="text-xl font-semibold">Leave Requests</p>
        <ErrorFallbackCard
          error={company.error ?? leaveRequests.error ?? leaveTypes.error}
        />
      </main>
    );
  }

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Leave Requests</p>
      <div className="flex items-center justify-between">
        <MyBreadcrumbs
          company={company.data}
          user={user}
          parent="Leave"
          title="Leave Balance"
        />
      </div>

      <StaticDataTable
        columns={LeaveRequestDataTableColumns}
        data={leaveRequests.data.data.map((item) => ({
          ...item,
          company_leave_types: leaveTypes.data,
          can_edit: true,
        }))}
        pageCount={leaveRequests.data.total_page}
      />
    </main>
  );
}
