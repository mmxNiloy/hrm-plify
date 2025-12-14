"use server";
import React from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import { DataTable } from "@/components/ui/data-table/data-table";
import { ILeaveRule, ILeaveType } from "@/schema/LeaveSchema";
import { ISearchParamsProps } from "@/utils/Types";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import { getCompanyLeaveTypes } from "@/app/(server)/actions/getCompanyLeaveTypes";
import LeaveRuleEditDialog from "@/components/custom/Dialog/Leave/LeaveRuleEditDialog";
import { LeaveRulesDataTableColumns } from "@/components/custom/DataTable/Columns/Leave/LeaveRulesDataTableColumns";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import { getPaginationParams } from "@/utils/Misc";

interface Props extends CompanyByIDPageProps, ISearchParamsProps {}

export default async function CompanyLeaveRulesPage({
  params,
  searchParams,
}: Props) {
  const mParams = await params;
  const companyId = mParams.companyId;
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  const sParams = await searchParams;
  const { page, limit } = getPaginationParams(sParams);
  const [company, leaveTypes] = await Promise.all([
    getCompanyData(companyId),
    getCompanyLeaveTypes({
      company_id: Number.parseInt(companyId),
      page,
      limit,
    }),
  ]);

  if (company.error || leaveTypes.error) {
    return (
      <main className="container flex flex-col gap-2">
        <p className="text-xl font-semibold">Leave Rules</p>
        <ErrorFallbackCard error={company.error ?? leaveTypes.error} />
      </main>
    );
  }

  //? Maybe GET Employee types as well?
  // TODO: Get Leave Rules here
  var leaveRules: ILeaveRule[] = [];

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Leave Rules</p>
      <div className="flex items-center justify-between">
        <MyBreadcrumbs parent="Leave" title="Leave Balance" />

        <LeaveRuleEditDialog
          leaveTypes={leaveTypes.data}
          company_id={Number.parseInt(companyId)}
        />
      </div>

      <DataTable columns={LeaveRulesDataTableColumns} data={leaveRules} />
    </main>
  );
}
