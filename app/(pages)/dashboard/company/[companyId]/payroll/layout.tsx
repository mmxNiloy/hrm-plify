"use server";
import React from "react";
import { CompanyByIDPageProps } from "../PageProps";
import { LayoutProps } from "@/utils/Types";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import LeaveDashboardSidebar from "@/components/custom/Dashboard/Sidebar/LeaveDashboardSidebar";
import { SidebarViewport } from "@/components/custom/Dashboard/Sidebar/Sidebar";
import PayrollDashboardSidebar from "@/components/custom/Dashboard/Sidebar/PayrollDashboardSidebar";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import AccessDenied from "@/components/custom/AccessDenied";
import { TPermission } from "@/schema/Permissions";
import { cookies } from "next/headers";

interface Props extends CompanyByIDPageProps, LayoutProps {}

export default async function PayrollDashboardLayout({
  children,
  params,
}: Props) {
  const mCookies = await cookies();
  const mPermissions = JSON.parse(
    mCookies.get(process.env.NEXT_PUBLIC_COOKIE_USER_ACCESS_KEY!)?.value ?? "[]"
  ) as TPermission[];

  const readAccess = mPermissions.find((item) => item === "cmp_payroll_read");
  const writeAccess = mPermissions.find(
    (item) => item === "cmp_payroll_create"
  );
  const updateAccess = mPermissions.find(
    (item) => item === "cmp_payroll_update"
  );

  if (!readAccess) {
    return <AccessDenied />;
  }

  const mParams = await params;
  const companyId = mParams.companyId;
  const company = await getCompanyData(companyId);

  if (company.error) {
    return (
      <main className="container flex flex-col gap-2">
        <p className="text-xl font-semibold">Payroll</p>
        <ErrorFallbackCard error={company.error} />
      </main>
    );
  }

  return (
    <div>
      <PayrollDashboardSidebar company={company.data} />
      <SidebarViewport>{children}</SidebarViewport>
    </div>
  );
}
