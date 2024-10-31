"use client";
import { MonthPicker } from "@/components/custom/DatePicker/MonthPicker";
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
import { IPayroll, ISalaryStructure } from "@/schema/Payroll";
import { RequiredAsterisk } from "@/styles/label.tailwind";
import {
  dateDiffInDays,
  getFullNameOfEmployee,
  toYYYYMMDD,
  weekDays,
} from "@/utils/Misc";
import { IFormFragmentProps } from "@/utils/Types";
import React, { useState } from "react";

interface Props extends IFormFragmentProps<IPayroll> {
  asEditable?: boolean;
  employees?: IEmployeeWithUserMetadata[];
  onEmployeesSelectChange?: (employees: string[]) => void;
}

export default function PayrollFormFragment({
  data,
  readOnly,
  disabled,
  asEditable = false,
  employees = [],
  onEmployeesSelectChange: onEmployeesSelect,
}: Props) {
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  return (
    <>
      <div className="flex flex-col gap-2 col-span-full w-full">
        <Label className={RequiredAsterisk}>Employee</Label>
        <MultiSelect
          disabled={disabled || readOnly || asEditable}
          defaultValue={data ? [`${data.employee_id}`] : []}
          onValueChange={(emps) => {
            if (onEmployeesSelect) {
              onEmployeesSelect(emps);
              setSelectedEmployees(emps);
            }
          }}
          contentClassName="min-w-96"
          key={"employees-multiselect"}
          placeholder="Select Employees"
          options={employees.map((item: IEmployeeWithUserMetadata) => ({
            label: getFullNameOfEmployee(item),
            value: `${item.employee_id}`,
          }))}
        />
      </div>

      <div className="flex flex-col gap-2 col-span-1">
        <Label className={RequiredAsterisk}>Pay Period</Label>
        <MonthPicker
          defaultValue={data ? toYYYYMMDD(data.pay_period) : undefined}
          name="pay_period"
          disabled={disabled}
          key={`pay-period-${data?.pay_period}`}
        />
      </div>

      {/* <div className="flex flex-col gap-2 col-span-full">
        <Label className={RequiredAsterisk}>House Allowance</Label>
        <Input
          key={`basic-salary-${data?.house_allowance}`}
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
          key={`basic-salary-${data?.medical_allowance}`}
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
          key={`basic-salary-${data?.transport_allowance}`}
          defaultValue={data?.transport_allowance ?? 0}
          min={0}
          name="transport_allowance"
          type="number"
          placeholder="Transport Allowance"
          required
          readOnly={readOnly}
          disabled={disabled}
        />
      </div> */}
    </>
  );
}
