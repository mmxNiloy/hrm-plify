"use client";

import { AvatarPicker } from "@/components/ui/avatar-picker";
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import GradientBorderContainer from "@/components/ui/gradient-border-container";
import { useSidebar } from "@/components/ui/sidebar";
import { ICompany } from "@/schema/CompanySchema";
import { IEmployee } from "@/schema/EmployeeSchema";
import { IUser } from "@/schema/UserSchema";
import React from "react";
import TextCapsule from "../../TextCapsule";
import { Label } from "@/components/ui/label";
import ThemeSwitch from "../Navbar/theme-switch";
import LogOutForm from "./logout-form";
import { UserCircle2 } from "lucide-react";

interface Props {
  employeeData?: IEmployee;
  user: IUser;
  company?: ICompany;
}

export default function SidebarFooterProfileContent({
  user,
  employeeData,
  company,
}: Props) {
  const { isMobile } = useSidebar();

  return (
    <DropdownMenuContent
      className="min-w-64"
      align={isMobile ? undefined : "start"}
      side={isMobile ? undefined : "right"}
    >
      <DropdownMenuGroup className="space-y-2">
        <DropdownMenuLabel>Profile</DropdownMenuLabel>
        {/* Profile display card */}
        <div className="w-64">
          {/* Profile card */}
          <div className="bg-accent rounded-md flex flex-col gap-2 p-2">
            <div className="flex gap-1">
              {/* Avatar */}
              <GradientBorderContainer className="rounded-full size-fit">
                <AvatarPicker
                  readOnly
                  src={employeeData?.image}
                  className="size-16 p-0"
                  skeleton={<UserCircle2 className="size-16" />}
                />
              </GradientBorderContainer>
              <div className="flex flex-col gap-1">
                <p className="text-start font-semibold text-sm">{`${
                  user.first_name
                }${
                  (user.middle_name?.length ?? 0) > 0
                    ? ` ${user.middle_name}`
                    : ""
                } ${user.last_name}`}</p>
                <p className="text-start text-xs">{user.email}</p>
                {company && (
                  <p className="text-start text-xs">{company.company_name}</p>
                )}

                <TextCapsule className="bg-green-500 text-xs">
                  {user.user_roles?.roles?.role_name ?? "Guest"}
                </TextCapsule>
              </div>
            </div>
          </div>
        </div>
        {/* Profile items */}
        <div className="flex items-center justify-between px-2">
          <Label htmlFor="theme-switch">Enable Darkmode?</Label>
          <ThemeSwitch />
        </div>
        <LogOutForm />
      </DropdownMenuGroup>
    </DropdownMenuContent>
  );
}
