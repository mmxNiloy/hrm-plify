"use server";
import { LayoutProps } from "@/utils/Types";
import React from "react";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import SuperAdminSidebar from "@/components/custom/Dashboard/Sidebar/SuperAdminSidebar";
import { SidebarViewport } from "@/components/custom/Dashboard/Sidebar/Sidebar";
import { TPermission } from "@/schema/Permissions";

export default async function DashboardLayout({ children }: LayoutProps) {
  const mCookies = await cookies();
  const user = JSON.parse(
    mCookies.get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  const permissions = JSON.parse(
    mCookies.get(process.env.NEXT_PUBLIC_COOKIE_USER_ACCESS_KEY!)?.value ?? "[]"
  ) as TPermission[];

  return (
    <div>
      <SuperAdminSidebar user={user} permissions={permissions} />
      <SidebarViewport>{children}</SidebarViewport>
    </div>
  );
}
