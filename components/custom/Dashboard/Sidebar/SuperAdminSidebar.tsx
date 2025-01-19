"use client";
import React, { useState } from "react";
import { Sidebar, SidebarContent, SidebarHeader, SidebarLink } from "./Sidebar";
import Icons from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { IUser } from "@/schema/UserSchema";
import MySidebarHeader from "./MySidebarHeader";
import { BackLinkButton } from "./BackLinkButton";
import { Button } from "@/components/ui/button";
import { TPermission } from "@/schema/Permissions";

export default function SuperAdminSidebar({
  user,
  permissions,
}: {
  user: IUser;
  permissions: TPermission[];
}) {
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

        {permissions.find((item) => item === "sys_user_read") && (
          <SidebarLink href={"/dashboard/user"}>
            <Icons.users />
            <span className="transition-all group-data-[state=closed]/sidebar:hidden">
              Users
            </span>
          </SidebarLink>
        )}

        <SidebarLink href={"/dashboard/employment-type"}>
          <Icons.list />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Employment Type
          </span>
        </SidebarLink>

        {/* <Button variant={"ghost"} className="justify-start gap-2" disabled>
          <Icons.users />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Users
          </span>
        </Button> */}

        <Button variant={"ghost"} className="justify-start gap-2" disabled>
          <Icons.analytics />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Analytics
          </span>
        </Button>

        <BackLinkButton />
      </SidebarContent>
    </Sidebar>
  );
}
