"use server";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import React from "react";
import { getCompanyExtraData } from "@/app/(server)/actions/getCompanyExtraData";
import { StaticDataTable } from "@/components/ui/data-table";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import { getCompanyDetails } from "@/app/(server)/actions/getCompanyDetails";
import { Metadata } from "next";
import SiteConfig from "@/utils/SiteConfig";
import { TPermission } from "@/schema/Permissions";
import { SearchParams } from "nuqs";
import { searchParamsCache, serialize } from "@/utils/searchParamsParsers";
import getFingerprintDeviceEmployees from "@/app/(server)/actions/fingerprint/get-fingerprint-device-employees.controller";
import UserRegDialog from "./user-reg-dialog";
import { FingerprintDeviceUserDataTableColumns } from "@/components/custom/DataTable/Columns/Attendance/FingerprintDeviceUserDataTableColumns copy";

interface Props {
  searchParams: Promise<SearchParams>;
  params: Promise<{
    serialNum: string;
    companyId: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const mParams = await params;
  const companyId = mParams.companyId;
  const company = await getCompanyDetails(Number.parseInt(companyId));
  return {
    title: `${SiteConfig.appName} | ${
      company.data?.company_name ?? "Company Dashboard"
    } | Fingerprint Device Users`,
  };
}

export default async function AbsentReportPage({
  params,
  searchParams,
}: Props) {
  const mParams = await params;
  const { companyId, serialNum } = mParams;

  const mCookies = await cookies();
  const user = JSON.parse(
    mCookies.get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  const sParams = await searchParams;
  searchParamsCache.parse(sParams);
  const key = serialize({ ...sParams });
  const page = searchParamsCache.get("page");
  const limit = searchParamsCache.get("limit");

  const [company, companyExtraData, deviceEmps] = await Promise.all([
    getCompanyData(Number.parseInt(companyId)),
    getCompanyExtraData(Number.parseInt(companyId)),
    getFingerprintDeviceEmployees({
      serialNum,
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

  if (company.error || companyExtraData.error || deviceEmps.error) {
    return (
      <main className="container flex flex-col gap-2">
        <p className="text-xl font-semibold">Fingerprint Device Users</p>
        <ErrorFallbackCard
          error={company.error ?? companyExtraData.error ?? deviceEmps.error}
        />
      </main>
    );
  }

  const data = deviceEmps.payload;
  const meta = deviceEmps.meta!;

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Fingerprint Device Users</p>
      <div className="flex items-center justify-between">
        <MyBreadcrumbs
          {...{
            user,
            company: company.data,
            title: "Fingerprint Device Users",
          }}
        />

        {writeAccess && (
          <UserRegDialog
            serialNum={serialNum}
            employees={companyExtraData.data.employees}
          />
        )}
      </div>

      <StaticDataTable
        data={data.map((item) => ({ ...item, updateAccess: !!updateAccess }))}
        columns={FingerprintDeviceUserDataTableColumns}
        pageCount={meta.pageCount}
      />
    </main>
  );
}
