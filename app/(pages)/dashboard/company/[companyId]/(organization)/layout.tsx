"use server";
import React from "react";
import { LayoutProps } from "@/utils/Types";
import { CompanyByIDPageProps } from "../PageProps";
import CompanyDashboardSidebar from "@/components/custom/Dashboard/Sidebar/CompanyDashboardSidebar";
import { SidebarViewport } from "@/components/custom/Dashboard/Sidebar/Sidebar";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import getCurrentUser from "@/app/(server)/actions/user/get-current-user.controller";

interface Props extends CompanyByIDPageProps, LayoutProps {}

export default async function CompanyByIdDashboardPageLayout({
  children,
  params,
}: Props) {
  const [prms, user] = await Promise.all([params, getCurrentUser()]);
  var companyId = prms.companyId;
  const company = await getCompanyData(companyId);

  if (company.error || !user) {
    return <ErrorFallbackCard error={company.error} />;
  }

  return (
    <>
      <main>
        <CompanyDashboardSidebar user={user} company={company.data} />

        <SidebarViewport>{children}</SidebarViewport>
      </main>
    </>
  );
}
