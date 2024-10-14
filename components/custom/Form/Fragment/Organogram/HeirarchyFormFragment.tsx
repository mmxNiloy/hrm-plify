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
import { Textarea } from "@/components/ui/textarea";
import { IDesignation } from "@/schema/DesignationSchema";
import { IEmployeeWithUserMetadata } from "@/schema/EmployeeSchema";
import { ILeaveType } from "@/schema/LeaveSchema";
import {
  IOrganogramHeirarchyRecord,
  IOrganogramLevel,
} from "@/schema/OrganogramSchema";
import { RequiredAsterisk } from "@/styles/label.tailwind";
import { getFullNameOfEmployee } from "@/utils/Misc";
import { IFormFragmentProps } from "@/utils/Types";
import React from "react";

interface Props extends IFormFragmentProps<IOrganogramHeirarchyRecord> {
  employees: IEmployeeWithUserMetadata[];
  designations: IDesignation[];
  levels: IOrganogramLevel[];
}

export default function HeirarchyFormFragment({
  data,
  readOnly,
  disabled,
  employees,
  designations,
  levels,
}: Props) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <Label className={RequiredAsterisk} htmlFor="leave-type-name-input">
          Employee
        </Label>

        <Select
          name="employee_id"
          defaultValue={data ? `${data.employee_id}` : ""}
          key={`employee-id-${data?.employee_id}`}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Select an Employee" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select an Employee</SelectLabel>
              {employees.map((item) => (
                <SelectItem
                  key={`select-item-employee-${item.employee_id}`}
                  value={`${item.employee_id}`}
                >
                  {getFullNameOfEmployee(item)}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label className={RequiredAsterisk} htmlFor="leave-type-name-input">
          Level
        </Label>

        <Select
          name="level_id"
          defaultValue={`${data?.level_id}`}
          key={`level-id-${data?.level_id}`}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a Level" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select a Level</SelectLabel>
              {levels.map((item) => (
                <SelectItem
                  key={`select-item-level-${item.level_id}`}
                  value={`${item.level_id}`}
                >
                  {item.level_name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* TODO: Rest of the form */}

      {/* <div className="flex flex-col gap-2">
        <Label
          className={RequiredAsterisk}
          htmlFor="leave-type-short-code-input"
        >
          Leave Type Short Code
        </Label>
        <Input
          id="leave-type-short-code-input"
          key={`leave-type-short-code-${data?.leave_short_code}`}
          defaultValue={data?.leave_short_code}
          placeholder="Leave Type Short Code"
          name="leave_short_code"
          required
          readOnly={readOnly}
          disabled={disabled}
        />
      </div>

      <div className="flex flex-col gap-2 col-span-full">
        <Label htmlFor="leave-type-description-input">Description</Label>
        <Textarea
          className="resize-none"
          rows={5}
          id="leave-type-description-input"
          key={`leave-type-description-${data?.description}`}
          placeholder="Description..."
          defaultValue={data?.description}
          name="description"
          readOnly={readOnly}
          disabled={disabled}
        />
      </div> */}
    </>
  );
}
