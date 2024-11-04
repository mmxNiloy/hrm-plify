"use server";
import React from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import { LayoutProps } from "@/utils/Types";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import { SidebarViewport } from "@/components/custom/Dashboard/Sidebar/Sidebar";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import SponsorComplianceDashboardSidebar from "@/components/custom/Dashboard/Sidebar/SponsorComplianceDashboardSidebar";

interface Props extends CompanyByIDPageProps, LayoutProps {}

export default async function SponsorComplianceDashboardLayout({
  children,
  params,
}: Props) {
  const companyId = (await params).companyId;

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
      <SponsorComplianceDashboardSidebar company={company.data} />
      <SidebarViewport>{children}</SidebarViewport>
    </div>
  );
}
