"use server";

import { CompanyIDURLParamSchema } from "@/schema/misc/URLParamSchema";
import { INavItem } from "@/schema/SidebarSchema";
import AppSidebar from "@/components/custom/Dashboard/Sidebar/app-sidebar";

export default async function RotaPageSidebarSlot({
  params,
}: CompanyIDURLParamSchema) {
  const mParams = await params;
  const companyId = mParams.companyId;

  const navItems: INavItem[] = [
    {
      href: `/dashboard/company/${companyId}/rota`,
      title: "Shift Management",
      icon: "clock",
    },
    {
      href: `/dashboard/company/${companyId}/rota/late-policy`,
      title: "Late Policy",
      icon: "late",
    },
    {
      href: `/dashboard/company/${companyId}/rota/off-days`,
      title: "Off Days",
      icon: "calendarDays",
    },
    {
      href: `/dashboard/company/${companyId}/rota/duty-roster`,
      title: "Duty Roster",
      icon: "calendarClock",
    },
  ];

  return <AppSidebar navItems={navItems} companyId={companyId} />;
}
