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
import { IOffDays, IShift } from "@/schema/RotaSchema";
import { weekDays } from "@/utils/Misc";
import { IFormFragmentProps } from "@/utils/Types";
import React from "react";

interface Props extends IFormFragmentProps<IOffDays> {
  shifts: IShift[];
}

export default function OffDaysFormFragment({
  data,
  readOnly,
  disabled,
  shifts,
}: Props) {
  return (
    <>
      {/* <div className="flex flex-col gap-2">
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
      </div> */}

      <div className="flex flex-col gap-2 col-span-full">
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

              {shifts.map((shift) => (
                <SelectItem
                  key={`shift-${shift.shift_id}`}
                  value={`${shift.shift_id}`}
                >
                  {shift.shift_name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Days of week checkbox set */}
      <Label className="col-span-full">Off Days</Label>
      <div className="flex gap-2">
        <Checkbox
          id={`sunday-checkbox`}
          key={`sunday-${data?.sunday ?? 0}`}
          name="sunday"
          disabled={disabled || readOnly}
          defaultChecked={data?.sunday == 1 ? true : false}
        />
        <Label htmlFor={`sunday-checkbox`}>Sunday</Label>
      </div>

      <div className="flex gap-2">
        <Checkbox
          id={`monday-checkbox`}
          key={`monday-${data?.monday ?? 0}`}
          name="monday"
          disabled={disabled || readOnly}
          defaultChecked={data?.monday == 1 ? true : false}
        />
        <Label htmlFor={`monday-checkbox`}>Monday</Label>
      </div>

      <div className="flex gap-2">
        <Checkbox
          id={`tuesday-checkbox`}
          key={`tuesday-${data?.tuesday ?? 0}`}
          name="tuesday"
          disabled={disabled || readOnly}
          defaultChecked={data?.tuesday == 1 ? true : false}
        />
        <Label htmlFor={`tuesday-checkbox`}>Tuesday</Label>
      </div>

      <div className="flex gap-2">
        <Checkbox
          id={`wednesday-checkbox`}
          key={`wednesday-${data?.wednesday ?? 0}`}
          name="wednesday"
          disabled={disabled || readOnly}
          defaultChecked={data?.wednesday == 1 ? true : false}
        />
        <Label htmlFor={`wednesday-checkbox`}>Wednesday</Label>
      </div>

      <div className="flex gap-2">
        <Checkbox
          id={`thursday-checkbox`}
          key={`thursday-${data?.thursday ?? 0}`}
          name="thursday"
          disabled={disabled || readOnly}
          defaultChecked={data?.thursday == 1 ? true : false}
        />
        <Label htmlFor={`thursday-checkbox`}>Thursday</Label>
      </div>

      <div className="flex gap-2">
        <Checkbox
          id={`friday-checkbox`}
          key={`friday-${data?.friday ?? 0}`}
          name="friday"
          disabled={disabled || readOnly}
          defaultChecked={data?.friday == 1 ? true : false}
        />
        <Label htmlFor={`friday-checkbox`}>Friday</Label>
      </div>

      <div className="flex gap-2">
        <Checkbox
          id={`saturday-checkbox`}
          key={`saturday-${data?.saturday ?? 0}`}
          name="saturday"
          disabled={disabled || readOnly}
          defaultChecked={data?.saturday == 1 ? true : false}
        />
        <Label htmlFor={`saturday-checkbox`}>Saturday</Label>
      </div>
    </>
  );
}
