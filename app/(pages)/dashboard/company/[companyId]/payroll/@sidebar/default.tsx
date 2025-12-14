"use server";
import { CompanyIDURLParamSchema } from "@/schema/misc/URLParamSchema";
import { INavItem } from "@/schema/SidebarSchema";
import AppSidebar from "@/components/custom/Dashboard/Sidebar/app-sidebar";

export default async function PayrollPageSidebarSlot({
  params,
}: CompanyIDURLParamSchema) {
  const mParams = await params;
  const companyId = mParams.companyId;

  const navItems: INavItem[] = [
    {
      href: `/dashboard/company/${companyId}/payroll`,
      title: "Payroll Mgmt. Dashboard",
      icon: "home",
    },
    {
      href: `/dashboard/company/${companyId}/payroll/salary-struct`,
      title: "Salary Structure",
      icon: "list",
    },
  ];

  return <AppSidebar navItems={navItems} companyId={companyId} />;
}
