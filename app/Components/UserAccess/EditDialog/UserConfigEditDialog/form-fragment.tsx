"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IEmployeeWithUserMetadata } from "@/schema/EmployeeSchema";
import { IUserConfig } from "@/schema/UserSchema";
import { RequiredAsterisk } from "@/styles/label.tailwind";
import { IFormFragmentProps } from "@/utils/Types";
import React from "react";

interface Props extends IFormFragmentProps<IUserConfig> {
  employees: IEmployeeWithUserMetadata[];
}

export default function UserConfigFormFragment({
  data,
  readOnly,
  disabled,
  employees,
}: Props) {
  return (
    <>
      <div className="flex flex-col gap-2 col-span-full">
        <Label className={RequiredAsterisk}>Employee</Label>
        <Select
          key={`employee-${data?.employee_id ?? ""}`}
          defaultValue={`${data?.employee_id ?? ""}`}
          name="employee_id"
          required
          disabled={disabled || readOnly}
        >
          <SelectTrigger>
            <SelectValue placeholder={"Select an Employee"} />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select an Employee</SelectLabel>

              {employees.map((item) => (
                <SelectItem
                  key={`employee-${item.employee_id}`}
                  value={`${item.employee_id}`}
                >{`${item.user.first_name}${
                  item.user.middle_name.length > 0
                    ? ` ${item.user.middle_name}`
                    : ""
                } ${item.user.last_name}`}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2 col-span-full">
        <Label className={RequiredAsterisk}>Email</Label>
        <Input
          id={"email-input"}
          required
          readOnly={readOnly}
          disabled={disabled}
          type="email"
          key={`email-${data?.email}`}
          name="email"
          placeholder="Email"
          defaultValue={data?.email ?? ""}
        />
      </div>

      <div className="flex flex-col gap-2 col-span-full">
        <Label className={RequiredAsterisk}>Password</Label>
        <Input
          id={"password-input"}
          required
          readOnly={readOnly}
          disabled={disabled}
          type="password"
          key={`password-${data?.password}`}
          name="password"
          placeholder="Password"
          defaultValue={data?.password ?? ""}
        />
      </div>
    </>
  );
}
