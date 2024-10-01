"use server";
import { LayoutProps } from "@/utils/Types";
import React from "react";
import { SidebarViewport } from "@/app/Components/Dashboard/Sidebar/Sidebar";
import EmployeeDashboardSidebar from "@/app/Components/Dashboard/Sidebar/EmployeeDashboardSidebar";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import { getCompanyData } from "@/app/actions/getCompanyData";
import { CompanyByIDPageProps } from "../../PageProps";
import EmployeeHomeSidebar from "@/app/Components/Dashboard/Sidebar/EmployeeHomeSidebar";
import { getEmployeeData } from "@/app/actions/getEmployeeData";
import { redirect } from "next/navigation";

interface Props extends LayoutProps, CompanyByIDPageProps {}

export default async function EmployeeHomeLayout({ children, params }: Props) {
  // Get company information
  const user = JSON.parse(
    cookies().get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;
  const employee = await getEmployeeData();
  const company = await getCompanyData(params.companyId);

  if (employee.role_name === "Admin" || employee.role_name === "Super Admin") {
    redirect("/dashboard/company/leave?_ref=role-mismatch");
  }

  if (!employee.data) {
    redirect("/api/logout?_ref=data-not-found");
  }

  return (
    <div>
      {/* Navbar has h-16 */}
      <EmployeeHomeSidebar company={company} employee={employee.data} />

      <SidebarViewport>{children}</SidebarViewport>
    </div>
  );
}
