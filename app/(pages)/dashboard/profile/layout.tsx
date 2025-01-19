"use server";
import { LayoutProps } from "@/utils/Types";
import React from "react";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import SuperAdminSidebar from "@/components/custom/Dashboard/Sidebar/SuperAdminSidebar";
import { SidebarViewport } from "@/components/custom/Dashboard/Sidebar/Sidebar";
import CompanyDashboardSidebar from "@/components/custom/Dashboard/Sidebar/CompanyDashboardSidebar";
import EmployeeHomeSidebar from "@/components/custom/Dashboard/Sidebar/EmployeeHomeSidebar";
import { notFound } from "next/navigation";
import { TPermission } from "@/schema/Permissions";

export default async function ProfileLayout({ children }: LayoutProps) {
  const mCookies = await cookies();
  const permissions = JSON.parse(
    mCookies.get(process.env.NEXT_PUBLIC_COOKIE_USER_ACCESS_KEY!)?.value ?? "[]"
  ) as TPermission[];

  const user = JSON.parse(
    mCookies.get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  if (
    user.user_roles?.roles.role_name === "Admin" ||
    user.user_roles?.roles.role_name === "Super Admin"
  ) {
    return (
      <div>
        <SuperAdminSidebar permissions={permissions} user={user} />
        <SidebarViewport>{children}</SidebarViewport>
      </div>
    );
  } else if (user.user_roles?.roles.role_name === "Company Admin") {
    return (
      <div>
        <CompanyDashboardSidebar
          user={user}
          company={user.usercompany?.companies!}
        />
        <SidebarViewport>{children}</SidebarViewport>
      </div>
    );
  } else if (user.user_roles?.roles.role_name === "Employee") {
    return (
      <div>
        <EmployeeHomeSidebar company={user.usercompany?.companies!} />
        <SidebarViewport>{children}</SidebarViewport>
      </div>
    );
  } else {
    return <>{children}</>;
  }
}
