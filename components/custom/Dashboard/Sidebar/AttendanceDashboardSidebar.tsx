"use client";
import React, { useMemo, useState } from "react";
import { Sidebar, SidebarContent } from "./Sidebar";
import Icons from "@/components/ui/icons";
import { ICompany } from "@/schema/CompanySchema";
import MySidebarHeader from "./MySidebarHeader";
import { BackLinkButton } from "./BackLinkButton";
import NavDrawer from "./NavDrawer";
import NavList from "./NavList";
import { INavAccordionItemProps } from "./NavAccordion";
import { IUser } from "@/schema/UserSchema";

export default function AttendanceDashboardSidebar({
  company,
  user,
}: {
  company: ICompany;
  user: IUser;
}) {
  const [open, setOpen] = useState<boolean>(true);
  const [hovered, setHovered] = useState<boolean>(false);

  const navItems = useMemo(
    (): INavAccordionItemProps[] => [
      {
        href: `/dashboard/company/${company.company_id}/attendance`,
        icon: <Icons.note />,
        title: "Attendance Records",
      },
      {
        href: `/dashboard/company/${company.company_id}/attendance/generate`,
        icon: <Icons.fileCog />,
        title: "Generate Attendance",
        hidden:
          user.user_roles?.roles?.role_name !== "Super Admin" &&
          user.user_roles?.roles?.role_name !== "Admin",
      },
    ],
    [company.company_id, user.user_roles?.roles?.role_name]
  );

  return (
    <>
      <NavDrawer>
        <NavList items={navItems} />
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

          <NavList items={navItems} />

          <BackLinkButton />
        </SidebarContent>
      </Sidebar>
    </>
  );
}
