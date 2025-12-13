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
import SiteConfig from "@/utils/SiteConfig";
import { DataTable } from "@/components/ui/data-table/data-table";

interface Props extends CompanyByIDPageProps, ISearchParamsProps {}

export async function generateMetadata({
  params,
}: CompanyByIDPageProps): Promise<Metadata> {
  const mParams = await params;
  const companyId = mParams.companyId;
  const company = await getCompanyDetails(companyId);
  return {
    title: `${SiteConfig.siteName} | ${
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

  const mParams = await params;
  const companyId = mParams.companyId;
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
      company_id: Number.parseInt(companyId),
      page,
      limit,
    }),
    getLeaveRequests({
      company_id: Number.parseInt(companyId),
      page,
      limit,
    }),
  ]);

  if (company.error || leaveRequests.error || leaveTypes.error) {
    return (
      <main className="container flex flex-col gap-4 sm:gap-6 py-4 sm:py-6">
        <p className="text-lg sm:text-xl md:text-2xl font-semibold">
          Leave Requests
        </p>
        <ErrorFallbackCard
          error={company.error ?? leaveRequests.error ?? leaveTypes.error}
        />
      </main>
    );
  }

  return (
    <main className="container flex flex-col gap-4 sm:gap-6 py-4 sm:py-6">
      <div className="flex flex-col gap-1">
        <p className="text-lg sm:text-xl md:text-2xl font-semibold">
          Leave Requests
        </p>
        <MyBreadcrumbs parent="Leave" title="Leave Requests" />
      </div>

      <DataTable
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
