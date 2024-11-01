"use client";
import { MultiSelect } from "@/components/custom/Multiselect";
import { LabelledComboBox } from "@/components/ui/combobox";
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
import { IEmployeeWithUserMetadata } from "@/schema/EmployeeSchema";
import { IHoliday, IHolidayType } from "@/schema/HolidaySchema";
import { ISalaryStructure } from "@/schema/Payroll";
import { RequiredAsterisk } from "@/styles/label.tailwind";
import {
  dateDiffInDays,
  getFullNameOfEmployee,
  toYYYYMMDD,
  weekDays,
} from "@/utils/Misc";
import { IFormFragmentProps } from "@/utils/Types";
import React, { useState } from "react";

interface Props extends IFormFragmentProps<ISalaryStructure> {
  asEditable?: boolean;
  employees?: IEmployeeWithUserMetadata[];
  onEmployeesSelectChange?: (employees: string[]) => void;
  currentEmployee?: number;
}

export default function SalaryStructureFormFragment({
  data,
  readOnly,
  disabled,
  asEditable = false,
  employees = [],
  onEmployeesSelectChange: onEmployeesSelect,
  currentEmployee,
}: Props) {
  return (
    <>
      <div className="flex flex-col gap-2 col-span-full w-full">
        <Label className={RequiredAsterisk}>Employee</Label>
        <MultiSelect
          disabled={disabled || readOnly || asEditable}
          defaultValue={
            data
              ? [`${data.employee_id}`]
              : currentEmployee
              ? [`${currentEmployee}`]
              : []
          }
          onValueChange={(emps) => {
            if (onEmployeesSelect) {
              onEmployeesSelect(emps);
            }
          }}
          contentClassName="min-w-96"
          key={"employees-multiselect"}
          placeholder="Select Employees"
          options={employees.map((item: IEmployeeWithUserMetadata) => ({
            label: `(${item.employee_code}) - ${getFullNameOfEmployee(item)}`,
            value: `${item.employee_id}`,
          }))}
        />
      </div>

      <div className="flex flex-col gap-2 col-span-full">
        <Label className={RequiredAsterisk}>Basic Salary</Label>
        <Input
          key={`basic-salary-${data?.basic_salary}`}
          defaultValue={data?.basic_salary ?? 0}
          min={0}
          name="basic_salary"
          type="number"
          placeholder="Basic Salary"
          required
          readOnly={readOnly}
          disabled={disabled}
        />
      </div>

      <div className="flex flex-col gap-2 col-span-full">
        <Label className={RequiredAsterisk}>House Allowance</Label>
        <Input
          key={`house-allowance-${data?.house_allowance}`}
          defaultValue={data?.house_allowance ?? 0}
          min={0}
          name="house_allowance"
          type="number"
          placeholder="House Allowance"
          required
          readOnly={readOnly}
          disabled={disabled}
        />
      </div>

      <div className="flex flex-col gap-2 col-span-full">
        <Label className={RequiredAsterisk}>Medical Allowance</Label>
        <Input
          key={`medical-allowance-${data?.medical_allowance}`}
          defaultValue={data?.medical_allowance ?? 0}
          min={0}
          name="medical_allowance"
          type="number"
          placeholder="Medical Allowance"
          required
          readOnly={readOnly}
          disabled={disabled}
        />
      </div>

      <div className="flex flex-col gap-2 col-span-full">
        <Label className={RequiredAsterisk}>Transport Allowance</Label>
        <Input
          key={`transport-allowance-${data?.transport_allowance}`}
          defaultValue={data?.transport_allowance ?? 0}
          min={0}
          name="transport_allowance"
          type="number"
          placeholder="Transport Allowance"
          required
          readOnly={readOnly}
          disabled={disabled}
        />
      </div>
    </>
  );
}
