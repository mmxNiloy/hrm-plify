"use server";
import { LayoutProps } from "@/utils/Types";
import React from "react";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import SuperAdminSidebar from "@/components/custom/Dashboard/Sidebar/SuperAdminSidebar";
import { SidebarViewport } from "@/components/custom/Dashboard/Sidebar/Sidebar";
import { TPermission } from "@/schema/Permissions";
import AccessDenied from "@/components/custom/AccessDenied";

export default async function DashboardLayout({ children }: LayoutProps) {
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  const mCookies = await cookies();
  const mPermissions = JSON.parse(
    mCookies.get(process.env.NEXT_PUBLIC_COOKIE_USER_ACCESS_KEY!)?.value ?? "[]"
  ) as TPermission[];

  const readAccess = mPermissions.find((item) => item === "cmp_mgmt_read");

  if (!readAccess) {
    return <AccessDenied />;
  }

  return (
    <div>
      <SuperAdminSidebar permissions={mPermissions} user={user} />
      <SidebarViewport>{children}</SidebarViewport>
    </div>
  );
}
