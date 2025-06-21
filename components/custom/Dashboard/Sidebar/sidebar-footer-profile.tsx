"use server";
import getCurrentUser from "@/app/(server)/actions/user/get-current-user.controller";
import React from "react";
import LogOutForm from "./logout-form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import GradientBorderContainer from "@/components/ui/gradient-border-container";
import { AvatarPicker } from "@/components/ui/avatar-picker";
import { getEmployeeData } from "@/app/(server)/actions/getEmployeeData";
import { ChevronsUpDown, User2, UserCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeSwitch from "../Navbar/theme-switch";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import TextCapsule from "../../TextCapsule";
import { Label } from "@/components/ui/label";
import SidebarFooterProfileContent from "./sidebar-footer-profile-content";

export default async function SidebarFooterProfile() {
  const [user, employeeData] = await Promise.all([
    getCurrentUser(),
    getEmployeeData(),
  ]);

  if (!user) return <LogOutForm />;

  const company = await getCompanyData(
    user.usercompany?.company_id.toString() ?? "0"
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"ghost"}
          className="w-full justify-start gap-1 [&_svg]:size-4"
        >
          <GradientBorderContainer className="flex items-center justify-center rounded-full">
            <AvatarPicker
              readOnly
              src={employeeData.data?.data?.image}
              className="size-8 p-0"
              skeleton={<UserCircle2 className="size-8" />}
            />
          </GradientBorderContainer>
          <div className="flex flex-col text-start">
            <span className="max-w-32 line-clamp-1 text-ellipsis">
              {user.first_name} {user.last_name}
            </span>
            <span className="text-xs text-muted-foreground">{user.email}</span>
          </div>

          <span className="flex-1" />

          <ChevronsUpDown className="text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>

      <SidebarFooterProfileContent
        user={user}
        company={company.data}
        employeeData={employeeData.data?.data}
      />
    </DropdownMenu>
  );
}
