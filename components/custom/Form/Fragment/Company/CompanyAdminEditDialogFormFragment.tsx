"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ICompanyUser } from "@/schema/UserSchema";
import { RequiredAsterisk } from "@/styles/label.tailwind";
import { IFormFragmentProps } from "@/utils/Types";
import React from "react";

export default function CompanyAdminEditDialogFormFragment({
  data,
  readOnly,
  disabled,
}: IFormFragmentProps<ICompanyUser>) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <Label className={RequiredAsterisk} htmlFor="email-input">
          Email
        </Label>
        <Input
          defaultValue={data?.users.email}
          required
          id="email-input"
          name="email"
          type="email"
          placeholder="Email"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label className={RequiredAsterisk} htmlFor="email-input">
          Password
        </Label>
        <PasswordInput name="password" />
      </div>

      <div className="flex flex-col gap-2">
        <Label className={RequiredAsterisk} htmlFor="first-name-input">
          First Name
        </Label>
        <Input
          required
          defaultValue={data?.users.first_name}
          id="first-name-input"
          name="fname"
          placeholder="First Name"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label className={RequiredAsterisk} htmlFor="middle-name-input">
          Middle Name
        </Label>
        <Input
          required
          defaultValue={data?.users.middle_name}
          id="middle-name-input"
          name="mname"
          placeholder="Middle Name"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label className={RequiredAsterisk} htmlFor="last-name-input">
          Last Name
        </Label>
        <Input
          required
          defaultValue={data?.users.last_name}
          id="last-name-input"
          name="lname"
          placeholder="Last Name"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label className={RequiredAsterisk}>Role</Label>
        <Select
          defaultValue={data?.company_role_id.toString()}
          required
          name="company_role_id"
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a Role" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select a role</SelectLabel>

              {/* <SelectItem value="4">Employee</SelectItem> */}
              <SelectItem value="3">Company Admin</SelectItem>
              <SelectItem value="2">Admin</SelectItem>
              {/* <SelectItem value="1">Super Admin</SelectItem> */}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
