"use server";
import { LayoutProps } from "@/utils/Types";
import React from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import EmployeeDashboardSidebar from "@/components/custom/Dashboard/Sidebar/EmployeeDashboardSidebar";
import { SidebarViewport } from "@/components/custom/Dashboard/Sidebar/Sidebar";

interface Props extends LayoutProps, CompanyByIDPageProps {}

export default async function EmployeeLayout({ children, params }: Props) {
  // Get company information
  const session = cookies().get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";
  const user = JSON.parse(
    cookies().get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;
  const company = await getCompanyData(params.companyId);

  return (
    <div>
      {/* Navbar has h-16 */}
      <EmployeeDashboardSidebar company={company} />

      <SidebarViewport>{children}</SidebarViewport>
    </div>
  );
}
