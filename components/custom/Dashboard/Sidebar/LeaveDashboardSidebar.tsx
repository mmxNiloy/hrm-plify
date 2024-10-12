"use client";
import React, { useState } from "react";
import { Sidebar, SidebarContent, SidebarHeader, SidebarLink } from "./Sidebar";
import Icons from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { ICompany } from "@/schema/CompanySchema";

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
      open={open || hovered}
      onMouseEnter={(e) => setHovered(true)}
      onMouseLeave={(e) => setHovered(false)}
    >
      <SidebarContent>
        <SidebarHeader
          onClick={(e) => setOpen(!open)}
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
      </SidebarContent>
    </Sidebar>
  );
}
