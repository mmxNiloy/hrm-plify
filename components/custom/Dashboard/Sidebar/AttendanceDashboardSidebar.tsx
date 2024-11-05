"use client";
import React, { useState } from "react";
import { Sidebar, SidebarContent, SidebarHeader, SidebarLink } from "./Sidebar";
import Icons from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { ICompany } from "@/schema/CompanySchema";
import MySidebarHeader from "./MySidebarHeader";
import { BackLinkButton } from "./BackLinkButton";

export default function AttendanceDashboardSidebar({
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
          href={`/dashboard/company/${company.company_id}/attendance`}
        >
          <Icons.note />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Attendance Report
          </span>
        </SidebarLink>

        <SidebarLink
          href={`/dashboard/company/${company.company_id}/attendance/stats`}
        >
          <Icons.chart />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Attendance Statistics
          </span>
        </SidebarLink>

        <SidebarLink
          href={`/dashboard/company/${company.company_id}/attendance/absent-report`}
        >
          <Icons.userX />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Absent Report
          </span>
        </SidebarLink>

        <SidebarLink
          href={`/dashboard/company/${company.company_id}/attendance/generate`}
        >
          <Icons.fileCog />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Generate Attendance
          </span>
        </SidebarLink>

        <BackLinkButton />
      </SidebarContent>
    </Sidebar>
  );
}
