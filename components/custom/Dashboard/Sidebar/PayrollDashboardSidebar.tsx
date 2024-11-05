"use client";
import React, { useState } from "react";
import { Sidebar, SidebarContent, SidebarHeader, SidebarLink } from "./Sidebar";
import Icons from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { ICompany } from "@/schema/CompanySchema";
import MySidebarHeader from "./MySidebarHeader";
import { BackLinkButton } from "./BackLinkButton";

export default function PayrollDashboardSidebar({
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

        <SidebarLink href={`/dashboard/company/${company.company_id}/payroll`}>
          <Icons.home />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Payroll Management Dashboard
          </span>
        </SidebarLink>

        <SidebarLink
          href={`/dashboard/company/${company.company_id}/payroll/salary-struct`}
        >
          <Icons.list />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Salary Structure
          </span>
        </SidebarLink>

        <BackLinkButton />
      </SidebarContent>
    </Sidebar>
  );
}
