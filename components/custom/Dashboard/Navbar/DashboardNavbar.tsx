"use server";
import React from "react";
import Icons from "@/components/ui/icons";
import NavLogo from "../../Navbar/NavLogo";
import NavProfile from "./NavProfile";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ICompany } from "@/schema/CompanySchema";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import { getEmployeeData } from "@/app/(server)/actions/getEmployeeData";
import { AvatarPicker } from "@/components/ui/avatar-picker";

export default async function DashboardNavbar() {
  var user: IUser | undefined;
  try {
    user = JSON.parse(
      (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
    ) as IUser;
  } catch (err) {
    console.error("DashboardNavbar > User Cookie not found", err);
    return null;
  }

  const [employeeData, company] = await Promise.all([
    getEmployeeData(),
    getCompanyData(user.usercompany?.company_id ?? 0),
  ]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 w-full items-center gap-2 md:gap-4 lg:gap-8 px-6 md:px-8 lg:px-16 sm:space-x-0">
        <NavLogo href="/dashboard" />

        {/* <DashboardNavMenu user={user} company={company} /> */}

        {/* Empty gap */}
        <span className="flex-grow" />

        {/* <LoginDialog /> */}
        <Popover>
          <PopoverTrigger className="group flex gap-1 items-center">
            <AvatarPicker
              readOnly
              src={employeeData.data?.data?.image}
              className="size-6 p-0 ring-blue-500 ring-1"
              skeleton={<Icons.user className="size-6" />}
            />
            <p className="w-32 text-start line-clamp-1 text-ellipsis">
              {user.first_name} {user.last_name}
            </p>
            <Icons.chevronDown className="size-4 rotate-0 group-data-[state=open]:rotate-180 transition-all" />
          </PopoverTrigger>

          <PopoverContent>
            <div className="flex flex-col gap-2">
              <NavProfile
                user={user}
                employeeData={employeeData.data?.data}
                company={company.data}
              />
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
}
