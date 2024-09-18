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
import { StaticDataTable } from "@/components/ui/data-table";
import { ILeaveType } from "@/schema/LeaveSchema";
import { LeaveTypeDataTableColumns } from "@/app/Components/Leave/LeaveTypeDataTableColumns";
import { ISearchParamsProps } from "@/utils/Types";
import { getPaginationParams } from "@/utils/Misc";

interface Props extends CompanyByIDPageProps, ISearchParamsProps {}

export default async function CompanyLeaveTypePage({
  params,
  searchParams,
}: Props) {
  const { page, limit } = getPaginationParams(searchParams);

  const company = await getCompanyData(params.companyId);
  const user = JSON.parse(
    cookies().get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  var leaveTypes: ILeaveType[] = [];
  var total_page: number = 1;

  try {
    // TODO: Get leave types from the API
    // Hit the api and get data
  } catch (_) {
    // If data not found, show an empty table
    total_page = 0;
    leaveTypes = [];
  }

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Leave Type</p>
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
              <BreadcrumbPage>Leave Type</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <LeaveTypeEditDialog />
      </div>

      <StaticDataTable
        columns={LeaveTypeDataTableColumns}
        data={leaveTypes}
        pageCount={total_page}
      />
    </main>
  );
}
