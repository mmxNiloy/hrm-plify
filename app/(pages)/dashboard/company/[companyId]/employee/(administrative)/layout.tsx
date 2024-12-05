"use server";
import { LayoutProps } from "@/utils/Types";
import React from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import EmployeeDashboardSidebar from "@/components/custom/Dashboard/Sidebar/EmployeeDashboardSidebar";
import { SidebarViewport } from "@/components/custom/Dashboard/Sidebar/Sidebar";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";

interface Props extends LayoutProps, CompanyByIDPageProps {}

export default async function EmployeeLayout({ children, params }: Props) {
  // Get company information
  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;
  const company = await getCompanyData(companyId);

  if (company.error) {
    return (
      <div className="flex flex-col gap-2">
        <p className="text-xl font-semibold">Employee Management</p>
        <ErrorFallbackCard error={company.error} />
      </div>
    );
  }

  return (
    <div>
      {/* Navbar has h-16 */}
      <EmployeeDashboardSidebar company={company.data} />

      <SidebarViewport>{children}</SidebarViewport>
    </div>
  );
}
