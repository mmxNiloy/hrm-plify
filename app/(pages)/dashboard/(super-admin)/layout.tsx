"use server";
import { LayoutProps } from "@/utils/Types";
import React from "react";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import SuperAdminSidebar from "@/components/custom/Dashboard/Sidebar/SuperAdminSidebar";
import { SidebarViewport } from "@/components/custom/Dashboard/Sidebar/Sidebar";
import { TPermission } from "@/schema/Permissions";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/custom/Dashboard/Sidebar/app-sidebar";
import DashboardNavbar from "@/components/custom/Dashboard/Navbar/DashboardNavbar";
import Icons from "@/components/ui/icons";
import { INavItem } from "@/schema/SidebarSchema";

export default async function SuperAdminDashboardLayout({
  children,
}: LayoutProps) {
  const mCookies = await cookies();
  const user = JSON.parse(
    mCookies.get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  const permissions = JSON.parse(
    mCookies.get(process.env.NEXT_PUBLIC_COOKIE_USER_ACCESS_KEY!)?.value ?? "[]"
  ) as TPermission[];

  const navItems = [
    {
      href: "/dashboard",
      title: "Dashboard",
      icon: "home",
    },
    {
      href: "/dashboard/profile",
      title: "My Profile",
      icon: "user",
    },
    {
      href: "/dashboard/company",
      title: "Companies",
      icon: "company",
    },
    {
      href: "/dashboard/user",
      title: "Users",
      icon: "users",
      hidden: !permissions.find((item) => item === "sys_user_read"),
    },
    {
      href: "/dashboard/employment-type",
      title: "Employment Type",
      icon: "list",
    },
    {
      href: "/dashboard/notification",
      title: "Notifications",
      icon: "bell",
    },
    {
      href: "#",
      title: "Analytics",
      icon: "analytics",
    },
  ] satisfies INavItem[];

  const navGroups: INavItem[] = [
    {
      title: "Menu",
      href: "#",
      items: navItems,
    },
  ];

  return (
    <SidebarProvider>
      <AppSidebar navItems={navItems} />

      <main className="w-screen">
        <DashboardNavbar />
        <SidebarViewport>{children}</SidebarViewport>
      </main>
    </SidebarProvider>
  );
}
