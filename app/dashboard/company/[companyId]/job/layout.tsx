"use server";
import { LayoutProps } from "@/utils/Types";
import React from "react";
import { CompanyByIDPageProps } from "../PageProps";
import JobsNavDrawer from "@/app/Components/Dashboard/Job/JobsNavDrawer";
import JobDashboardSidebar from "@/app/Components/Dashboard/Sidebar/JobDashboardSidebar";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import { ICompany } from "@/schema/CompanySchema";
import { redirect } from "next/navigation";
import { SidebarViewport } from "@/app/Components/Dashboard/Sidebar/Sidebar";

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
      <JobDashboardSidebar company={company} />
      <SidebarViewport>{children}</SidebarViewport>
    </div>
  );
}
