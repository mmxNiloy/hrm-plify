"use server";
import React from "react";
import { CompanyByIDPageProps } from "../PageProps";
import { LayoutProps } from "@/utils/Types";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import LeaveDashboardSidebar from "@/components/custom/Dashboard/Sidebar/LeaveDashboardSidebar";
import { SidebarViewport } from "@/components/custom/Dashboard/Sidebar/Sidebar";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import { cookies } from "next/headers";
import { TPermission } from "@/schema/Permissions";
import AccessDenied from "@/components/custom/AccessDenied";

interface Props extends CompanyByIDPageProps, LayoutProps {}

export default async function CompanyLeaveDashboardLayout({
  children,
  params,
}: Props) {
  const mCookies = await cookies();
  const mPermissions = JSON.parse(
    mCookies.get(process.env.NEXT_PUBLIC_COOKIE_USER_ACCESS_KEY!)?.value ?? "[]"
  ) as TPermission[];

  const readAccess = mPermissions.find((item) => item === "cmp_leave_read");
  const writeAccess = mPermissions.find((item) => item === "cmp_leave_create");
  const updateAccess = mPermissions.find((item) => item === "cmp_leave_update");

  if (!readAccess) {
    return <AccessDenied />;
  }

  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);
  const company = await getCompanyData(companyId);

  if (company.error) {
    return (
      <main className="container flex flex-col gap-2">
        <p className="text-xl font-semibold">Leave Management Dashboard</p>
        <ErrorFallbackCard error={company.error} />
      </main>
    );
  }

  return (
    <div>
      <LeaveDashboardSidebar company={company.data} />
      <SidebarViewport>{children}</SidebarViewport>
    </div>
  );
}
