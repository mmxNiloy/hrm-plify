"use server";
import CompanySearchCommand from "@/components/custom/Dashboard/Company/CompanySearchCommand";
import CompanyCreationDialog from "@/components/custom/Dialog/Company/CompanyCreationDialog";
import { Label } from "@/components/ui/label";
import { TPermission } from "@/schema/Permissions";
import { searchParamsCache, serialize } from "@/utils/searchParamsParsers";
import SiteConfig from "@/utils/SiteConfig";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { SearchParams } from "nuqs";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `${SiteConfig.siteName} | Dashboard | Super Admin`,
  };
}

interface IDashboardPageProps {
  searchParams: Promise<SearchParams>;
}

export default async function DashboardPage({
  searchParams,
}: IDashboardPageProps) {
  const [mCookies, sParams] = await Promise.all([cookies(), searchParams]);
  const mPermissions = JSON.parse(
    mCookies.get(process.env.NEXT_PUBLIC_COOKIE_USER_ACCESS_KEY!)?.value ?? "[]"
  ) as TPermission[];

  const readAccess = mPermissions.find((item) => item === "cmp_mgmt_read");
  const writeAccess = mPermissions.find((item) => item === "cmp_mgmt_create");

  searchParamsCache.parse(sParams);

  return (
    <main className="container mx-auto flex flex-col gap-4 px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <p className="text-lg sm:text-xl md:text-2xl font-semibold">
          Dashboard
        </p>
        {writeAccess && <CompanyCreationDialog asClient={false} />}
      </div>

      <div className="flex flex-col gap-2 sm:gap-3">
        <Label className="text-base sm:text-lg">Please Select a Company</Label>
        <CompanySearchCommand searchParams={sParams} />
      </div>
    </main>
  );
}
