"use client";
import React, { useState } from "react";
import { Sidebar, SidebarContent, SidebarHeader, SidebarLink } from "./Sidebar";
import Icons from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { ICompany } from "@/schema/CompanySchema";
import MySidebarHeader from "./MySidebarHeader";
import { BackLinkButton } from "./BackLinkButton";

export default function UserAccessDashboardSidebar({
  company,
}: {
  company: ICompany;
}) {
  const [open, setOpen] = useState<boolean>(true);
  // const [hovered, setHovered] = useState<boolean>(false);

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
          onClick={() => setOpen((old) => !old)}
          open={open}
          company={company}
        />

        <SidebarLink
          href={`/dashboard/company/${company.company_id}/user-access`}
        >
          <Icons.home />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            User Access
          </span>
        </SidebarLink>

        <SidebarLink
          href={`/dashboard/company/${company.company_id}/user-access/user-config`}
        >
          <Icons.userCog />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            User Configuration
          </span>
        </SidebarLink>

        <SidebarLink
          href={`/dashboard/company/${company.company_id}/user-access/role`}
        >
          <Icons.userRole />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Role Management
          </span>
        </SidebarLink>

        <BackLinkButton />
      </SidebarContent>
    </Sidebar>
  );
}
