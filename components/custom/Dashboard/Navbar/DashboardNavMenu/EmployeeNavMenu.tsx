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
import { ICompany } from "@/schema/CompanySchema";
import { IUser } from "@/schema/UserSchema";
import Link from "next/link";
import React from "react";

export default function EmployeeNavMenu({
  user,
  company,
}: {
  user: IUser;
  company?: ICompany;
}) {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>
          <Link
            className="cursor-pointer"
            href={`/dashboard/company/${user.usercompany?.company_id}/employee/home/holidays`}
          >
            Holiday Calendar
          </Link>
        </MenubarTrigger>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>
          <Link
            className="cursor-pointer"
            href={`/dashboard/company/${user.usercompany?.company_id}/employee/home/leave-status`}
          >
            Leave Status
          </Link>
        </MenubarTrigger>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>
          <Link
            className="cursor-pointer"
            href={`/dashboard/company/${user.usercompany?.company_id}/employee/home/attendance-status`}
          >
            Attendance Status
          </Link>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
          <Link
            className="cursor-pointer"
            href={`/dashboard/company/${user.usercompany?.company_id}/employee/home/change-of-circumstances`}
          >
            Change of Circumstances
          </Link>
        </MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  );
}
