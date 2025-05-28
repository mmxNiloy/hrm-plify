"use server";

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
import { getCompanyDetails } from "@/app/(server)/actions/getCompanyDetails";
import { Metadata } from "next";
import { getHolidays } from "@/app/(server)/actions/getHolidays";
import { DataTable } from "@/components/ui/data-table";
import { LeaveTypeDataTableColumns } from "@/components/custom/DataTable/Columns/Leave/LeaveTypeDataTableColumns";
import { getCompanyLeaveTypes } from "@/app/(server)/actions/getCompanyLeaveTypes";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SiteConfig from "@/utils/SiteConfig";

export async function generateMetadata({
  params,
}: CompanyByIDPageProps): Promise<Metadata> {
  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);
  const company = await getCompanyDetails(companyId);
  return {
    title: `${SiteConfig.appName} | ${
      company.data?.company_name ?? "Company Dashboard"
    } | Leave Management`,
  };
}

export default async function CompanyLeaveDashboardPage({
  params,
}: CompanyByIDPageProps) {
  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;
  const [holidays, company, leaveTypes] = await Promise.all([
    getHolidays({ company_id: companyId }),
    getCompanyData(companyId),
    getCompanyLeaveTypes({
      company_id: companyId,
      page: 1,
      limit: 5,
    }),
  ]);

  if (company.error) {
    return (
      <main className="container flex flex-col gap-4 sm:gap-6 py-4 sm:py-6">
        <p className="text-lg sm:text-xl md:text-2xl font-semibold">
          Leave Management Dashboard
        </p>
        <ErrorFallbackCard error={company.error} />
      </main>
    );
  }

  return (
    <main className="container flex flex-col gap-4 sm:gap-6 py-4 sm:py-6">
      <p className="text-lg sm:text-xl md:text-2xl font-semibold">
        Leave Management Dashboard
      </p>
      <MyBreadcrumbs company={company.data} user={user} title="Leave" />

      {/* Show a summary of leaves in a card or something */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <HolidaysCard holidays={holidays.data} />

        {/* Current leave types */}
        <div className="px-8 py-4">
          <div className="w-full flex items-center justify-between">
            <p className="text-lg mb-4 font-semibold">Leave Types</p>
            <Link href={"./leave/type"} passHref>
              <Button variant={"link"}>View All</Button>
            </Link>
          </div>
          <DataTable
            columns={LeaveTypeDataTableColumns}
            data={
              leaveTypes.data?.map((item) => ({
                ...item,
                updateAccess: false,
              })) ?? []
            }
          />
        </div>

        {/* Leave Stats */}
        {/* <LeaveCountBarChart /> */}
      </div>
    </main>
  );
}
