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

interface Props extends CompanyByIDPageProps, ISearchParamsProps {}

export default async function CompanyLeaveTypePage({
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

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Leave Type</p>
      <div className="flex items-center justify-between">
        <MyBreadcrumbs
          company={company}
          user={user}
          parent="Leave Management"
          title="Leave Type"
        />

        <LeaveTypeEditDialog company_id={company.company_id} />
      </div>

      <DataTable columns={LeaveTypeDataTableColumns} data={leaveTypes} />
    </main>
  );
}
