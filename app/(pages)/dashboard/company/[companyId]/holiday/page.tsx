"use server";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table/data-table";
import Icons from "@/components/ui/icons";
import { ButtonGradient } from "@/styles/button.tailwind";
import Link from "next/link";
import React from "react";
import { CompanyByIDPageProps } from "../PageProps";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import { getHolidayTypes } from "@/app/(server)/actions/getHolidayTypes";
import { getHolidays } from "@/app/(server)/actions/getHolidays";
import { HolidayListDataTableColumns } from "@/components/custom/DataTable/Columns/Holiday/HolidayListDataTableColumns";
import { HolidayTypeDataTableColumns } from "@/components/custom/DataTable/Columns/Holiday/HolidayTypeDataTableColumns";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import { getCompanyDetails } from "@/app/(server)/actions/getCompanyDetails";
import { Metadata } from "next";
import SiteConfig from "@/utils/SiteConfig";

export async function generateMetadata({
  params,
}: CompanyByIDPageProps): Promise<Metadata> {
  const mParams = await params;
  const companyId = mParams.companyId;
  const company = await getCompanyDetails(companyId);
  return {
    title: `${SiteConfig.siteName} | ${
      company.data?.company_name ?? "Company Dashboard"
    } | Holiday Management`,
  };
}

export default async function HolidayDashboardPage({
  params,
}: CompanyByIDPageProps) {
  const mParams = await params;
  const companyId = mParams.companyId;
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  const [company, holidayTypes, holidays] = await Promise.all([
    getCompanyData(companyId),
    getHolidayTypes({
      company_id: Number.parseInt(companyId),
    }),
    getHolidays({
      company_id: Number.parseInt(companyId),
    }),
  ]);

  if (company.error || holidayTypes.error || holidays.error) {
    return (
      <main className="container flex flex-col gap-4 sm:gap-6 py-4 sm:py-6">
        <p className="text-lg sm:text-xl md:text-2xl font-semibold">
          Holiday List
        </p>
        <ErrorFallbackCard
          error={company.error ?? holidayTypes.error ?? holidays.error}
        />
      </main>
    );
  }

  return (
    <main className="w-full flex flex-col gap-4 sm:gap-6">
      <div className="flex flex-col gap-1">
        <p className="text-lg sm:text-xl md:text-2xl font-semibold">
          Holiday Management
        </p>
        <MyBreadcrumbs title="Holiday" />
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <CardTitle>All Holidays</CardTitle>

            <Link href="./holiday/all" passHref>
              <Button size="sm" className={ButtonGradient}>
                <Icons.visible />
                View all
              </Button>
            </Link>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col h-96">
          <DataTable
            data={holidays.data.map((item) => ({
              ...item,
              company_holiday_types: holidayTypes.data,
            }))}
            columns={HolidayListDataTableColumns}
            pageCount={1}
            totalItems={holidays.data.length}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <CardTitle>Holiday Types</CardTitle>
            <Link href="./holiday/type" passHref>
              <Button size="sm" className={ButtonGradient}>
                <Icons.visible />
                View all
              </Button>
            </Link>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col h-96">
          <DataTable
            data={holidayTypes.data}
            columns={HolidayTypeDataTableColumns}
            pageCount={1}
            totalItems={holidayTypes.data.length}
          />
        </CardContent>
      </Card>
    </main>
  );
}
