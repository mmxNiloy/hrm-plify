"use client";
import React, { useMemo, useState } from "react";
import { Sidebar, SidebarContent, SidebarHeader, SidebarLink } from "./Sidebar";
import Icons from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { ICompany } from "@/schema/CompanySchema";
import MySidebarHeader from "./MySidebarHeader";
import { BackLinkButton } from "./BackLinkButton";
import { INavAccordionItemProps } from "./NavAccordion";
import NavDrawer from "./NavDrawer";
import NavList from "./NavList";

export default function UserAccessDashboardSidebar({
  company,
}: {
  company: ICompany;
}) {
  const [open, setOpen] = useState<boolean>(true);

  const sidebarItems = useMemo(
    (): INavAccordionItemProps[] => [
      {
        href: `/dashboard/company/${company.company_id}/user-access`,
        title: "User Access",
        icon: <Icons.home />,
      },
      {
        href: `/dashboard/company/${company.company_id}/user-access/user-config`,
        title: "User Configuration",
        icon: <Icons.userCog />,
      },
      {
        href: `/dashboard/company/${company.company_id}/user-access/role`,
        title: "Role Management",
        icon: <Icons.userRole />,
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
            onClick={() => setOpen((old) => !old)}
            open={open}
            company={company}
          />

          <NavList items={sidebarItems} />

          <BackLinkButton />
        </SidebarContent>
      </Sidebar>
    </>
  );
}
