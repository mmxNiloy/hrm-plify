"use server";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import React from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import { getCompanyExtraData } from "@/app/(server)/actions/getCompanyExtraData";
import AttendanceReportFilterPopover from "@/components/custom/Popover/Attendance/AttendanceReportFilterPopover";
import { ISearchParams, ISearchParamsProps } from "@/utils/Types";
import { getPaginationParams } from "@/utils/Misc";
import { DataTable, StaticDataTable } from "@/components/ui/data-table";
import { AttendanceReportDataTableColumns } from "@/components/custom/DataTable/Columns/Attendance/AttendanceReportDataTableColumns";
import { getAbsentReports } from "@/app/(server)/actions/getAbsentReport";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import AbsentReportGenerator from "@/components/custom/PDF/AbsentReportGenerator";
import { getCompanyDetails } from "@/app/(server)/actions/getCompanyDetails";
import { Metadata } from "next";
import SiteConfig from "@/utils/SiteConfig";
import { ESortFilter } from "@/schema/enum/sort-filter";
import { FingerprintDeviceDataTableColumns } from "@/components/custom/DataTable/Columns/Attendance/FingerprintDeviceListDataTableColumns";
import getFingerprintDevices from "@/app/(server)/actions/fingerprint/get-fingerprint-devices.controller";
import { TPermission } from "@/schema/Permissions";
import FingerprintDeviceCreationDialog from "./fingerprint-device-creation-dialog";

interface Props extends CompanyByIDPageProps, ISearchParamsProps {}

function getFilters(searchParams: ISearchParams) {
  return {
    employee_ids:
      (searchParams.employees as string | undefined)
        ?.split(",")
        .map((id) => Number.parseInt(id)) ?? [],
    from_date: searchParams.fromDate as string | undefined,
    end_date: searchParams.toDate as string | undefined,
    sort: (searchParams.sort as ESortFilter | undefined) ?? ESortFilter.DESC,
  };
}

export async function generateMetadata({
  params,
}: CompanyByIDPageProps): Promise<Metadata> {
  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);
  const company = await getCompanyDetails(companyId);
  return {
    title: `${SiteConfig.appName} | ${
      company.data?.company_name ?? "Company Dashboard"
    } | Fingerprint Devices`,
  };
}

export default async function AbsentReportPage({
  params,
  searchParams,
}: Props) {
  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);
  const mCookies = await cookies();
  const user = JSON.parse(
    mCookies.get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;
  const sParams = await searchParams;
  const filters = getFilters(sParams);
  const { limit, page } = getPaginationParams(sParams);

  const [company, companyExtraData, devices] = await Promise.all([
    getCompanyData(companyId),
    getCompanyExtraData(companyId),
    getFingerprintDevices({
      companyId: companyId.toString(),
      limit,
      page,
    }),
  ]);

  const mPermissions = JSON.parse(
    mCookies.get(process.env.NEXT_PUBLIC_COOKIE_USER_ACCESS_KEY!)?.value ?? "[]"
  ) as TPermission[];

  const readAccess = mPermissions.find((item) => item === "cmp_attend_read");
  const writeAccess = mPermissions.find((item) => item === "cmp_attend_create");
  const updateAccess = mPermissions.find(
    (item) => item === "cmp_attend_update"
  );

  if (company.error || companyExtraData.error || devices.error) {
    return (
      <main className="container flex flex-col gap-2">
        <p className="text-xl font-semibold">Fingerprint Devices</p>
        <ErrorFallbackCard
          error={company.error ?? companyExtraData.error ?? devices.error}
        />
      </main>
    );
  }

  const data = devices.payload;

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Fingerprint Devices</p>
      <div className="flex items-center justify-between">
        <MyBreadcrumbs
          {...{
            user,
            company: company.data,
            title: "Fingerprint Devices",
          }}
        />

        {writeAccess && (
          <FingerprintDeviceCreationDialog companyId={companyId.toString()} />
        )}
      </div>

      <DataTable
        data={data.map((item) => ({ ...item, updateAccess: !!updateAccess }))}
        columns={FingerprintDeviceDataTableColumns}
      />
    </main>
  );
}
