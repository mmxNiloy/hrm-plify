"use client";
import React, { useState } from "react";
import { Sidebar, SidebarContent, SidebarHeader, SidebarLink } from "./Sidebar";
import Icons from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { IUser } from "@/schema/UserSchema";

export default function SuperAdminSidebar({ user }: { user: IUser }) {
  const [open, setOpen] = useState<boolean>(true);
  const [hovered, setHovered] = useState<boolean>(false);

  return (
    <Sidebar
      open={open || hovered}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <SidebarContent>
        <SidebarHeader
          onClick={() => setOpen(!open)}
          title={`${user.first_name} ${user.last_name}`}
          className={
            "bg-accent space-y-0 cursor-pointer flex flex-row gap-2 items-center justify-center rounded-md mb-4"
          }
        >
          <Icons.user />
          <p
            className={cn(
              "flex-grow font-semibold line-clamp-1 text-ellipsis max-w-44 2xl:max-w-80",
              open || hovered ? "" : "hidden"
            )}
          >
            {`${user.first_name} ${user.last_name}`}
          </p>
          <span className="size-10 flex relative rounded-full items-center justify-center">
            <Icons.chevronLeft
              className={cn(
                "absolute transition-all",
                open ? "rotate-0 scale-100" : "rotate-180 scale-0"
              )}
            />
            <Icons.chevronRight
              className={cn(
                "transition-all",
                open ? "rotate-180 scale-0" : "rotate-0 scale-100"
              )}
            />
          </span>
        </SidebarHeader>

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
      </SidebarContent>
    </Sidebar>
  );
}
