"use client";
import DepartmentSelect from "@/app/Components/Department/DepartmentSelect";
import DesignationSelect from "@/app/Components/Department/DesignationSelect";
import { SelectSkeleton } from "@/app/Components/Department/SelectSkeleton";
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
import { cn } from "@/lib/utils";
import { IShift } from "@/schema/RotaSchema";
import { stripSeconds } from "@/utils/Misc";
import { IFormFragmentProps } from "@/utils/Types";
import React, { Suspense } from "react";

export default function ShiftManagementFormFragment({
  data,
  readOnly,
  disabled,
}: IFormFragmentProps<IShift>) {
  return (
    <>
      {/* <div className="flex flex-col gap-2">
        <Label
          className={cn(
            readOnly ? "" : "after:content-['*'] after:text-red-500 after:ml-1"
          )}
        >
          Select Department
        </Label>
        <Select
          required
          key={`department-id-department-id-here`}
          name="department_id"
          defaultValue=""
          disabled={readOnly || disabled}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select department</SelectLabel>
              <SelectItem value="1">Department 1</SelectItem>
              <SelectItem value="2">Department 2</SelectItem>
              <SelectItem value="3">Department 3</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label
          className={cn(
            readOnly ? "" : "after:content-['*'] after:text-red-500 after:ml-1"
          )}
        >
          Select Designation
        </Label>
        <Select
          required
          key={`designation-designation-id-here`}
          name="designation_id"
          defaultValue=""
          disabled={readOnly || disabled}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Designation" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select designation</SelectLabel>
              <SelectItem value="1">Designation 1</SelectItem>
              <SelectItem value="2">Designation 2</SelectItem>
              <SelectItem value="3">Designation 3</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div> */}

      <div className="col-span-full flex flex-col gap-2">
        <Label
          className={cn(
            readOnly ? "" : "after:content-['*'] after:text-red-500 after:ml-1"
          )}
          htmlFor="shift-name-input"
        >
          Shift Name
        </Label>
        <Input
          id="shift-name-input"
          key={`shift-name-${data?.shift_name}`}
          required
          readOnly={readOnly}
          disabled={disabled}
          name="shift_name"
          defaultValue={data?.shift_name}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label
          className={cn(
            readOnly ? "" : "after:content-['*'] after:text-red-500 after:ml-1"
          )}
          htmlFor="shift-start-time-input"
        >
          Shift Start
        </Label>
        <Input
          id="shift-start-time-input"
          key={`shift-start-time-${data?.start_time}`}
          required
          readOnly={readOnly}
          disabled={disabled}
          name="start_time"
          type="time"
          defaultValue={data?.start_time && stripSeconds(data.start_time)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label
          className={cn(
            readOnly ? "" : "after:content-['*'] after:text-red-500 after:ml-1"
          )}
          htmlFor="shift-end-time-input"
        >
          Shift End
        </Label>
        <Input
          id="shift-end-time-input"
          key={`shift-end-time-${data?.end_time}`}
          required
          readOnly={readOnly}
          disabled={disabled}
          name="end_time"
          type="time"
          defaultValue={data?.end_time && stripSeconds(data.end_time)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label
          className={cn(
            readOnly ? "" : "after:content-['*'] after:text-red-500 after:ml-1"
          )}
          htmlFor="break-start-input"
        >
          Break Time Start
        </Label>
        <Input
          id="break-start-input"
          key={`break-start-${data?.break_start}`}
          required
          readOnly={readOnly}
          disabled={disabled}
          name="break_start"
          type="time"
          defaultValue={data?.break_start && stripSeconds(data.break_start)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label
          className={cn(
            readOnly ? "" : "after:content-['*'] after:text-red-500 after:ml-1"
          )}
          htmlFor="break-end-input"
        >
          Break Time End
        </Label>
        <Input
          id="break-end-input"
          key={`break-end-${data?.break_end}`}
          required
          readOnly={readOnly}
          disabled={disabled}
          name="break_end"
          type="time"
          defaultValue={data?.break_end && stripSeconds(data.break_end)}
        />
      </div>

      {/* <div className="flex flex-col gap-2 col-span-full">
        <Label htmlFor="shift-description-textarea">Shift Description</Label>
        <Textarea
          className="resize-none"
          id="shift-description-textarea"
          key={`shift-description-${data?.shift_name}`}
          required
          readOnly={readOnly}
          disabled={disabled}
          name="shift_description"
          rows={5}
          defaultValue={data?.shift_name}
        />
      </div> */}
    </>
  );
}
