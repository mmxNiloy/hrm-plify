"use server";
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
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import { LeaveBalanceDataTableColumns } from "@/components/custom/DataTable/Columns/Leave/LeaveBalanceDataTableColumns";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";

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
        <MyBreadcrumbs
          company={company}
          user={user}
          parent="Leave"
          title="Leave Balance"
        />

        <div className="flex flex-row gap-2 items-center justify-center">
          <Button
            disabled
            className={
              "bg-green-500 hover:bg-green-400 text-white rounded-full gap-2"
            }
          >
            <Icons.excel className="fill-white stroke-white" /> Download as
            Excel (WIP)
          </Button>
          <Button
            disabled
            className={
              "bg-rose-500 hover:bg-rose-400 text-white rounded-full gap-2"
            }
          >
            <Icons.pdf className="fill-white stroke-white" /> Download as PDF
            (WIP)
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
