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

interface Props extends CompanyByIDPageProps, ISearchParamsProps {}

export default async function CompanyLeaveApproverPage({
  params,
  searchParams,
}: Props) {
  const companyId = (await params).companyId;
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
          title="Leave Balance"
        />

        <LeaveApproverEditDialog
          employees={companyExtraData.data.employees}
          company_id={companyId}
        />
      </div>

      <DataTable
        columns={LeaveApproverDataTableColumns}
        data={leaveApprovers.data}
      />
    </main>
  );
}
