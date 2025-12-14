"use server";

import { CompanyIDURLParamSchema } from "@/schema/misc/URLParamSchema";
import { INavItem } from "@/schema/SidebarSchema";
import AppSidebar from "@/components/custom/Dashboard/Sidebar/app-sidebar";

export default async function HolidayDashboardPageSidebarSlot({
  params,
}: CompanyIDURLParamSchema) {
  const mParams = await params;
  const companyId = mParams.companyId;

  const navItems: INavItem[] = [
    {
      href: `/dashboard/company/${companyId}/holiday`,
      title: "Holiday Management",
      icon: "home",
    },
    {
      href: `/dashboard/company/${companyId}/holiday/type`,
      title: "Holiday Type",
      icon: "calendarAlert",
    },
    {
      href: `/dashboard/company/${companyId}/holiday/all`,
      title: "Holiday List",
      icon: "calendarDays",
    },
  ];

  return <AppSidebar navItems={navItems} companyId={companyId} />;
}
