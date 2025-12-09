"use server";
import React from "react";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import { TPermission } from "@/schema/Permissions";
import AppSidebar from "@/components/custom/Dashboard/Sidebar/app-sidebar";
import { INavItem } from "@/schema/SidebarSchema";

export default async function SidebarDefault() {
  const mCookies = await cookies();

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
    {
      href: "#",
      title: "Banking",
      icon: "lawBuilding",
      items: [
        {
          href: "/dashboard/bank",
          title: "Bank List",
          icon: "lawBuilding",
        },
        // {
        //   href: "/dashboard/bank-account",
        //   title: "Bank Account",
        //   icon: "userCog",
        // },
        {
          href: "/dashboard/billing",
          title: "Billing",
          icon: "bankNote",
        },
      ],
    },
  ] satisfies INavItem[];

  return <AppSidebar navItems={navItems} />;
}
