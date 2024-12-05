"use server";
import React from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import { DataTable, StaticDataTable } from "@/components/ui/data-table";
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
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";

interface Props extends CompanyByIDPageProps, ISearchParamsProps {}

export default async function HolidayListPage({ params, searchParams }: Props) {
  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);
  const { limit, page } = getPaginationParams(await searchParams);
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
      <main className="container flex flex-col gap-2">
        <p className="text-xl font-semibold">Holiday List</p>
        <ErrorFallbackCard
          error={company.error ?? holidayTypes.error ?? holidays.error}
        />
      </main>
    );
  }

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Holiday List</p>
      <div className="flex items-center justify-between">
        <MyBreadcrumbs
          company={company.data}
          user={user}
          parent="Holiday"
          title="Holiday List"
        />

        <HolidayEditDialog
          holidayTypes={holidayTypes.data}
          company_id={companyId}
        />
      </div>

      <DataTable
        data={holidays.data.map((item) => ({
          ...item,
          company_holiday_types: holidayTypes.data,
        }))}
        columns={HolidayListDataTableColumns}
      />
    </main>
  );
}
