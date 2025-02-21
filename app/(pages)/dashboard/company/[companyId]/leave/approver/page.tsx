"use server";
import React from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import { DataTable } from "@/components/ui/data-table";
import { ILeaveApprover } from "@/schema/LeaveSchema";
import { ISearchParamsProps } from "@/utils/Types";
import { getPaginationParams } from "@/utils/Misc";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import { getCompanyExtraData } from "@/app/(server)/actions/getCompanyExtraData";
import { getLeaveApprovers } from "@/app/(server)/actions/getLeaveApprovers";
import LeaveApproverEditDialog from "@/components/custom/Dialog/Leave/LeaveApproverEditDialog";
import { LeaveApproverDataTableColumns } from "@/components/custom/DataTable/Columns/Leave/LeaveApproverDataTableColumns";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import { TPermission } from "@/schema/Permissions";
import AccessDenied from "@/components/custom/AccessDenied";
import { getCompanyDetails } from "@/app/(server)/actions/getCompanyDetails";
import { Metadata } from "next";
import SiteConfig from "@/utils/SiteConfig";

interface Props extends CompanyByIDPageProps, ISearchParamsProps {}

export async function generateMetadata({
  params,
}: CompanyByIDPageProps): Promise<Metadata> {
  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);
  const company = await getCompanyDetails(companyId);
  return {
    title: `${SiteConfig.siteName} | ${
      company.data?.company_name ?? "Company Dashboard"
    } | Leave Approvers`,
  };
}

export default async function CompanyLeaveApproverPage({
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
  const { page, limit } = getPaginationParams(await searchParams);
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  const [company, companyExtraData, leaveApprovers] = await Promise.all([
    getCompanyData(companyId),
    getCompanyExtraData(companyId),
    getLeaveApprovers({
      company_id: companyId,
      page,
      limit,
    }),
  ]);

  if (company.error || companyExtraData.error || leaveApprovers.error) {
    return (
      <main className="container flex flex-col gap-2">
        <p className="text-xl font-semibold">Leave Approvers</p>
        <ErrorFallbackCard
          error={
            company.error || companyExtraData.error || leaveApprovers.error
          }
        />
      </main>
    );
  }

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Leave Approvers</p>
      <div className="flex items-center justify-between">
        <MyBreadcrumbs
          company={company.data}
          user={user}
          parent="Leave"
          title="Leave Approvers"
        />

        {writeAccess && (
          <LeaveApproverEditDialog
            employees={companyExtraData.data.employees}
            company_id={companyId}
          />
        )}
      </div>

      <DataTable
        columns={LeaveApproverDataTableColumns}
        data={leaveApprovers.data.map((item) => ({
          ...item,
          updateAccess: updateAccess ? true : false,
        }))}
      />
    </main>
  );
}
