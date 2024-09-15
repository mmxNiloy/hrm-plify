import {
  Menubar,
  MenubarContent,
  MenubarTrigger,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
} from "@/components/ui/menubar";
import { IUser } from "@/schema/UserSchema";
import Link from "next/link";
import React from "react";

export default function EmployeeNavMenu({ user }: { user: IUser }) {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>
          <Link
            className="cursor-pointer"
            href={`/dashboard/company/${user.company_id}/employee/home/holidays`}
          >
            Holiday Calendar
          </Link>
        </MenubarTrigger>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>
          <Link
            className="cursor-pointer"
            href={`/dashboard/company/${user.company_id}/employee/home/leave-status`}
          >
            Leave Status
          </Link>
        </MenubarTrigger>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>
          <Link
            className="cursor-pointer"
            href={`/dashboard/company/${user.company_id}/employee/home/attendance-status`}
          >
            Attendance Status
          </Link>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
          <Link
            className="cursor-pointer"
            href={`/dashboard/company/${user.company_id}/employee/home/change-of-circumstances`}
          >
            Change of Circumstances
          </Link>
        </MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  );
}
