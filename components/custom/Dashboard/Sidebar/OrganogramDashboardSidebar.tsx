"use client";
import React, { useState } from "react";
import { Sidebar, SidebarContent, SidebarHeader, SidebarLink } from "./Sidebar";
import Icons from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { ICompany } from "@/schema/CompanySchema";
import MySidebarHeader from "./MySidebarHeader";
import { BackLinkButton } from "./BackLinkButton";

export default function OrganogramDashboardSidebar({
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

        <SidebarLink
          href={`/dashboard/company/${company.company_id}/organogram`}
        >
          <Icons.home />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Organogram Chart
          </span>
        </SidebarLink>

        <SidebarLink
          href={`/dashboard/company/${company.company_id}/organogram/level`}
        >
          <Icons.steps />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Levels
          </span>
        </SidebarLink>

        <SidebarLink
          href={`/dashboard/company/${company.company_id}/organogram/heirarchy`}
        >
          <Icons.heirarchy />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Heirarchy
          </span>
        </SidebarLink>

        <BackLinkButton />
      </SidebarContent>
    </Sidebar>
  );
}
