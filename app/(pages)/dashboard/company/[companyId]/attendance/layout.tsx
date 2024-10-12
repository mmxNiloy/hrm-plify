"use server";
import React from "react";
import { CompanyByIDPageProps } from "../PageProps";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import { LayoutProps } from "@/utils/Types";
import AttendanceDashboardSidebar from "@/components/custom/Dashboard/Sidebar/AttendanceDashboardSidebar";
import { SidebarViewport } from "@/components/custom/Dashboard/Sidebar/Sidebar";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";

interface Props extends CompanyByIDPageProps, LayoutProps {}

export default async function AttendanceDashboardPageLayout({
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
      <AttendanceDashboardSidebar company={company} />

      <SidebarViewport>{children}</SidebarViewport>
    </div>
  );
}
