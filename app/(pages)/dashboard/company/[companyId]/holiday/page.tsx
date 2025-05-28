"use server";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
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
  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);
  const company = await getCompanyDetails(companyId);
  return {
    title: `${SiteConfig.appName} | ${
      company.data?.company_name ?? "Company Dashboard"
    } | Holiday Management`,
  };
}

export default async function HolidayDashboardPage({
  params,
}: CompanyByIDPageProps) {
  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  const [company, holidayTypes, holidays] = await Promise.all([
    getCompanyData(companyId),
    getHolidayTypes({
      company_id: companyId,
    }),
    getHolidays({
      company_id: companyId,
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
    <main className="container flex flex-col gap-4 sm:gap-6 py-4 sm:py-6">
      <p className="text-lg sm:text-xl md:text-2xl font-semibold">
        Holiday Management
      </p>
      <MyBreadcrumbs company={company.data} user={user} title="Holiday" />
      <Card>
        <CardHeader>
          <CardTitle>All Holidays</CardTitle>
        </CardHeader>

        <CardContent>
          <DataTable
            data={holidays.data.map((item) => ({
              ...item,
              company_holiday_types: holidayTypes.data,
            }))}
            columns={HolidayListDataTableColumns}
          />
        </CardContent>

        <CardFooter>
          <Link href="./holiday/all" passHref>
            <Button className={ButtonGradient}>
              <Icons.visible />
              View all
            </Button>
          </Link>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Holiday Types</CardTitle>
        </CardHeader>

        <CardContent>
          <DataTable
            data={holidayTypes.data}
            columns={HolidayTypeDataTableColumns}
          />
        </CardContent>

        <CardFooter>
          <Link href="./holiday/type" passHref>
            <Button className={ButtonGradient}>
              <Icons.visible />
              View all
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}
