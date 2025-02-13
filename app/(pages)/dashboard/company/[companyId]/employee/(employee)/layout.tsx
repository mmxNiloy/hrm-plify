"use server";
import { LayoutProps } from "@/utils/Types";
import React from "react";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import { CompanyByIDPageProps } from "../../PageProps";
import { redirect } from "next/navigation";
import { getEmployeeData } from "@/app/(server)/actions/getEmployeeData";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import EmployeeHomeSidebar from "@/components/custom/Dashboard/Sidebar/EmployeeHomeSidebar";
import { SidebarViewport } from "@/components/custom/Dashboard/Sidebar/Sidebar";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";

interface Props extends LayoutProps, CompanyByIDPageProps {}

export default async function EmployeeHomeLayout({ children, params }: Props) {
  // Get company information
  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;
  const [employee, company] = await Promise.all([
    getEmployeeData(),
    getCompanyData(companyId),
    // didAttendToday(),
  ]);

  if (employee.error || company.error) {
    return (
      <main className="container flex flex-col gap-2">
        <p className="text-xl font-semibold">Employees&apos; Dashboard</p>
        <ErrorFallbackCard error={employee.error ?? company.error} />
      </main>
    );
  }

  if (
    employee.data.role_name === "Admin" ||
    employee.data.role_name === "Super Admin"
  ) {
    redirect("/dashboard/company/leave?_ref=role-mismatch");
  }

  if (!employee.data.data) {
    redirect("/api/logout?_ref=data-not-found");
  }

  return (
    <div>
      {/* Navbar has h-16 */}
      <EmployeeHomeSidebar company={company.data} />

      <SidebarViewport className="flex flex-col gap-1">
        {children}
      </SidebarViewport>
    </div>
  );
}
