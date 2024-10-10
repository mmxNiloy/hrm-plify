"use server";
import { LayoutProps } from "@/utils/Types";
import React from "react";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import SuperAdminSidebar from "@/app/Components/Dashboard/Sidebar/SuperAdminSidebar";
import { SidebarViewport } from "@/app/Components/Dashboard/Sidebar/Sidebar";

export default async function DashboardLayout({ children }: LayoutProps) {
  const user = JSON.parse(
    cookies().get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  return (
    <div>
      <SuperAdminSidebar user={user} />
      <SidebarViewport>{children}</SidebarViewport>
    </div>
  );
}
