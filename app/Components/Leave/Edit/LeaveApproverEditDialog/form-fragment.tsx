"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import { IEmployeeWithUserMetadata } from "@/schema/EmployeeSchema";
import { ILeaveApprover, ILeaveType } from "@/schema/LeaveSchema";
import { RequiredAsterisk } from "@/styles/label.tailwind";
import { getFullNameOfEmployee, getFullNameOfUser } from "@/utils/Misc";
import { IFormFragmentProps } from "@/utils/Types";
import React, { useEffect } from "react";

interface Props extends IFormFragmentProps<ILeaveApprover> {
  employees: IEmployeeWithUserMetadata[];
}

export default function LeaveApproverFormFragment({
  data,
  readOnly,
  disabled,
  employees,
}: Props) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <Label className={RequiredAsterisk}>Employee</Label>
        <Select
          key={`employee-id-${data?.employee_id}`}
          defaultValue={data ? `${data.employee_id}` : ""}
          name="employee_id"
          required
          disabled={disabled || readOnly || Boolean(data)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select an Employee" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select an Employee</SelectLabel>
              {employees.map((emp) => (
                <SelectItem
                  value={`${emp.employee_id}`}
                  key={`employee-id-select-item-${emp.employee_id}`}
                >
                  {getFullNameOfEmployee(emp)}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label className={RequiredAsterisk}>Status</Label>
        <RadioGroup
          key={`is-active-${data?.is_active}`}
          defaultValue={`${data?.is_active}`}
          name="is_active"
          required
          disabled={disabled || readOnly}
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem value="0" id="radio-inactive" />
            <Label htmlFor="radio-inactive">Inactive</Label>
          </div>

          <div className="flex items-center gap-2">
            <RadioGroupItem value="1" id="radio-active" />
            <Label htmlFor="radio-active">Active</Label>
          </div>
        </RadioGroup>
      </div>
    </>
  );
}
