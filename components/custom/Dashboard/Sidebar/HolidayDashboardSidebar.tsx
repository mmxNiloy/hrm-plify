"use client";
import React, { useMemo, useState } from "react";
import { Sidebar, SidebarContent, SidebarHeader, SidebarLink } from "./Sidebar";
import Icons from "@/components/ui/icons";
import { ICompany } from "@/schema/CompanySchema";
import MySidebarHeader from "./MySidebarHeader";
import { BackLinkButton } from "./BackLinkButton";
import NavDrawer from "./NavDrawer";
import { INavAccordionItemProps } from "./NavAccordion";
import NavList from "./NavList";

export default function HolidayDashboardSidebar({
  company,
}: {
  company: ICompany;
}) {
  const [open, setOpen] = useState<boolean>(true);
  const sidebarItems = useMemo(
    (): INavAccordionItemProps[] => [
      {
        href: `/dashboard/company/${company.company_id}/holiday`,
        title: "Holiday Management",
        icon: <Icons.home />,
      },
      {
        href: `/dashboard/company/${company.company_id}/holiday/type`,
        title: "Holiday Type",
        icon: <Icons.calendarAlert />,
      },
      {
        href: `/dashboard/company/${company.company_id}/holiday/all`,
        title: "Holiday List",
        icon: <Icons.calendarDays />,
      },
    ],
    [company.company_id]
  );

  return (
    <>
      <NavDrawer>
        <NavList items={sidebarItems} />
      </NavDrawer>
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

          <NavList items={sidebarItems} />

          <BackLinkButton />
        </SidebarContent>
      </Sidebar>
    </>
  );
}
