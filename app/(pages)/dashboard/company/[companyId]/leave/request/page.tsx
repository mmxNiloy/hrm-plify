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
import { TPermission } from "@/schema/Permissions";
import AccessDenied from "@/components/custom/AccessDenied";
import { getCompanyDetails } from "@/app/(server)/actions/getCompanyDetails";
import { Metadata } from "next";

interface Props extends CompanyByIDPageProps, ISearchParamsProps {}

export async function generateMetadata({
  params,
}: CompanyByIDPageProps): Promise<Metadata> {
  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);
  const company = await getCompanyDetails(companyId);
  return {
    title: `Artemis | ${
      company.data?.company_name ?? "Company Dashboard"
    } | Leave Requests`,
  };
}

export default async function LeaveRequestPage({
  params,
  searchParams,
}: Props) {
  const mCookies = await cookies();
  const mPermissions = JSON.parse(
    mCookies.get(process.env.NEXT_PUBLIC_COOKIE_USER_ACCESS_KEY!)?.value ?? "[]"
  ) as TPermission[];

  const readAccess = mPermissions.find((item) => item === "cmp_leave_read");
  const writeAccess = mPermissions.find((item) => item === "cmp_leave_create");
  const updateAccess = mPermissions.find((item) => item === "cmp_leave_update");

  if (!readAccess) {
    return <AccessDenied />;
  }

  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);
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
      page,
      limit,
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
          title="Leave Requests"
        />
      </div>

      <StaticDataTable
        columns={LeaveRequestDataTableColumns}
        data={leaveRequests.data.data.map((item) => ({
          ...item,
          company_leave_types: leaveTypes.data,
          can_edit: updateAccess || writeAccess ? true : false,
        }))}
        pageCount={leaveRequests.data.total_page}
      />
    </main>
  );
}
