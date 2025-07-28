"use server";
import React from "react";
import { CompanyByIDPageProps } from "../PageProps";
import { redirect } from "next/navigation";
import { ICompany } from "@/schema/CompanySchema";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import { LayoutProps } from "@/utils/Types";
import HolidayDashboardSidebar from "@/components/custom/Dashboard/Sidebar/HolidayDashboardSidebar";
import { SidebarViewport } from "@/components/custom/Dashboard/Sidebar/Sidebar";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import AccessDenied from "@/components/custom/AccessDenied";
import { TPermission } from "@/schema/Permissions";

interface Props extends CompanyByIDPageProps, LayoutProps {}

export default async function HolidayDashboardPageLayout({
  children,
  params,
}: Props) {
  const mCookies = await cookies();
  const mPermissions = JSON.parse(
    mCookies.get(process.env.NEXT_PUBLIC_COOKIE_USER_ACCESS_KEY!)?.value ?? "[]"
  ) as TPermission[];

  const readAccess = mPermissions.find((item) => item === "cmp_hol_read");
  const writeAccess = mPermissions.find((item) => item === "cmp_hol_create");
  const updateAccess = mPermissions.find((item) => item === "cmp_hol_update");

  if (!readAccess) {
    return <AccessDenied />;
  }
  // Get company information
  const mParams = await params;
  const companyId = mParams.companyId;
  const company = await getCompanyData(companyId);

  if (company.error) {
    return (
      <main className="container flex flex-col gap-2">
        <p className="text-xl font-semibold">Holiday Management</p>
        <ErrorFallbackCard error={company.error} />
      </main>
    );
  }

  return (
    <div>
      <HolidayDashboardSidebar company={company.data} />

      <SidebarViewport>{children}</SidebarViewport>
    </div>
  );
}
