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
import { CompanyByIDPageProps } from "../../PageProps";
import { StaticDataTable } from "@/components/ui/data-table";
import { ISearchParamsProps } from "@/utils/Types";
import { getPaginationParams } from "@/utils/Misc";
import { IHoliday, IHolidayType } from "@/schema/HolidaySchema";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import { getCompanyExtraData } from "@/app/(server)/actions/getCompanyExtraData";
import { getHolidayTypes } from "@/app/(server)/actions/getHolidayTypes";
import { getHolidays } from "@/app/(server)/actions/getHolidays";
import HolidayEditDialog from "@/components/custom/Dialog/HolidayEditDialog";
import { HolidayListDataTableColumns } from "@/components/custom/DataTable/Columns/Holiday/HolidayListDataTableColumns";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";

interface Props extends CompanyByIDPageProps, ISearchParamsProps {}

export default async function HolidayListPage({ params, searchParams }: Props) {
  const { limit, page } = getPaginationParams(searchParams);

  const company = await getCompanyData(params.companyId);
  const user = JSON.parse(
    cookies().get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;
  const companyExtraData = await getCompanyExtraData(params.companyId);

  const holidayTypes: IHolidayType[] = await getHolidayTypes({
    company_id: params.companyId,
  });
  const holidays: IHoliday[] = await getHolidays({
    company_id: params.companyId,
  });

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Holiday List</p>
      <div className="flex items-center justify-between">
        <MyBreadcrumbs
          company={company}
          user={user}
          parent="Holiday"
          title="Holiday List"
        />

        <HolidayEditDialog
          holidayTypes={holidayTypes}
          company_id={company.company_id}
        />
      </div>

      <StaticDataTable
        data={holidays.map((item) => ({
          ...item,
          company_holiday_types: holidayTypes,
        }))}
        columns={HolidayListDataTableColumns}
      />
    </main>
  );
}
