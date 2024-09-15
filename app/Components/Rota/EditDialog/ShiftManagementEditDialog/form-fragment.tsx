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
import { IFormFragmentProps } from "@/utils/Types";
import React, { Suspense } from "react";

export default function ShiftManagementFormFragment({
  data,
  readOnly,
  disabled,
}: IFormFragmentProps<IShift>) {
  return (
    <>
      <div className="flex flex-col gap-2">
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
      </div>

      <div className="flex flex-col gap-2">
        <Label
          className={cn(
            readOnly ? "" : "after:content-['*'] after:text-red-500 after:ml-1"
          )}
          htmlFor="work-in-time-input"
        >
          Clock In Time
        </Label>
        <Input
          id="work-in-time-input"
          key={`work-in-time-${data?.work_in_time}`}
          required
          readOnly={readOnly}
          disabled={disabled}
          name="work_in_time"
          type="time"
          defaultValue={data?.work_in_time}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label
          className={cn(
            readOnly ? "" : "after:content-['*'] after:text-red-500 after:ml-1"
          )}
          htmlFor="work-out-time-input"
        >
          Clock Out Time
        </Label>
        <Input
          id="work-out-time-input"
          key={`work-out-time-${data?.work_out_time}`}
          required
          readOnly={readOnly}
          disabled={disabled}
          name="work_out_time"
          type="time"
          defaultValue={data?.work_out_time}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label
          className={cn(
            readOnly ? "" : "after:content-['*'] after:text-red-500 after:ml-1"
          )}
          htmlFor="break-time-start-input"
        >
          Break Time Start
        </Label>
        <Input
          id="break-time-start-input"
          key={`break-time-start-${data?.break_time_start}`}
          required
          readOnly={readOnly}
          disabled={disabled}
          name="break_time_start"
          type="time"
          defaultValue={data?.break_time_start}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label
          className={cn(
            readOnly ? "" : "after:content-['*'] after:text-red-500 after:ml-1"
          )}
          htmlFor="break-time-end-input"
        >
          Break Time End
        </Label>
        <Input
          id="break-time-end-input"
          key={`break-time-end-${data?.break_time_end}`}
          required
          readOnly={readOnly}
          disabled={disabled}
          name="break_time_end"
          type="time"
          defaultValue={data?.break_time_end}
        />
      </div>

      <div className="flex flex-col gap-2 col-span-full">
        <Label htmlFor="shift-description-textarea">Shift Description</Label>
        <Textarea
          className="resize-none"
          id="shift-description-textarea"
          key={`shift-description-${data?.shift_description}`}
          required
          readOnly={readOnly}
          disabled={disabled}
          name="shift_description"
          rows={5}
          defaultValue={data?.shift_description}
        />
      </div>
    </>
  );
}
