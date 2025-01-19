"use server";
import React from "react";
import { redirect } from "next/navigation";
import { ICompany } from "@/schema/CompanySchema";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import { LayoutProps } from "@/utils/Types";
import { CompanyByIDPageProps } from "../PageProps";
import CompanyDashboardSidebar from "@/components/custom/Dashboard/Sidebar/CompanyDashboardSidebar";
import { SidebarViewport } from "@/components/custom/Dashboard/Sidebar/Sidebar";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";

interface Props extends CompanyByIDPageProps, LayoutProps {}

export default async function CompanyDocumentsPageLayout({
  children,
  params,
}: Props) {
  // Get company information
  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;
  const company = await getCompanyData(companyId);
  if (company.error) {
    return <ErrorFallbackCard error={company.error} />;
  }
  return (
    <div>
      <CompanyDashboardSidebar user={user} company={company.data} />

      <SidebarViewport>{children}</SidebarViewport>
    </div>
  );
}
