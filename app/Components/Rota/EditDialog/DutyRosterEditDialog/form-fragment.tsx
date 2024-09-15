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
import { IDutyRoster } from "@/schema/RotaSchema";
import { RequiredAsterisk } from "@/styles/label.tailwind";
import { toYYYYMMDD } from "@/utils/Misc";
import { IFormFragmentProps } from "@/utils/Types";
import React from "react";

interface Props extends IFormFragmentProps<IDutyRoster> {
  showEmployee?: boolean;
}

export default function DutyRosterFormFragment({
  data,
  readOnly,
  disabled,
  showEmployee,
}: Props) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <Label className={readOnly ? "" : RequiredAsterisk}>Department</Label>
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
        <Label className={readOnly ? "" : RequiredAsterisk}>Designation</Label>
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

      {showEmployee && (
        <div className="flex flex-col gap-2">
          <Label className={readOnly ? "" : RequiredAsterisk}>Employee</Label>
          <Select
            required
            defaultValue={`${data?.employee.employee_id ?? ""}`}
            name="employee_id"
            disabled={disabled || readOnly}
          >
            <SelectTrigger>
              <SelectValue placeholder={"Select an Employee"} />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select an Employee</SelectLabel>

                <SelectItem value="1">Employee 1</SelectItem>
                <SelectItem value="2">Employee 2</SelectItem>
                <SelectItem value="3">Employee 3</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <Label
          className={readOnly ? "" : RequiredAsterisk}
          htmlFor="from-date-input"
        >
          From Date
        </Label>
        <Input
          id={"from-date-input"}
          required
          readOnly={readOnly}
          disabled={disabled}
          type="date"
          key={`from-date-${data?.from_date}`}
          name="from_date"
          defaultValue={data?.from_date ? toYYYYMMDD(data?.from_date) : ""}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label
          className={readOnly ? "" : RequiredAsterisk}
          htmlFor="to-date-input"
        >
          To Date
        </Label>
        <Input
          id={"to-date-input"}
          required
          readOnly={readOnly}
          disabled={disabled}
          type="date"
          key={`to-date-${data?.to_date}`}
          name="to_date"
          defaultValue={data?.to_date ? toYYYYMMDD(data?.to_date) : ""}
        />
      </div>
    </>
  );
}
