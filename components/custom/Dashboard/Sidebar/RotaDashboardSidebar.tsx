"use client";
import React, { useState } from "react";
import { Sidebar, SidebarContent, SidebarHeader, SidebarLink } from "./Sidebar";
import Icons from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { ICompany } from "@/schema/CompanySchema";
import MySidebarHeader from "./MySidebarHeader";
import { BackLinkButton } from "./BackLinkButton";

export default function RotaDashboardSidebar({
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
      // onMouseEnter={(e) => setHovered(true)}
      // onMouseLeave={(e) => setHovered(false)}
    >
      <SidebarContent>
        <MySidebarHeader
          open={open}
          onClick={() => setOpen((old) => !old)}
          company={company}
        />

        {/* <SidebarLink href={`/dashboard/company/${company.company_id}/rota`}>
          <Icons.home />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Rota
          </span>
        </SidebarLink> */}

        <SidebarLink href={`/dashboard/company/${company.company_id}/rota`}>
          <Icons.clock />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Shift Management
          </span>
        </SidebarLink>

        {/* <SidebarLink
          href={`/dashboard/company/${company.company_id}/rota/late-policy`}
        >
          <Icons.late />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Late Policy
          </span>
        </SidebarLink> */}
        <SidebarLink
          href={`/dashboard/company/${company.company_id}/rota/off-days`}
        >
          <Icons.calendarDays />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Off Days
          </span>
        </SidebarLink>
        <SidebarLink
          href={`/dashboard/company/${company.company_id}/rota/duty-roster`}
        >
          <Icons.calendarClock />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Duty Roster
          </span>
        </SidebarLink>

        <BackLinkButton />
      </SidebarContent>
    </Sidebar>
  );
}
