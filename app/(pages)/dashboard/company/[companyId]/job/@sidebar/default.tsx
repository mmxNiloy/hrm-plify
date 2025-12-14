"use server";

import { CompanyIDURLParamSchema } from "@/schema/misc/URLParamSchema";
import { INavItem } from "@/schema/SidebarSchema";
import AppSidebar from "@/components/custom/Dashboard/Sidebar/app-sidebar";

export default async function JobPageSidebarSlot({
  params,
}: CompanyIDURLParamSchema) {
  // Get company information
  const mParams = await params;
  const companyId = mParams.companyId;

  const navItems: INavItem[] = [
    {
      href: `/dashboard/company/${companyId}/job`,
      title: "Job & Recruitment",
      icon: "briefcase",
    },
    {
      href: `/dashboard/company/${companyId}/job/all`,
      title: "Job Listings",
      icon: "list",
    },
    {
      href: `/dashboard/company/${companyId}/job/applied`,
      title: "Job Applications",
      icon: "usersCheck",
    },
    {
      href: `/dashboard/company/${companyId}/job/short-listing`,
      title: "Shortlisted Applicants",
      icon: "userSearch",
    },
    {
      href: `/dashboard/company/${companyId}/job/hired`,
      title: "Hired",
      icon: "handshake",
    },
    {
      href: `/dashboard/company/${companyId}/job/rejected`,
      title: "Rejected",
      icon: "userX",
    },
  ];

  return <AppSidebar companyId={companyId} navItems={navItems} />;
}
