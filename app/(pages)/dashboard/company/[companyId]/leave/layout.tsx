"use server";
import React from "react";
import { CompanyByIDPageProps } from "../PageProps";
import { LayoutProps } from "@/utils/Types";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import LeaveDashboardSidebar from "@/components/custom/Dashboard/Sidebar/LeaveDashboardSidebar";
import { SidebarViewport } from "@/components/custom/Dashboard/Sidebar/Sidebar";

interface Props extends CompanyByIDPageProps, LayoutProps {}

export default async function CompanyLeaveDashboardLayout({
  children,
  params,
}: Props) {
  const company = await getCompanyData(params.companyId);

  return (
    <div>
      <LeaveDashboardSidebar company={company} />
      <SidebarViewport>{children}</SidebarViewport>
    </div>
  );
}
