import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Link from "next/link";
import React from "react";

export default function SuperAdminNavMenu() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Human Resources</MenubarTrigger>
        <MenubarContent>
          <Link href={`/dashboard/employee`}>
            <MenubarItem className="cursor-pointer">
              Employee Management
            </MenubarItem>
          </Link>

          <Link href="/dashboard/job">
            <MenubarItem className="cursor-pointer">
              Job & Recruitment
            </MenubarItem>
          </Link>

          <Link href={"/dashboard/user-access"}>
            <MenubarItem className="cursor-pointer">
              User Access Management
            </MenubarItem>
          </Link>

          <Link href={"/dashboard/leave"}>
            <MenubarItem className="cursor-pointer">
              Leave Management
            </MenubarItem>
          </Link>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>
          <Link href="/dashboard/company">Company Management</Link>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Operations</MenubarTrigger>
        <MenubarContent>
          <MenubarSub>
            <MenubarSubTrigger>Time & Attendance</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarSub>
                <MenubarSubTrigger>Attendance</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem>Dashboard</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Upload attendance</MenubarItem>
                  <MenubarItem>Generate attendance</MenubarItem>
                  <MenubarItem>Daily attendance</MenubarItem>
                  <MenubarItem>Attendance history</MenubarItem>
                  <MenubarItem>Process attendance</MenubarItem>
                  <MenubarItem>Absent report</MenubarItem>
                </MenubarSubContent>
              </MenubarSub>

              <Link href={`/dashboard/rota`}>
                <MenubarItem className="cursor-pointer">Rota</MenubarItem>
              </Link>

              <Link href={`/dashboard/holiday`}>
                <MenubarItem className="cursor-pointer">
                  Holiday Management
                </MenubarItem>
              </Link>
            </MenubarSubContent>
          </MenubarSub>
          <Link href={"/dashboard/task"}>
            <MenubarItem className="cursor-pointer">Tasks</MenubarItem>
          </Link>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Finance & Documents</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Payroll</MenubarItem>
          <MenubarSub>
            <MenubarSubTrigger>Documents</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Dashboard</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Staff report</MenubarItem>
              <MenubarItem>Archive</MenubarItem>
              <MenubarItem>Organization report</MenubarItem>
              <MenubarItem>Employee report</MenubarItem>
              <MenubarItem>Employee archive report</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSub>
            <MenubarSubTrigger>Organogram Chart</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Dashboard</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Level</MenubarItem>
              <MenubarItem>Organization hierarchy</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>Compliance & Planning</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Sponsor Compliance</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
