"use server";
import React from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import { DataTable, StaticDataTable } from "@/components/ui/data-table";
import { ISearchParamsProps } from "@/utils/Types";
import { getPaginationParams } from "@/utils/Misc";
import { IHolidayType } from "@/schema/HolidaySchema";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import { getHolidayTypes } from "@/app/(server)/actions/getHolidayTypes";
import HolidayTypeEditPopover from "@/components/custom/Popover/HolidayTypeEditPopover";
import { HolidayTypeDataTableColumns } from "@/components/custom/DataTable/Columns/Holiday/HolidayTypeDataTableColumns";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";

interface Props extends CompanyByIDPageProps, ISearchParamsProps {}

export default async function HolidayTypesPage({
  params,
  searchParams,
}: Props) {
  const companyId = (await params).companyId;
  const { limit, page } = getPaginationParams(await searchParams);
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  const [company, holidayTypes] = await Promise.all([
    getCompanyData(companyId),
    getHolidayTypes({
      company_id: companyId,
    }),
  ]);

  if (company.error || holidayTypes.error) {
    return (
      <main className="container flex flex-col gap-2">
        <p className="text-xl font-semibold">Holiday Types</p>
        <ErrorFallbackCard error={company.error || holidayTypes.error} />
      </main>
    );
  }

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Holiday Types</p>
      <div className="flex items-center justify-between">
        <MyBreadcrumbs
          company={company.data}
          user={user}
          parent="Holiday"
          title="Type"
        />

        <HolidayTypeEditPopover company_id={companyId} />
      </div>

      <DataTable
        data={holidayTypes.data}
        columns={HolidayTypeDataTableColumns}
      />
    </main>
  );
}
