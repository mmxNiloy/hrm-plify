"use client";
import React, { useState } from "react";
import { Sidebar, SidebarContent, SidebarHeader, SidebarLink } from "./Sidebar";
import Icons from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { ICompany } from "@/schema/CompanySchema";
import MySidebarHeader from "./MySidebarHeader";
import { BackLinkButton } from "./BackLinkButton";

export default function EmployeeDashboardSidebar({
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
        //  || hovered
      }
      // onMouseEnter={(e) => setHovered(true)}
      // onMouseLeave={(e) => setHovered(false)}
    >
      <SidebarContent>
        <MySidebarHeader
          open={open}
          onClick={() => setOpen((old) => !old)}
          company={company}
        />

        <SidebarLink href={`/dashboard/company/${company.company_id}/employee`}>
          <Icons.home />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Employee Dashboard
          </span>
        </SidebarLink>

        <SidebarLink
          href={`/dashboard/company/${company.company_id}/employee/all`}
        >
          <Icons.employees />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            All Employees
          </span>
        </SidebarLink>

        <SidebarLink
          href={`/dashboard/company/${company.company_id}/employee/migrant`}
        >
          <Icons.users />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Migrant Employees
          </span>
        </SidebarLink>
        {/* <SidebarLink
          href={`/dashboard/company/${company.company_id}/employee/change-of-circumstances`}
        >
          <Icons.files />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Change of Circumstances
          </span>
        </SidebarLink>
        <SidebarLink
          href={`/dashboard/company/${company.company_id}/employee/contract-agreement`}
        >
          <Icons.handshake />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Contract Agreement
          </span>
        </SidebarLink> */}

        <BackLinkButton />
      </SidebarContent>
    </Sidebar>
  );
}
