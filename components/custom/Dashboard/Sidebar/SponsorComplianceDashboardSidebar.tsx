"use client";
import React, { useState } from "react";
import { Sidebar, SidebarContent, SidebarHeader, SidebarLink } from "./Sidebar";
import Icons from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { ICompany } from "@/schema/CompanySchema";
import MySidebarHeader from "./MySidebarHeader";
import { BackLinkButton } from "./BackLinkButton";

export default function SponsorComplianceDashboardSidebar({
  company,
}: {
  company: ICompany;
}) {
  const [open, setOpen] = useState<boolean>(true);
  const [hovered, setHovered] = useState<boolean>(false);

  return (
    <Sidebar
      open={
        open
        // || hovered
      }
      //   onMouseEnter={(e) => setHovered(true)}
      //   onMouseLeave={(e) => setHovered(false)}
      className="overflow-y-scroll"
    >
      <SidebarContent>
        <MySidebarHeader
          open={open}
          onClick={() => setOpen((old) => !old)}
          company={company}
        />

        <SidebarLink
          href={`/dashboard/company/${company.company_id}/sponsor-compliance`}
        >
          <Icons.home />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Sponsor Compliance
          </span>
        </SidebarLink>

        <SidebarLink
          href={`/dashboard/company/${company.company_id}/sponsor-compliance/organization`}
        >
          <Icons.company />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Organization Profile
          </span>
        </SidebarLink>

        <SidebarLink
          href={`/dashboard/company/${company.company_id}/sponsor-compliance/employees`}
        >
          <Icons.employees />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Employees
          </span>
        </SidebarLink>

        <SidebarLink
          href={`/dashboard/company/${company.company_id}/sponsor-compliance/employees/migrant`}
        >
          <Icons.employee />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Migrant Employees
          </span>
        </SidebarLink>

        <SidebarLink
          href={`/dashboard/company/${company.company_id}/sponsor-compliance/right-to-work`}
        >
          <Icons.lawBuilding />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Right to Work Checks
          </span>
        </SidebarLink>

        <SidebarLink
          href={`/dashboard/company/${company.company_id}/sponsor-compliance/recruitment`}
        >
          <Icons.userSearch />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Recruitment Process
          </span>
        </SidebarLink>

        <SidebarLink href={`/dashboard/company/${company.company_id}/leave`}>
          <Icons.leave />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Leave Management
          </span>
        </SidebarLink>

        <SidebarLink href={`/dashboard/company/${company.company_id}/payroll`}>
          <Icons.pay />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Payroll
          </span>
        </SidebarLink>

        {/* <SidebarLink
          href={`/dashboard/company/${company.company_id}/sponsor-compliance/key-contact`}
        >
          <Icons.userKey />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Key Contact
          </span>
        </SidebarLink> */}

        <SidebarLink
          href={`/dashboard/company/${company.company_id}/sponsor-compliance/sponsor-management-dossier`}
        >
          <Icons.userRole />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Sponsor Management Dossier
          </span>
        </SidebarLink>

        <SidebarLink
          href={`/dashboard/company/${company.company_id}/sponsor-compliance/monitoring`}
        >
          <Icons.visible />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Monitoring and Reporting
          </span>
        </SidebarLink>

        <SidebarLink
          href={`/dashboard/company/${company.company_id}/sponsor-compliance/message-center`}
        >
          <Icons.chat />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Message Center
          </span>
        </SidebarLink>

        <SidebarLink
          href={`/dashboard/company/${company.company_id}/sponsor-compliance/staff-report`}
        >
          <Icons.list />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Staff Report
          </span>
        </SidebarLink>

        <SidebarLink
          href={`/dashboard/company/${company.company_id}/attendance/absent-report`}
        >
          <Icons.todo />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Absent Report
          </span>
        </SidebarLink>

        <SidebarLink
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
        </SidebarLink>

        <BackLinkButton />

        <span className="h-10" />
      </SidebarContent>
    </Sidebar>
  );
}
