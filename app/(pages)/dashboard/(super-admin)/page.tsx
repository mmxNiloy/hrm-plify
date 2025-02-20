"use server";
import CompanySearchCommand from "@/components/custom/Dashboard/Company/CompanySearchCommand";
import CompanyCreationDialog from "@/components/custom/Dialog/Company/CompanyCreationDialog";
import { Label } from "@/components/ui/label";
import { TPermission } from "@/schema/Permissions";
import SiteConfig from "@/utils/SiteConfig";
import { Metadata } from "next";
import { cookies } from "next/headers";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
  // const user = await getUserData();
  return {
    title: `${SiteConfig.siteName} | Dashboard | Super Admin`,
  };
}

export default async function DashboardPage() {
  const mCookies = await cookies();
  const mPermissions = JSON.parse(
    mCookies.get(process.env.NEXT_PUBLIC_COOKIE_USER_ACCESS_KEY!)?.value ?? "[]"
  ) as TPermission[];

  const readAccess = mPermissions.find((item) => item === "cmp_mgmt_read");
  const writeAccess = mPermissions.find((item) => item === "cmp_mgmt_create");

  return (
    <main className="container flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <p className="text-xl font-semibold">Dashboard</p>
        {writeAccess && <CompanyCreationDialog asClient={false} />}

        {/* Filters */}
      </div>

      <div className="flex flex-col gap-2">
        <Label className="text-lg">Please Select a Company</Label>
        <CompanySearchCommand />
      </div>
    </main>
  );
}
