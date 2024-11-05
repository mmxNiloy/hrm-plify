"use client";
import React, { useState } from "react";
import { Sidebar, SidebarContent, SidebarHeader, SidebarLink } from "./Sidebar";
import Icons from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { IUser } from "@/schema/UserSchema";
import MySidebarHeader from "./MySidebarHeader";
import { BackLinkButton } from "./BackLinkButton";

export default function SuperAdminSidebar({ user }: { user: IUser }) {
  const [open, setOpen] = useState<boolean>(true);
  const [hovered, setHovered] = useState<boolean>(false);

  return (
    <Sidebar
      open={
        open
        // || hovered
      }
      // onMouseEnter={() => setHovered(true)}
      // onMouseLeave={() => setHovered(false)}
    >
      <SidebarContent>
        <MySidebarHeader
          onClick={() => setOpen((old) => !old)}
          open={open}
          user={user}
        />

        <SidebarLink href={"/dashboard"}>
          <Icons.home />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Dashboard
          </span>
        </SidebarLink>

        <SidebarLink href={"/dashboard/profile"}>
          <Icons.user />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            My Profile
          </span>
        </SidebarLink>

        <SidebarLink href={"/dashboard/company"}>
          <Icons.company />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Companies
          </span>
        </SidebarLink>

        <SidebarLink href={"/dashboard/user"}>
          <Icons.users />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Users
          </span>
        </SidebarLink>

        <SidebarLink href={"/dashboard/analytics"}>
          <Icons.analytics />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Analytics
          </span>
        </SidebarLink>

        <BackLinkButton />
      </SidebarContent>
    </Sidebar>
  );
}
