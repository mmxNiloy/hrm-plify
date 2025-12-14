"use server";

import { CompanyIDURLParamSchema } from "@/schema/misc/URLParamSchema";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import SponsorComplianceDashboardSidebar from "@/components/custom/Dashboard/Sidebar/SponsorComplianceDashboardSidebar";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import { INavItem } from "@/schema/SidebarSchema";
import AppSidebar from "@/components/custom/Dashboard/Sidebar/app-sidebar";

export default async function SponsorCompliancePageSidebarSlot({
  params,
}: CompanyIDURLParamSchema) {
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  const mParams = await params;
  const companyId = mParams.companyId;

  const company = await getCompanyData(companyId);

  if (company.error) {
    return (
      <main className="container flex flex-col gap-2">
        <p className="text-xl font-semibold">Payroll</p>
        <ErrorFallbackCard error={company.error} />
      </main>
    );
  }

  const navItems: INavItem[] = [
    {
      href: `/dashboard/company/${companyId}/sponsor-compliance`,
      title: "Sponsor Compliance",
      icon: "home",
    },
    {
      href: `/dashboard/company/${companyId}/sponsor-compliance/organization`,
      title: "Organization Profile",
      icon: "company",
    },
    {
      href: `/dashboard/company/${companyId}/employee/all`,
      title: "Employees",
      icon: "employees",
      target: "_blank",
    },
    {
      href: `/dashboard/company/${companyId}/employee/migrant`,
      title: "Migrant Employees",
      icon: "employee",
      target: "_blank",
    },
    {
      href: `/dashboard/company/${companyId}/sponsor-compliance/right-to-work`,
      title: "Right to Work Checks",
      icon: "lawBuilding",
    },
    {
      href: `/dashboard/company/${companyId}/job`,
      title: "Recruitment Process",
      icon: "userSearch",
      target: "_blank",
    },
    {
      href: `/dashboard/company/${companyId}/leave`,
      title: "Leave Management",
      icon: "leave",
      target: "_blank",
    },
    {
      href: `/dashboard/company/${companyId}/payroll`,
      title: "Payroll",
      icon: "pay",
      target: "_blank",
    },
    {
      href: `/dashboard/company/${companyId}/sponsor-compliance/sponsor-management-dossier`,
      title: "Sponsor Mgmt. Dossier",
      icon: "userRole",
    },
    {
      href: `/dashboard/company/${companyId}/sponsor-compliance/monitoring`,
      title: "Monitoring and Reporting",
      icon: "visible",
    },
    {
      href: `/dashboard/company/${companyId}/employee/staff-report`,
      title: "Staff Report",
      icon: "list",
      target: "_blank",
    },
  ];

  return <AppSidebar navItems={navItems} companyId={companyId} />;
}
