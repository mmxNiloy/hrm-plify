"use server";

import React from "react";
import AppSidebar from "@/components/custom/Dashboard/Sidebar/app-sidebar";
import { INavItem } from "@/schema/SidebarSchema";
import { CompanyIDURLParamSchema } from "@/schema/misc/URLParamSchema";

export default async function EmployeeAdministrativeDashboardSidebarSlot({
  params,
}: CompanyIDURLParamSchema) {
  // const [user, mParams] = await Promise.all([getCurrentUser(), params]);
  const mParams = await params;

  // const isAdmin =
  //   user?.user_roles?.roles?.role_name === "Super Admin" ||
  //   user?.user_roles?.roles?.role_name === "Admin";
  const id = mParams.companyId;

  const navItems = [
    {
      title: "Employee Management",
      icon: "users",
      href: "#",
      items: [
        {
          href: `/dashboard/company/${id}/employee`,
          title: "Dashboard",
          icon: "home",
        },
        {
          href: `/dashboard/company/${id}/employee/list`,
          title: "Employees",
          icon: "users",
        },
        {
          href: `/dashboard/company/${id}/employee/staff-report`,
          title: "Staff Report",
          icon: "files",
        },
        {
          href: `/dashboard/company/${id}/employee/change-of-circumstances`,
          title: "Change of Circumstances",
          icon: "history",
        },
      ],
    },
  ] satisfies INavItem[];
  return <AppSidebar navItems={navItems} companyId={id} />;
}
