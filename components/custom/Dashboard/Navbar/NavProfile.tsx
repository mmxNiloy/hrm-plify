"use server";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { Label } from "@/components/ui/label";
import { IUser } from "@/schema/UserSchema";
import React from "react";
import TextCapsule from "../../TextCapsule";
import { logout } from "@/app/(server)/actions/logout";
import { AvatarPicker } from "@/components/ui/avatar-picker";
import { IEmployeeWithUserMetadata } from "@/schema/EmployeeSchema";
import GradientBorderContainer from "@/components/ui/gradient-border-container";
import ThemeSwitch from "./theme-switch";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";

export default async function NavProfile({
  user,
  employeeData,
}: {
  user: IUser;
  employeeData?: IEmployeeWithUserMetadata;
}) {
  const company = await getCompanyData(
    user.usercompany?.company_id.toString() ?? "0"
  );

  return (
    <>
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
                skeleton={<Icons.user className="size-16" />}
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
              {company.data && (
                <p className="text-start text-xs">
                  {company.data.company_name}
                </p>
              )}

              <TextCapsule className="bg-green-500 text-xs">
                {user.user_roles?.roles.role_name ?? "Guest"}
              </TextCapsule>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="theme-switch">Dark mode</Label>
        <ThemeSwitch />
      </div>

      <form action={logout} method="POST">
        <Button variant={"destructive"} className="gap-2 w-full" size={"sm"}>
          <Icons.logout />
          Logout
        </Button>
      </form>
    </>
  );
}
