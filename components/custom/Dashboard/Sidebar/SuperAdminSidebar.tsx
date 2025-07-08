"use client";
import React, { useMemo, useState } from "react";
import { Sidebar, SidebarContent } from "./Sidebar";
import Icons from "@/components/ui/icons";
import { IUser } from "@/schema/UserSchema";
import MySidebarHeader from "./MySidebarHeader";
import { BackLinkButton } from "./BackLinkButton";
import { TPermission } from "@/schema/Permissions";
import NavList from "./NavList";
import NavDrawer from "./NavDrawer";
import { INavAccordionItemProps } from "./NavAccordion";

export default function SuperAdminSidebar({
  user,
  permissions,
}: {
  user: IUser;
  permissions: TPermission[];
}) {
  const [open, setOpen] = useState<boolean>(true);
  const sidebarItems = useMemo(
    (): INavAccordionItemProps[] => [
      {
        href: "/dashboard",
        title: "Dashboard",
        icon: <Icons.home />,
      },
      {
        href: "/dashboard/profile",
        title: "My Profile",
        icon: <Icons.user />,
      },
      {
        href: "/dashboard/company",
        title: "Companies",
        icon: <Icons.company />,
      },
      {
        href: "/dashboard/user",
        title: "Users",
        icon: <Icons.users />,
        hidden: !permissions.find((item) => item === "sys_user_read"),
      },
      {
        href: "/dashboard/employment-type",
        title: "Employment Type",
        icon: <Icons.list />,
      },
      {
        href: "/dashboard/notification",
        title: "Notifications",
        icon: <Icons.bell />,
      },
      // {
      //   href: "#",
      //   title: "Analytics",
      //   icon: <Icons.analytics />,
      // },
    ],
    [permissions]
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
            user={user}
          />

          <NavList items={sidebarItems} />

          <BackLinkButton />
        </SidebarContent>
      </Sidebar>
    </>
  );
}
