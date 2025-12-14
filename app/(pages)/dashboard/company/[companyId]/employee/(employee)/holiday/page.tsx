"use server";
import React from "react";
import { DataTable } from "@/components/ui/data-table/data-table";
import { ISearchParamsProps } from "@/utils/Types";
import { getPaginationParams } from "@/utils/Misc";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import { getHolidayTypes } from "@/app/(server)/actions/getHolidayTypes";
import { getHolidays } from "@/app/(server)/actions/getHolidays";
import HolidayEditDialog from "@/components/custom/Dialog/HolidayEditDialog";
import { HolidayListDataTableColumns } from "@/components/custom/DataTable/Columns/Holiday/HolidayListDataTableColumns";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import AccessDenied from "@/components/custom/AccessDenied";
import { TPermission } from "@/schema/Permissions";
import { getCompanyDetails } from "@/app/(server)/actions/getCompanyDetails";
import { Metadata } from "next";
import { CompanyByIDPageProps } from "../../../PageProps";
import SiteConfig from "@/utils/SiteConfig";

interface Props extends CompanyByIDPageProps, ISearchParamsProps {}

export async function generateMetadata({
  params,
}: CompanyByIDPageProps): Promise<Metadata> {
  const mParams = await params;
  const companyId = mParams.companyId;
  const company = await getCompanyDetails(companyId);
  return {
    title: `${SiteConfig.siteName} | ${
      company.data?.company_name ?? "Company Dashboard"
    } | All Holidays`,
  };
}

export default async function HolidayListPage({ params, searchParams }: Props) {
  const mCookies = await cookies();
  const mPermissions = JSON.parse(
    mCookies.get(process.env.NEXT_PUBLIC_COOKIE_USER_ACCESS_KEY!)?.value ?? "[]"
  ) as TPermission[];

  const readAccess = mPermissions.find((item) => item === "cmp_hol_read");
  const writeAccess = mPermissions.find((item) => item === "cmp_hol_create");
  const updateAccess = mPermissions.find((item) => item === "cmp_hol_update");

  // if (!readAccess) {
  //   return <AccessDenied />;
  // }
  const mParams = await params;
  const companyId = mParams.companyId;
  const { limit, page } = getPaginationParams(await searchParams);
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
    <main className="container flex flex-col gap-4 sm:gap-6 py-4 sm:py-6">
      <p className="text-lg sm:text-xl md:text-2xl font-semibold">
        Holiday List
      </p>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <MyBreadcrumbs parent="Holiday" title="Holiday List" />

        {writeAccess && (
          <HolidayEditDialog
            holidayTypes={holidayTypes.data}
            company_id={Number.parseInt(companyId)}
          />
        )}
      </div>

      <DataTable
        data={holidays.data.map((item) => ({
          ...item,
          company_holiday_types: holidayTypes.data,
          updateAccess: updateAccess ? true : false,
        }))}
        columns={HolidayListDataTableColumns}
      />
    </main>
  );
}
