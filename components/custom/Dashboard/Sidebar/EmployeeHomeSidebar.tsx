"use client";
import React, { useState } from "react";
import { Sidebar, SidebarContent, SidebarHeader, SidebarLink } from "./Sidebar";
import Icons from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { ICompany } from "@/schema/CompanySchema";
import MySidebarHeader from "./MySidebarHeader";
import { BackLinkButton } from "./BackLinkButton";

export default function EmployeeHomeSidebar({
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
      // onMouseEnter={() => setHovered(true)}
      // onMouseLeave={() => setHovered(false)}
    >
      <SidebarContent>
        <MySidebarHeader
          open={open}
          onClick={() => setOpen((old) => !old)}
          company={company}
        />

        <SidebarLink
          href={`/dashboard/company/${company.company_id}/employee/home`}
        >
          <Icons.home />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Home
          </span>
        </SidebarLink>
        <SidebarLink
          href={`/dashboard/company/${company.company_id}/employee/profile`}
        >
          <Icons.profile />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Profile
          </span>
        </SidebarLink>

        <SidebarLink
          href={`/dashboard/company/${company.company_id}/employee/attendance`}
        >
          <Icons.todo />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Attendance Report
          </span>
        </SidebarLink>

        <SidebarLink
          href={`/dashboard/company/${company.company_id}/employee/leave`}
        >
          <Icons.logout />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Leave Requests
          </span>
        </SidebarLink>

        <SidebarLink
          href={`/dashboard/company/${company.company_id}/employee/holiday`}
        >
          <Icons.calendarDays />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Holidays
          </span>
        </SidebarLink>

        {/* <SidebarLink
          href={`/dashboard/company/${company.company_id}/employee/my-change-of-circumstances`}
        >
          <Icons.userCog />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Change of Circumstances
          </span>
        </SidebarLink> */}

        <BackLinkButton />
      </SidebarContent>
    </Sidebar>
  );
}
