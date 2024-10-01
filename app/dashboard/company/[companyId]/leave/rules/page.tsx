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
import { ILeaveRule, ILeaveType } from "@/schema/LeaveSchema";
import { LeaveTypeDataTableColumns } from "@/app/Components/Leave/LeaveTypeDataTableColumns";
import { ISearchParamsProps } from "@/utils/Types";
import { getPaginationParams } from "@/utils/Misc";
import { getCompanyLeaveTypes } from "@/app/actions/getCompanyLeaveTypes";
import { LeaveRulesDataTableColumns } from "@/app/Components/Leave/LeaveRulesDataTableColumns";
import LeaveRuleEditDialog from "@/app/Components/Leave/Edit/LeaveRuleEditDialog";

interface Props extends CompanyByIDPageProps, ISearchParamsProps {}

export default async function CompanyLeaveRulesPage({
  params,
  searchParams,
}: Props) {
  const company = await getCompanyData(params.companyId);
  const user = JSON.parse(
    cookies().get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  var leaveTypes: ILeaveType[] = await getCompanyLeaveTypes({
    company_id: company.company_id,
    searchParams,
  });

  //? Maybe GET Employee types as well?
  // TODO: Get Leave Rules here
  var leaveRules: ILeaveRule[] = [];

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Leave Rules</p>
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
              <BreadcrumbPage>Leave Rules</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <LeaveRuleEditDialog
          leaveTypes={leaveTypes}
          company_id={company.company_id}
        />
      </div>

      <DataTable columns={LeaveRulesDataTableColumns} data={leaveRules} />
    </main>
  );
}
