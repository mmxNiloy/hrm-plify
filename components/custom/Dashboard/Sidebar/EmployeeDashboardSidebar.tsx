"use client";
import React, { useState } from "react";
import { Sidebar, SidebarContent, SidebarHeader, SidebarLink } from "./Sidebar";
import Icons from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { ICompany } from "@/schema/CompanySchema";
import MySidebarHeader from "./MySidebarHeader";
import { BackLinkButton } from "./BackLinkButton";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function EmployeeDashboardSidebar({
  company,
}: {
  company: ICompany;
}) {
  const [open, setOpen] = useState<boolean>(true);
  const pathname = usePathname();

  return (
    <Sidebar
      open={
        open
        //  || hovered
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

        <SidebarLink href={`/dashboard/company/${company.company_id}/employee`}>
          <Icons.employees />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            All Employees
          </span>
        </SidebarLink>

        <SidebarLink
          href={`/dashboard/company/${company.company_id}/employee/migrant`}
        >
          <Icons.users />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Migrant Employees
          </span>
        </SidebarLink>

        <SidebarLink
          href={`/dashboard/company/${company.company_id}/employee/staff-report`}
        >
          <Icons.files />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Staff Report
          </span>
        </SidebarLink>

        {pathname.includes("edit") && (
          <Button
            variant={"ghost"}
            className={
              "w-full gap-4 hover:underline justify-center transition-all group-data-[state=open]/sidebar:justify-start bg-blue-500 hover:bg-blue-400 text-white hover:text-white"
            }
          >
            <Icons.userEdit />
            <span className="transition-all group-data-[state=closed]/sidebar:hidden">
              Edit Employee
            </span>
          </Button>
        )}

        {/* <SidebarLink
          href={`/dashboard/company/${company.company_id}/employee/change-of-circumstances`}
        >
          <Icons.files />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Change of Circumstances
          </span>
        </SidebarLink>
        <SidebarLink
          href={`/dashboard/company/${company.company_id}/employee/contract-agreement`}
        >
          <Icons.handshake />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Contract Agreement
          </span>
        </SidebarLink> */}

        <BackLinkButton />
      </SidebarContent>
    </Sidebar>
  );
}
