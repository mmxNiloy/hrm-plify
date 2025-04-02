"use client";
import React, { useMemo, useState } from "react";
import { Sidebar, SidebarContent, SidebarHeader, SidebarLink } from "./Sidebar";
import Icons from "@/components/ui/icons";
import { ICompany } from "@/schema/CompanySchema";
import MySidebarHeader from "./MySidebarHeader";
import { BackLinkButton } from "./BackLinkButton";
import { INavAccordionItemProps } from "./NavAccordion";
import NavDrawer from "./NavDrawer";
import NavList from "./NavList";

export default function EmployeeHomeSidebar({
  company,
}: {
  company: ICompany;
}) {
  const [open, setOpen] = useState<boolean>(true);

  const sidebarItems = useMemo(
    (): INavAccordionItemProps[] => [
      {
        href: `/dashboard/company/${company.company_id}/employee/home`,
        title: "Home",
        icon: <Icons.home />,
      },
      {
        href: `/dashboard/company/${company.company_id}/employee/profile`,
        title: "Profile",
        icon: <Icons.profile />,
      },
      {
        href: `/dashboard/company/${company.company_id}/employee/attendance`,
        title: "Attendance Report",
        icon: <Icons.todo />,
      },
      {
        href: `/dashboard/company/${company.company_id}/employee/leave`,
        title: "Leave Requests",
        icon: <Icons.logout />,
      },
      {
        href: `/dashboard/company/${company.company_id}/employee/holiday`,
        title: "Holidays",
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
