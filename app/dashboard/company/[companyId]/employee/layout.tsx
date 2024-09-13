"use server";
import EmployeeDrawer from "@/app/Components/Dashboard/Employee/EmployeeDrawer";
import { LayoutProps } from "@/utils/Types";
import React from "react";
import { CompanyByIDPageProps } from "../PageProps";
import {
  Sidebar,
  SidebarViewport,
} from "@/app/Components/Dashboard/Sidebar/Sidebar";
import EmployeeDashboardSidebar from "@/app/Components/Dashboard/Sidebar/EmployeeDashboardSidebar";
import { redirect } from "next/navigation";
import { ICompany } from "@/schema/CompanySchema";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import { wait } from "@/utils/wait";

interface Props extends LayoutProps, CompanyByIDPageProps {}

export default async function EmployeeLayout({ children, params }: Props) {
  // Get company information
  const session = cookies().get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";
  const user = JSON.parse(
    cookies().get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;
  var company: ICompany;

  try {
    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/companies/${params.companyId}`,
      {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      }
    );

    if (!apiRes.ok) redirect("/not-found");
    company = (await apiRes.json()) as ICompany;
  } catch (err) {
    console.error("Failed to fetch company information", err);
    redirect("/not-found");
  }

  // await wait(5000);

  return (
    <div className="space-x-2">
      {/* Navbar has h-16 */}
      <EmployeeDashboardSidebar company={company} />

      <SidebarViewport>{children}</SidebarViewport>
    </div>
  );
}
