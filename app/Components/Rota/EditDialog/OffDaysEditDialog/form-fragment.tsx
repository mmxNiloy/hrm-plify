"use client";
import { Checkbox } from "@/components/ui/checkbox";
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
import { IOffDays } from "@/schema/RotaSchema";
import { weekDays } from "@/utils/Misc";
import { IFormFragmentProps } from "@/utils/Types";
import React from "react";

export default function OffDaysFormFragment({
  data,
  readOnly,
  disabled,
}: IFormFragmentProps<IOffDays>) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <Label className="after:content-['*'] after:text-red-500 after:ml-1">
          Department
        </Label>
        <Select
          required
          defaultValue={`${data?.department.department_id ?? ""}`}
          name="department_id"
          disabled={disabled || readOnly}
        >
          <SelectTrigger>
            <SelectValue placeholder={"Select a Department"} />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select a department</SelectLabel>

              <SelectItem value="1">Department 1</SelectItem>
              <SelectItem value="2">Department 2</SelectItem>
              <SelectItem value="3">Department 3</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label className="after:content-['*'] after:text-red-500 after:ml-1">
          Designation
        </Label>
        <Select
          required
          defaultValue={`${data?.designation.designation_id ?? ""}`}
          name="designation_id"
          disabled={disabled || readOnly}
        >
          <SelectTrigger>
            <SelectValue placeholder={"Select a Designation"} />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select a designation</SelectLabel>

              <SelectItem value="1">Designation 1</SelectItem>
              <SelectItem value="2">Designation 2</SelectItem>
              <SelectItem value="3">Designation 3</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label className="after:content-['*'] after:text-red-500 after:ml-1">
          Shift
        </Label>
        <Select
          required
          defaultValue={`${data?.shift.shift_id ?? ""}`}
          name="shift_id"
          disabled={disabled || readOnly}
        >
          <SelectTrigger>
            <SelectValue placeholder={"Select a Shift"} />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select a shift</SelectLabel>

              <SelectItem value="1">Shift 1</SelectItem>
              <SelectItem value="2">Shift 2</SelectItem>
              <SelectItem value="3">Shift 3</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Days of week checkbox set */}
      <Label className="col-span-full">Off Days</Label>
      {weekDays.map((item, index) => (
        <div className="flex gap-2" key={`${item}-${data?.days.at(index)}`}>
          <Checkbox
            id={`${item}-checkbox`}
            name={item.toLowerCase()}
            disabled={disabled || readOnly}
            key={`${item}-${data?.days.at(index)}`}
          />
          <Label htmlFor={`${item}-checkbox`}>{item}</Label>
        </div>
      ))}
    </>
  );
}
