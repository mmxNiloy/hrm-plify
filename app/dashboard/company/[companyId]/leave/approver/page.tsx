"use server";
import React from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import { getCompanyData } from "@/app/actions/getCompanyData";
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
import LeaveTypeEditDialog from "@/app/Components/Leave/Edit/LeaveTypeEditDialog";
import { DataTable, StaticDataTable } from "@/components/ui/data-table";
import { ILeaveApprover, ILeaveType } from "@/schema/LeaveSchema";
import { LeaveTypeDataTableColumns } from "@/app/Components/Leave/LeaveTypeDataTableColumns";
import { ISearchParamsProps } from "@/utils/Types";
import { getPaginationParams } from "@/utils/Misc";
import { getCompanyLeaveTypes } from "@/app/actions/getCompanyLeaveTypes";
import { getLeaveApprovers } from "@/app/actions/getLeaveApprovers";
import { LeaveApproverDataTableColumns } from "@/app/Components/Leave/LeaveApproverDataTableColumns";
import LeaveApproverEditDialog from "@/app/Components/Leave/Edit/LeaveApproverEditDialog";
import { getCompanyExtraData } from "@/app/actions/getCompanyExtraData";

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
              <BreadcrumbPage>Leave Approvers</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

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
