"use client";
import React, { useState } from "react";
import { Sidebar, SidebarContent, SidebarHeader, SidebarLink } from "./Sidebar";
import Icons from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { ICompany } from "@/schema/CompanySchema";

export default function UserAccessDashboardSidebar({
  company,
}: {
  company: ICompany;
}) {
  const [open, setOpen] = useState<boolean>(true);
  const [hovered, setHovered] = useState<boolean>(false);
  const path = usePathname();

  return (
    <Sidebar
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
      </SidebarContent>
    </Sidebar>
  );
}
