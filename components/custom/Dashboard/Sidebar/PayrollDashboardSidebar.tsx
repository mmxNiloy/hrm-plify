"use client";
import React, { useMemo, useState } from "react";
import { Sidebar, SidebarContent, SidebarHeader, SidebarLink } from "./Sidebar";
import Icons from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { ICompany } from "@/schema/CompanySchema";
import MySidebarHeader from "./MySidebarHeader";
import { BackLinkButton } from "./BackLinkButton";
import NavDrawer from "./NavDrawer";
import { INavAccordionItemProps } from "./NavAccordion";
import NavList from "./NavList";

export default function PayrollDashboardSidebar({
  company,
}: {
  company: ICompany;
}) {
  const [open, setOpen] = useState<boolean>(true);

  const sidebarItems = useMemo(
    (): INavAccordionItemProps[] => [
      {
        href: `/dashboard/company/${company.company_id}/payroll`,
        title: "Payroll Management Dashboard",
        icon: <Icons.home />,
      },
      {
        href: `/dashboard/company/${company.company_id}/payroll/salary-struct`,
        title: "Salary Structure",
        icon: <Icons.list />,
      },
    ],
    [company.company_id]
  );

  return (
    <>
      <NavDrawer>
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

          <BackLinkButton />
        </SidebarContent>
      </Sidebar>
    </>
  );
}
