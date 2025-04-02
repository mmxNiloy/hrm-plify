"use client";
import React, { useMemo, useState } from "react";
import { Sidebar, SidebarContent } from "./Sidebar";
import Icons from "@/components/ui/icons";
import { ICompany } from "@/schema/CompanySchema";
import MySidebarHeader from "./MySidebarHeader";
import { BackLinkButton } from "./BackLinkButton";
import { INavAccordionItemProps } from "./NavAccordion";
import NavDrawer from "./NavDrawer";
import NavList from "./NavList";

export default function RotaDashboardSidebar({
  company,
}: {
  company: ICompany;
}) {
  const [open, setOpen] = useState<boolean>(true);
  const sidebarItems = useMemo(
    (): INavAccordionItemProps[] => [
      {
        href: `/dashboard/company/${company.company_id}/rota`,
        title: "Shift Management",
        icon: <Icons.clock />,
      },
      {
        href: `/dashboard/company/${company.company_id}/rota/late-policy`,
        title: "Late Policy",
        icon: <Icons.late />,
      },
      {
        href: `/dashboard/company/${company.company_id}/rota/off-days`,
        title: "Off Days",
        icon: <Icons.calendarDays />,
      },
      {
        href: `/dashboard/company/${company.company_id}/rota/duty-roster`,
        title: "Duty Roster",
        icon: <Icons.calendarClock />,
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
