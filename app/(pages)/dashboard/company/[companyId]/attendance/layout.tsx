"use server";
import React from "react";
import { CompanyByIDPageProps } from "../PageProps";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import { LayoutProps } from "@/utils/Types";
import AttendanceDashboardSidebar from "@/components/custom/Dashboard/Sidebar/AttendanceDashboardSidebar";
import { SidebarViewport } from "@/components/custom/Dashboard/Sidebar/Sidebar";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import { TPermission } from "@/schema/Permissions";
import AccessDenied from "@/components/custom/AccessDenied";

interface Props extends CompanyByIDPageProps, LayoutProps {}

export default async function AttendanceDashboardPageLayout({
  children,
  params,
}: Props) {
  const mCookies = await cookies();
  const mPermissions = JSON.parse(
    mCookies.get(process.env.NEXT_PUBLIC_COOKIE_USER_ACCESS_KEY!)?.value ?? "[]"
  ) as TPermission[];

  const readAccess = mPermissions.find((item) => item === "cmp_attend_read");
  const writeAccess = mPermissions.find((item) => item === "cmp_attend_create");
  const updateAccess = mPermissions.find(
    (item) => item === "cmp_attend_update"
  );

  if (!readAccess) {
    return <AccessDenied />;
  }

  // Get company information
  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;
  const company = await getCompanyData(companyId);

  if (company.error) {
    return (
      <main className="container flex flex-col gap-2">
        <p className="text-xl font-semibold">Attendance Management</p>
        <ErrorFallbackCard error={company.error} />
      </main>
    );
  }

  return (
    <div>
      <AttendanceDashboardSidebar company={company.data} />

      <SidebarViewport>{children}</SidebarViewport>
    </div>
  );
}
