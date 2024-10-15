"use client";
import React, { useState } from "react";
import { Sidebar, SidebarContent, SidebarHeader, SidebarLink } from "./Sidebar";
import Icons from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { ICompany } from "@/schema/CompanySchema";

export default function EmployeeHomeSidebar({
  company,
}: {
  company: ICompany;
}) {
  const [open, setOpen] = useState<boolean>(true);
  const [hovered, setHovered] = useState<boolean>(false);

  return (
    <Sidebar
      open={open || hovered}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <SidebarContent>
        <SidebarHeader
          onClick={() => setOpen(!open)}
          title={company.company_name}
          className={
            "bg-accent space-y-0 cursor-pointer flex flex-row gap-2 items-center justify-center rounded-md mb-4"
          }
        >
          <p
            className={cn(
              "flex-grow font-semibold line-clamp-1 text-ellipsis max-w-44 2xl:max-w-80",
              open || hovered ? "" : "hidden"
            )}
          >
            {company.company_name}
          </p>
          <span className="size-10 flex relative rounded-full items-center justify-center">
            <Icons.chevronLeft
              className={cn(
                "absolute transition-all",
                open ? "rotate-0 scale-100" : "rotate-180 scale-0"
              )}
            />
            <Icons.chevronRight
              className={cn(
                "transition-all",
                open ? "rotate-180 scale-0" : "rotate-0 scale-100"
              )}
            />
          </span>
        </SidebarHeader>

        <SidebarLink
          href={`/dashboard/company/${company.company_id}/employee/home`}
        >
          <Icons.home />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Home
          </span>
        </SidebarLink>

        <SidebarLink
          href={`/dashboard/company/${company.company_id}/employee/attendance`}
        >
          <Icons.todo />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Attendance Management
          </span>
        </SidebarLink>

        <SidebarLink
          href={`/dashboard/company/${company.company_id}/employee/leave`}
        >
          <Icons.logout />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Leave Management
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

        <SidebarLink
          href={`/dashboard/company/${company.company_id}/employee/change-of-circumstances`}
        >
          <Icons.userCog />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Change of Circumstances
          </span>
        </SidebarLink>
      </SidebarContent>
    </Sidebar>
  );
}
