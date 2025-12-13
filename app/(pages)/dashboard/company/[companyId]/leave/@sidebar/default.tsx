"use server";

import { CompanyIDURLParamSchema } from "@/schema/misc/URLParamSchema";
import { INavItem } from "@/schema/SidebarSchema";
import AppSidebar from "@/components/custom/Dashboard/Sidebar/app-sidebar";

export default async function LeavePageSidebarSlot({
  params,
}: CompanyIDURLParamSchema) {
  const mParams = await params;
  const companyId = mParams.companyId;

  const navItems: INavItem[] = [
    {
      href: `/dashboard/company/${companyId}/leave`,
      title: "Leave Mgmt. Dashboard",
      icon: "leave",
    },
    {
      href: `/dashboard/company/${companyId}/leave/request`,
      title: "Leave Requests",
      icon: "todo",
    },
    {
      href: `/dashboard/company/${companyId}/leave/type`,
      title: "Leave Type",
      icon: "category",
    },
    {
      href: `/dashboard/company/${companyId}/leave/approver`,
      title: "Leave Approvers",
      icon: "userCheck",
    },
  ];

  return <AppSidebar navItems={navItems} companyId={companyId} />;
}
