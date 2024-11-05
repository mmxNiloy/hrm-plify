"use client";
import React, { useState } from "react";
import { Sidebar, SidebarContent, SidebarHeader, SidebarLink } from "./Sidebar";
import Icons from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { ICompany } from "@/schema/CompanySchema";
import MySidebarHeader from "./MySidebarHeader";
import { BackLinkButton } from "./BackLinkButton";

export default function LeaveDashboardSidebar({
  company,
}: {
  company: ICompany;
}) {
  const [open, setOpen] = useState<boolean>(true);
  const [hovered, setHovered] = useState<boolean>(false);

  return (
    <Sidebar
      className="overflow-auto"
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

        <SidebarLink href={`/dashboard/company/${company.company_id}/leave`}>
          <Icons.home />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Leave Management Dashboard
          </span>
        </SidebarLink>

        <SidebarLink
          href={`/dashboard/company/${company.company_id}/leave/request`}
        >
          <Icons.todo />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Leave Requests
          </span>
        </SidebarLink>

        <SidebarLink
          href={`/dashboard/company/${company.company_id}/leave/type`}
        >
          <Icons.category />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Leave Type
          </span>
        </SidebarLink>

        <SidebarLink
          href={`/dashboard/company/${company.company_id}/leave/approver`}
        >
          <Icons.userCheck />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Leave Approvers
          </span>
        </SidebarLink>

        <SidebarLink
          href={`/dashboard/company/${company.company_id}/leave/rules`}
        >
          <Icons.lawBuilding />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Leave Rules
          </span>
        </SidebarLink>

        <SidebarLink
          href={`/dashboard/company/${company.company_id}/leave/allocation`}
        >
          <Icons.distribution />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Leave Allocation
          </span>
        </SidebarLink>

        <SidebarLink
          href={`/dashboard/company/${company.company_id}/leave/balance`}
        >
          <Icons.scale />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Leave Balance
          </span>
        </SidebarLink>

        <SidebarLink
          href={`/dashboard/company/${company.company_id}/leave/report`}
        >
          <Icons.note />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Leave Report
          </span>
        </SidebarLink>

        <BackLinkButton />
      </SidebarContent>
    </Sidebar>
  );
}
