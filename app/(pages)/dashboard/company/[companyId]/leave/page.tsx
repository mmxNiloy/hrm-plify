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
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";

export default async function CompanyLeaveDashboardPage({
  params,
}: CompanyByIDPageProps) {
  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;
  const company = await getCompanyData(companyId);

  if (company.error) {
    return (
      <main className="container flex flex-col gap-2">
        <p className="text-xl font-semibold">Leave Management Dashboard</p>
        <ErrorFallbackCard error={company.error} />
      </main>
    );
  }

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Leave Management Dashboard</p>
      <MyBreadcrumbs company={company.data} user={user} title="Leave" />

      {/* Show a summary of leaves in a card or something */}
      <div className="grid grid-cols-2 gap-4">
        <HolidaysCard />

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
