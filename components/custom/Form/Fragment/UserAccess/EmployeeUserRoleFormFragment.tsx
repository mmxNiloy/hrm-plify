"use client";
import { ComboBox } from "@/components/ui/combobox";
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
import { IEmployeeUserRole } from "@/schema/UserSchema";
import { RequiredAsterisk } from "@/styles/label.tailwind";
import { IFormFragmentProps } from "@/utils/Types";
import React from "react";

interface Props extends IFormFragmentProps<IEmployeeUserRole> {
  employees: IEmployeeWithUserMetadata[];
}

const moduleList: string[] = [
  "Employee",
  "Recruitment",
  "Leave Management",
  "Holiday Management",
  "Leave Approver",
  "Attendance Management",
  "Settings",
  "Organization",
  "Shift",
  "Role Management",
  "Organogram Chart",
  "Documents",
  "Dashboard",
];

export default function EmployeeUserRoleFormFragment({
  data,
  readOnly,
  disabled,
  employees,
}: Props) {
  return (
    <>
      <div className="flex flex-col gap-2 col-span-full">
        <Label className={RequiredAsterisk}>Module</Label>
        <Select
          key={`module-name-${data?.module_name ?? ""}`}
          defaultValue={`${data?.module_name ?? ""}`}
          name="module_name"
          required
          disabled={disabled || readOnly}
        >
          <SelectTrigger>
            <SelectValue placeholder={"Select a Module"} />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select a Module</SelectLabel>

              {moduleList.map((item) => (
                <SelectItem key={`module-${item}`} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2 col-span-full">
        <Label className={RequiredAsterisk}>Menu</Label>
        <Select
          key={`access-${data?.access ?? ""}`}
          defaultValue={`${data?.access ?? ""}`}
          name="access"
          required
          disabled={disabled || readOnly}
        >
          <SelectTrigger>
            <SelectValue placeholder={"Specify Access"} />
          </SelectTrigger>

          {/* TODO: Add access content here */}
        </Select>
      </div>

      <div className="flex flex-col gap-2 col-span-full">
        <Label className={RequiredAsterisk}>Permissions</Label>
        <ComboBox
          required
          disabled={disabled}
          readOnly={readOnly}
          items={["Create", "Read", "Update", "Delete"]}
          name="permissions"
          key={`permissions-${data?.permissions}`}
          defaultValue={data?.permissions ?? ""}
        />
      </div>

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
                  (item.user.middle_name?.length ?? 0) > 0
                    ? ` ${item.user.middle_name}`
                    : ""
                } ${item.user.last_name}`}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
