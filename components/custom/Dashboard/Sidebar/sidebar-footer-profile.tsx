"use server";
import getCurrentUser from "@/app/(server)/actions/user/get-current-user.controller";
import React from "react";
import LogOutForm from "./logout-form";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import GradientBorderContainer from "@/components/ui/gradient-border-container";
import { AvatarPicker } from "@/components/ui/avatar-picker";
import { getEmployeeData } from "@/app/(server)/actions/getEmployeeData";
import { ChevronsUpDown, UserCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import SidebarFooterProfileContent from "./sidebar-footer-profile-content";
import { ICompany } from "@/schema/CompanySchema";

export default async function SidebarFooterProfile() {
  const [user, employeeData] = await Promise.all([
    getCurrentUser(),
    getEmployeeData(),
  ]);

  if (!user) return <LogOutForm />;

  let companyData: ICompany | undefined = undefined;
  try {
    if (!!user.usercompany?.company_id) {
      const company = await getCompanyData(
        user.usercompany.company_id.toString(),
      );

      if (company.data) companyData = company.data;
      else {
        console.log(
          "[SidebarFooterProfile] Company not found. Error:",
          company,
        );
      }
    }
  } catch (error) {
    console.log(
      "[SidebarFooterProfile] Failed to fetch company data. Error:",
      error,
    );
  }

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
        company={companyData}
        employeeData={employeeData.data?.data}
      />
    </DropdownMenu>
  );
}
