"use server";
import { getCompanyData } from "@/app/actions/getCompanyData";
import React from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import { StaticDataTable } from "@/components/ui/data-table";
import { ISearchParamsProps } from "@/utils/Types";
import { getPaginationParams } from "@/utils/Misc";
import { ILeaveBalance } from "@/schema/LeaveSchema";
import { LeaveBalanceDataTableColumns } from "@/app/Components/Leave/LeaveBalanceDataTableColumns";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";

interface Props extends CompanyByIDPageProps, ISearchParamsProps {}

export default async function CompanyLeaveBalancePage({
  params,
  searchParams,
}: Props) {
  const { page, limit } = getPaginationParams(searchParams);

  const company = await getCompanyData(params.companyId);
  const user = JSON.parse(
    cookies().get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  var balance: ILeaveBalance[] = [];
  var total_page: number = 1;

  try {
    // TODO: Hit the api to get data
  } catch (_) {
    balance = [];
    total_page = 1;
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
              <BreadcrumbPage>Leave Balance</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-row gap-2 items-center justify-center">
          <Button
            className={
              "bg-green-500 hover:bg-green-400 text-white rounded-full gap-2"
            }
          >
            <Icons.excel className="fill-white stroke-white" /> Download as
            Excel
          </Button>
          <Button
            className={
              "bg-rose-500 hover:bg-rose-400 text-white rounded-full gap-2"
            }
          >
            <Icons.pdf className="fill-white stroke-white" /> Download as PDF
          </Button>
        </div>
      </div>

      <StaticDataTable
        columns={LeaveBalanceDataTableColumns}
        data={balance}
        pageCount={total_page}
      />
    </main>
  );
}
