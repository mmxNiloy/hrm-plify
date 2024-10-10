"use server";
import { LayoutProps } from "@/utils/Types";
import React from "react";
import DashboardNavbar from "../../Components/Dashboard/Navbar/DashboardNavbar";
import { SidebarViewport } from "../../Components/Dashboard/Sidebar/Sidebar";
import SuperAdminSidebar from "../../Components/Dashboard/Sidebar/SuperAdminSidebar";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";

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
