"use client";
import React, { useMemo, useState } from "react";
import { Sidebar, SidebarContent, SidebarLink } from "./Sidebar";
import Icons from "@/components/ui/icons";
import { ICompany } from "@/schema/CompanySchema";
import MySidebarHeader from "./MySidebarHeader";
import { BackLinkButton } from "./BackLinkButton";
import NavList from "./NavList";
import { INavAccordionItemProps } from "./NavAccordion";
import NavDrawer from "./NavDrawer";

export default function SponsorComplianceDashboardSidebar({
  company,
}: {
  company: ICompany;
}) {
  const [open, setOpen] = useState<boolean>(true);

  const sidebarItems = useMemo(
    (): INavAccordionItemProps[] => [
      {
        href: `/dashboard/company/${company.company_id}/sponsor-compliance`,
        title: "Sponsor Compliance",
        icon: <Icons.home />,
      },
      {
        href: `/dashboard/company/${company.company_id}/sponsor-compliance/organization`,
        title: "Organization Profile",
        icon: <Icons.company />,
      },
      {
        href: `/dashboard/company/${company.company_id}/employee/all`,
        title: "Employees",
        icon: <Icons.employees />,
        target: "_blank",
      },
      {
        href: `/dashboard/company/${company.company_id}/employee/migrant`,
        title: "Migrant Employees",
        icon: <Icons.employee />,
        target: "_blank",
      },
      {
        href: `/dashboard/company/${company.company_id}/sponsor-compliance/right-to-work`,
        title: "Right to Work Checks",
        icon: <Icons.lawBuilding />,
      },
      {
        href: `/dashboard/company/${company.company_id}/job`,
        title: "Recruitment Process",
        icon: <Icons.userSearch />,
        target: "_blank",
      },
      {
        href: `/dashboard/company/${company.company_id}/leave`,
        title: "Leave Management",
        icon: <Icons.leave />,
        target: "_blank",
      },
      {
        href: `/dashboard/company/${company.company_id}/payroll`,
        title: "Payroll",
        icon: <Icons.pay />,
        target: "_blank",
      },
      {
        href: `/dashboard/company/${company.company_id}/sponsor-compliance/sponsor-management-dossier`,
        title: "Sponsor Management Dossier",
        icon: <Icons.userRole />,
      },
      {
        href: `/dashboard/company/${company.company_id}/sponsor-compliance/monitoring`,
        title: "Monitoring and Reporting",
        icon: <Icons.visible />,
      },
      {
        href: `/dashboard/company/${company.company_id}/employee/staff-report`,
        title: "Staff Report",
        icon: <Icons.list />,
        target: "_blank",
      },
    ],
    [company.company_id]
  );

  return (
    <>
      <NavDrawer>
        <NavList items={sidebarItems} />
      </NavDrawer>
      <Sidebar open={open}>
        <SidebarContent>
          <MySidebarHeader
            open={open}
            onClick={() => setOpen((old) => !old)}
            company={company}
          />

          <NavList items={sidebarItems} />

          {/* <SidebarLink
          href={`/dashboard/company/${company.company_id}/sponsor-compliance/change-of-circumstances`}
        >
          <Icons.userCog />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Change of Circumstances
          </span>
        </SidebarLink>

        <SidebarLink
          href={`/dashboard/company/${company.company_id}/sponsor-compliance/change-of-circumstances`}
        >
          <Icons.handshake />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Contract Agreement
          </span>
        </SidebarLink> */}

          <BackLinkButton />

          <span className="h-10" />
        </SidebarContent>
      </Sidebar>
    </>
  );
}
