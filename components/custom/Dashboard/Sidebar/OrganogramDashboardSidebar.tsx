"use client";
import React, { useMemo, useState } from "react";
import { Sidebar, SidebarContent } from "./Sidebar";
import Icons from "@/components/ui/icons";
import { ICompany } from "@/schema/CompanySchema";
import MySidebarHeader from "./MySidebarHeader";
import { BackLinkButton } from "./BackLinkButton";
import NavList from "./NavList";
import NavDrawer from "./NavDrawer";
import { INavAccordionItemProps } from "./NavAccordion";

export default function OrganogramDashboardSidebar({
  company,
}: {
  company: ICompany;
}) {
  const [open, setOpen] = useState<boolean>(true);
  const sidebarItems = useMemo(
    (): INavAccordionItemProps[] => [
      {
        href: `/dashboard/company/${company.company_id}/organogram`,
        title: "Organogram Chart",
        icon: <Icons.home />,
      },
      {
        href: `/dashboard/company/${company.company_id}/organogram/level`,
        title: "Levels",
        icon: <Icons.steps />,
      },
      {
        href: `/dashboard/company/${company.company_id}/organogram/heirarchy`,
        title: "Heirarchy",
        icon: <Icons.heirarchy />,
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
