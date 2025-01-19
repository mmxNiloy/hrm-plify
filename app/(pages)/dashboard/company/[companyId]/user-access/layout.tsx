"use server";
import React from "react";
import { CompanyByIDPageProps } from "../PageProps";
import { redirect } from "next/navigation";
import { ICompany } from "@/schema/CompanySchema";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import { LayoutProps } from "@/utils/Types";
import UserAccessDashboardSidebar from "@/components/custom/Dashboard/Sidebar/UserAccessDashboardSidebar";
import { SidebarViewport } from "@/components/custom/Dashboard/Sidebar/Sidebar";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";

interface Props extends CompanyByIDPageProps, LayoutProps {}

export default async function UserAccessDashboardPageLayout({
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
    return (
      <main className="container flex flex-col gap-2">
        <p className="text-xl font-semibold">User Access Management</p>
        <ErrorFallbackCard error={company.error} />
      </main>
    );
  }

  return (
    <div>
      <UserAccessDashboardSidebar company={company.data} />

      <SidebarViewport>{children}</SidebarViewport>
    </div>
  );
}
