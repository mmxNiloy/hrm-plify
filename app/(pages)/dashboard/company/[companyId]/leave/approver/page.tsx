"use server";
import React from "react";
import { CompanyByIDPageProps } from "../../PageProps";
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

interface Props extends CompanyByIDPageProps, ISearchParamsProps {}

export default async function CompanyLeaveApproverPage({
  params,
  searchParams,
}: Props) {
  const { page, limit } = getPaginationParams(searchParams);
  const company = await getCompanyData(params.companyId);
  const companyExtraData = await getCompanyExtraData(params.companyId);

  const user = JSON.parse(
    cookies().get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  var leaveApprovers: ILeaveApprover[] = await getLeaveApprovers({
    company_id: company.company_id,
    page,
    limit,
  });

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Leave Approvers</p>
      <div className="flex items-center justify-between">
        <MyBreadcrumbs
          company={company}
          user={user}
          parent="Leave"
          title="Leave Balance"
        />

        <LeaveApproverEditDialog
          employees={companyExtraData.employees}
          company_id={company.company_id}
        />
      </div>

      <DataTable
        columns={LeaveApproverDataTableColumns}
        data={leaveApprovers}
      />
    </main>
  );
}
