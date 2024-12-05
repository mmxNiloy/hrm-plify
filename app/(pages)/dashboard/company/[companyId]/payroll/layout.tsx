"use server";
import React from "react";
import { CompanyByIDPageProps } from "../PageProps";
import { LayoutProps } from "@/utils/Types";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import LeaveDashboardSidebar from "@/components/custom/Dashboard/Sidebar/LeaveDashboardSidebar";
import { SidebarViewport } from "@/components/custom/Dashboard/Sidebar/Sidebar";
import PayrollDashboardSidebar from "@/components/custom/Dashboard/Sidebar/PayrollDashboardSidebar";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";

interface Props extends CompanyByIDPageProps, LayoutProps {}

export default async function PayrollDashboardLayout({
  children,
  params,
}: Props) {
  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);
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
