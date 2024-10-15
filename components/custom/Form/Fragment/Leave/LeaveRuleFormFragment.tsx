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
import { ILeaveRule, ILeaveType } from "@/schema/LeaveSchema";
import { RequiredAsterisk } from "@/styles/label.tailwind";
import { toYYYYMMDD } from "@/utils/Misc";
import { IFormFragmentProps } from "@/utils/Types";
import React from "react";

interface Props extends IFormFragmentProps<ILeaveRule> {
  leaveTypes?: ILeaveType[];
}

export default function LeaveRuleFormFragment({
  data,
  readOnly,
  disabled,
  leaveTypes = [],
}: Props) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <Label className={RequiredAsterisk}>Employee Type</Label>
        <Select
          key={`employee-type-${data?.employee_type}`}
          defaultValue={data?.employee_type}
          name="employee_type"
          required
          disabled={disabled || readOnly}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Employee Type" />
          </SelectTrigger>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label
          className={RequiredAsterisk}
          htmlFor="leave-type-short-code-input"
        >
          Leave Type
        </Label>
        <Select
          key={`leave-type-short-code-${data?.leave_type_id}`}
          defaultValue={data ? `${data?.leave_type_id}` : undefined}
          name="leave_type_id"
          required
          disabled={disabled || readOnly}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Leave Type" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select Leave Type</SelectLabel>
              {leaveTypes.map((item) => (
                <SelectItem
                  value={`${item.leave_type_id}`}
                  key={`${item.leave_type_id}`}
                >
                  {item.leave_type_name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2 col-span-full">
        <Label className={RequiredAsterisk}>Maximum Number (Annual)</Label>
        <Input
          type="number"
          id="max-number-input"
          key={`max-number-${data?.max_number}`}
          placeholder="Maximum Number (Annual)"
          defaultValue={data?.max_number}
          name="max_number"
          readOnly={readOnly}
          disabled={disabled}
        />
      </div>

      <div className="flex flex-col gap-2 col-span-full">
        <Label className={RequiredAsterisk}>Effective From</Label>
        <Input
          key={`effective-from-${data?.effective_from}`}
          placeholder="Effective From"
          type="date"
          defaultValue={
            data?.effective_from
              ? toYYYYMMDD(new Date(data?.effective_from))
              : ""
          }
          name="effective_from"
          readOnly={readOnly}
          disabled={disabled}
        />
      </div>

      <div className="flex flex-col gap-2 col-span-full">
        <Label className={RequiredAsterisk}>Effective To</Label>
        <Input
          key={`effective-to-${data?.effective_to}`}
          placeholder="Effective To"
          type="date"
          defaultValue={
            data?.effective_to ? toYYYYMMDD(new Date(data?.effective_to)) : ""
          }
          name="effective_to"
          readOnly={readOnly}
          disabled={disabled}
        />
      </div>
    </>
  );
}
