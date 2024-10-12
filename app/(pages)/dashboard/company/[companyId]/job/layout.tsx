"use server";
import { LayoutProps } from "@/utils/Types";
import React from "react";
import { CompanyByIDPageProps } from "../PageProps";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import { ICompany } from "@/schema/CompanySchema";
import { redirect } from "next/navigation";
import JobDashboardSidebar from "@/components/custom/Dashboard/Sidebar/JobDashboardSidebar";
import { SidebarViewport } from "@/components/custom/Dashboard/Sidebar/Sidebar";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";

interface Props extends LayoutProps, CompanyByIDPageProps {}

export default async function CompanyJobsPageLayout({
  children,
  params,
}: Props) {
  // Get company information
  const session = cookies().get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";
  const user = JSON.parse(
    cookies().get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;
  const company = await getCompanyData(params.companyId);

  return (
    <div>
      <JobDashboardSidebar company={company} />
      <SidebarViewport>{children}</SidebarViewport>
    </div>
  );
}
