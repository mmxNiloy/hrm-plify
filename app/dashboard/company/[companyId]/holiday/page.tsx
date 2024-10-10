"use server";
import { getCompanyData } from "@/app/actions/getCompanyData";
import { getCompanyExtraData } from "@/app/actions/getCompanyExtraData";
import { HolidayTypeDataTableColumns } from "@/app/Components/Holiday/HolidayTypeDataTableColumns";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StaticDataTable } from "@/components/ui/data-table";
import Icons from "@/components/ui/icons";
import { IHoliday, IHolidayType } from "@/schema/HolidaySchema";
import { ButtonBlue } from "@/styles/button.tailwind";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { CompanyByIDPageProps } from "../PageProps";
import { getHolidayTypes } from "@/app/actions/getHolidayTypes";
import { getHolidays } from "@/app/actions/getHolidays";
import { HolidayListDataTableColumns } from "@/app/Components/Holiday/HolidayListDataTableColumns";

export default async function HolidayDashboardPage({
  params,
}: CompanyByIDPageProps) {
  const company = await getCompanyData(params.companyId);
  const companyExtraData = await getCompanyExtraData(params.companyId);

  const holidayTypes: IHolidayType[] = await getHolidayTypes({
    company_id: params.companyId,
  });
  const holidays: IHoliday[] = await getHolidays({
    company_id: params.companyId,
  });

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Holiday Management</p>
      <Card>
        <CardHeader>
          <CardTitle>All Holidays</CardTitle>
        </CardHeader>

        <CardContent>
          <StaticDataTable
            data={holidays.map((item) => ({
              ...item,
              company_holiday_types: holidayTypes,
            }))}
            columns={HolidayListDataTableColumns}
          />
        </CardContent>

        <CardFooter>
          <Link href="all" passHref>
            <Button className={ButtonBlue}>
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
          <StaticDataTable
            data={holidayTypes}
            columns={HolidayTypeDataTableColumns}
          />
        </CardContent>

        <CardFooter>
          <Link href="type" passHref>
            <Button className={ButtonBlue}>
              <Icons.visible />
              View all
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}
