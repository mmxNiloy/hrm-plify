"use server";
import React from "react";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import NavLogo from "../../Navbar/NavLogo";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import DashboardNavMenu from "./DashboardNavMenu";
import NavProfile from "./NavProfile";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import { getCompanyData } from "@/app/actions/getCompanyData";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ICompany } from "@/schema/CompanySchema";

export default async function DashboardNavbar() {
  if (!cookies().has(process.env.COOKIE_USER_KEY!)) {
    return null;
  }

  const user = JSON.parse(
    cookies().get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;
  var company: ICompany | undefined;
  if (
    user.user_roles?.roles.role_name === "Company Admin" ||
    user.user_roles?.roles.role_name === "Employee"
  )
    company = await getCompanyData(user.usercompany?.company_id ?? 0);
  else company = undefined;

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
            <Icons.user />
            <p className="w-32 text-start line-clamp-1 text-ellipsis">
              {user.first_name} {user.last_name}
            </p>
            <Icons.chevronDown className="size-4 rotate-0 group-data-[state=open]:rotate-180 transition-all" />
          </PopoverTrigger>

          <PopoverContent>
            <div className="flex flex-col gap-2">
              <NavProfile user={user} company={company} />
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
}
