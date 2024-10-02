"use server";
import React from "react";
import { CompanyByIDPageProps } from "../PageProps";
import { redirect } from "next/navigation";
import { ICompany } from "@/schema/CompanySchema";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import { LayoutProps } from "@/utils/Types";
import RotaDashboardSidebar from "@/app/Components/Dashboard/Sidebar/RotaDashboardSidebar";
import { SidebarViewport } from "@/app/Components/Dashboard/Sidebar/Sidebar";
import UserAccessDashboardSidebar from "@/app/Components/Dashboard/Sidebar/UserAccessDashboardSidebar";
import HolidayDashboardSidebar from "@/app/Components/Dashboard/Sidebar/HolidayDashboardSidebar";

interface Props extends CompanyByIDPageProps, LayoutProps {}

export default async function HolidayDashboardPageLayout({
  children,
  params,
}: Props) {
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
  return (
    <div>
      <HolidayDashboardSidebar company={company} />

      <SidebarViewport>{children}</SidebarViewport>
    </div>
  );
}
