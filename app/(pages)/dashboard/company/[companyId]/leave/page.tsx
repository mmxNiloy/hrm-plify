"use server";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import { CompanyByIDPageProps } from "../PageProps";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import LeaveTypesDataTable from "@/components/custom/DataTable/LeaveTypesDataTable";
import LeaveCountBarChart from "@/components/custom/Dashboard/Leave/Stats/LeaveCountBarChart";
import HolidaysCard from "@/components/custom/Dashboard/Leave/HolidaysCard";

export default async function CompanyLeaveDashboardPage({
  params,
}: CompanyByIDPageProps) {
  const user = JSON.parse(
    cookies().get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;
  const company = await getCompanyData(params.companyId);

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Leave Management Dashboard</p>
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
              <BreadcrumbPage>Leave Management</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Show a summary of leaves in a card or something */}
      <div className="grid grid-cols-2 gap-4">
        <HolidaysCard />

        {/* Leave balance */}
        {/* <LeaveBalanceCard
          data={Array.from({ length: 3 }, (_: ILeaveBalance, index) => ({
            employee_id: index + 1,
            employee_name: `Example Employee #${index + 1}`,
            designation: "Example Designation",
            leaves: Array.from({ length: 3 }, (_: IEmployeeLeave, idx) => ({
              employee_id: index,
              leave_type: `Example Leave Type #${idx}`,
              total: 10 + idx * 5,
              leave_taken: 2 + idx * 3,
            })),
          }))}
        /> */}

        {/* Current leave types */}
        <div className="px-8 py-4">
          <p className="text-lg mb-4 font-semibold">Leave Types</p>
          <LeaveTypesDataTable />
        </div>

        {/* Leave Stats */}
        <LeaveCountBarChart />
      </div>
    </main>
  );
}
