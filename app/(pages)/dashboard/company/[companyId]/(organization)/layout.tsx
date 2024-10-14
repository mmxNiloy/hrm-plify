"use server";
import React from "react";
import { redirect } from "next/navigation";
import { ICompany } from "@/schema/CompanySchema";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import { LayoutProps } from "@/utils/Types";
import { CompanyByIDPageProps } from "../PageProps";
import CompanyDashboardSidebar from "@/components/custom/Dashboard/Sidebar/CompanyDashboardSidebar";
import { SidebarViewport } from "@/components/custom/Dashboard/Sidebar/Sidebar";

interface Props extends CompanyByIDPageProps, LayoutProps {}

export default async function CompanyByIdDashboardPageLayout({
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
      <CompanyDashboardSidebar user={user} company={company} />

      <SidebarViewport>{children}</SidebarViewport>
    </div>
  );
}
