"use client";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ICompany } from "@/schema/CompanySchema";
import { IUser } from "@/schema/UserSchema";
import { useTheme } from "next-themes";
import React from "react";
import TextCapsule from "../../TextCapsule";
import { logout } from "@/app/(server)/actions/logout";

export default function NavProfile({
  user,
  company,
}: {
  user: IUser;
  company?: ICompany;
}) {
  const { theme, setTheme } = useTheme();
  return (
    <>
      <div className="w-64">
        {/* Profile card */}
        <div className="bg-accent rounded-md flex flex-col gap-2 p-2">
          <div className="flex gap-1">
            {/* Avatar */}
            <Icons.user className="size-16" />
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
                {user.user_roles?.roles.role_name ?? "Guest"}
              </TextCapsule>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="theme-switch">Dark mode</Label>
        <Switch
          id="theme-switch"
          defaultChecked={theme === "dark"}
          onCheckedChange={() => {
            setTheme(theme === "dark" ? "light" : "dark");
          }}
        />
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
