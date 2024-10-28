"use server";
import React from "react";
import { CompanyByIDPageProps } from "../PageProps";
import { LayoutProps } from "@/utils/Types";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import LeaveDashboardSidebar from "@/components/custom/Dashboard/Sidebar/LeaveDashboardSidebar";
import { SidebarViewport } from "@/components/custom/Dashboard/Sidebar/Sidebar";
import PayrollDashboardSidebar from "@/components/custom/Dashboard/Sidebar/PayrollDashboardSidebar";

interface Props extends CompanyByIDPageProps, LayoutProps {}

export default async function PayrollDashboardLayout({
  children,
  params,
}: Props) {
  const company = await getCompanyData(params.companyId);

  return (
    <div>
      <PayrollDashboardSidebar company={company} />
      <SidebarViewport>{children}</SidebarViewport>
    </div>
  );
}
