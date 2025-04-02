"use client";
import React, { useMemo, useState } from "react";
import { Sidebar, SidebarContent, SidebarHeader, SidebarLink } from "./Sidebar";
import Icons from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { ICompany } from "@/schema/CompanySchema";
import MySidebarHeader from "./MySidebarHeader";
import { BackLinkButton } from "./BackLinkButton";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { INavAccordionItemProps } from "./NavAccordion";
import NavList from "./NavList";
import NavDrawer from "./NavDrawer";

export default function EmployeeDashboardSidebar({
  company,
}: {
  company: ICompany;
}) {
  const [open, setOpen] = useState<boolean>(true);
  const pathname = usePathname();

  const sidebarItems = useMemo(
    (): INavAccordionItemProps[] => [
      {
        href: `/dashboard/company/${company.company_id}/employee`,
        title: "Employee Dashboard",
        icon: <Icons.home />,
      },
      {
        href: `/dashboard/company/${company.company_id}/employee/all`,
        title: "All Employees",
        icon: <Icons.employees />,
      },
      {
        href: `/dashboard/company/${company.company_id}/employee/migrant`,
        title: "Migrant Employees",
        icon: <Icons.users />,
      },
      {
        href: `/dashboard/company/${company.company_id}/employee/staff-report`,
        title: "Staff Report",
        icon: <Icons.files />,
      },
      {
        href: "#",
        title: "Edit Employee",
        icon: <Icons.userEdit />,
        hidden: !pathname.includes("edit"),
      },
    ],
    [company.company_id, pathname]
  );

  return (
    <>
      <NavDrawer
        backLink={
          pathname.includes("edit") ? pathname.split("edit")[0] : undefined
        }
      >
        <NavList items={sidebarItems} />
      </NavDrawer>
      <Sidebar open={open}>
        <SidebarContent>
          <MySidebarHeader
            open={open}
            onClick={() => setOpen((old) => !old)}
            company={company}
          />

          <NavList items={sidebarItems} />

          <BackLinkButton
            href={
              pathname.includes("edit") ? pathname.split("edit")[0] : undefined
            }
          />
        </SidebarContent>
      </Sidebar>
    </>
  );
}
