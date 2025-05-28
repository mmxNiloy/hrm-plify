"use server";
import React from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import { DataTable } from "@/components/ui/data-table";
import { ILeaveType } from "@/schema/LeaveSchema";
import { ISearchParamsProps } from "@/utils/Types";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import { getCompanyLeaveTypes } from "@/app/(server)/actions/getCompanyLeaveTypes";
import LeaveTypeEditDialog from "@/components/custom/Dialog/Leave/LeaveTypeEditDialog";
import { LeaveTypeDataTableColumns } from "@/components/custom/DataTable/Columns/Leave/LeaveTypeDataTableColumns";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import { TPermission } from "@/schema/Permissions";
import AccessDenied from "@/components/custom/AccessDenied";
import { getCompanyDetails } from "@/app/(server)/actions/getCompanyDetails";
import { Metadata } from "next";
import { getPaginationParams } from "@/utils/Misc";
import SiteConfig from "@/utils/SiteConfig";

interface Props extends CompanyByIDPageProps, ISearchParamsProps {}

export async function generateMetadata({
  params,
}: CompanyByIDPageProps): Promise<Metadata> {
  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);
  const company = await getCompanyDetails(companyId);
  return {
    title: `${SiteConfig.appName} | ${
      company.data?.company_name ?? "Company Dashboard"
    } | Leave Types`,
  };
}

export default async function CompanyLeaveTypePage({
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

  const sParams = await searchParams;
  const { page, limit } = getPaginationParams(sParams);

  const [company, leaveTypes] = await Promise.all([
    getCompanyData(companyId),
    getCompanyLeaveTypes({
      company_id: companyId,
      page,
      limit,
    }),
  ]);

  if (company.error || leaveTypes.error) {
    return (
      <main className="container flex flex-col gap-4 sm:gap-6 py-4 sm:py-6">
        <p className="text-lg sm:text-xl md:text-2xl font-semibold">
          Leave Type
        </p>
        <ErrorFallbackCard error={company.error ?? leaveTypes.error} />
      </main>
    );
  }

  return (
    <main className="container flex flex-col gap-4 sm:gap-6 py-4 sm:py-6">
      <p className="text-lg sm:text-xl md:text-2xl font-semibold">Leave Type</p>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <MyBreadcrumbs
          company={company.data}
          user={user}
          parent="Leave"
          title="Leave Type"
        />

        {writeAccess && <LeaveTypeEditDialog company_id={companyId} />}
      </div>

      <DataTable
        columns={LeaveTypeDataTableColumns}
        data={leaveTypes.data.map((item) => ({
          ...item,
          updateAccess: updateAccess ? true : false,
        }))}
      />
    </main>
  );
}
