"use server";
import React from "react";
import { CompanyByIDPageProps } from "../PageProps";
import { LayoutProps } from "@/utils/Types";
import { SidebarViewport } from "@/app/Components/Dashboard/Sidebar/Sidebar";
import LeaveDashboardSidebar from "@/app/Components/Dashboard/Sidebar/LeaveDashboardSidebar";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import { ICompany } from "@/schema/CompanySchema";
import { redirect } from "next/navigation";
import { getCompanyData } from "@/app/actions/getCompanyData";

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
