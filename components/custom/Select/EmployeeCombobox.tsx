"use client";
import { LabelledComboBox } from "@/components/ui/combobox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IEmployeeWithUserMetadata } from "@/schema/EmployeeSchema";
import { getFullNameOfEmployee } from "@/utils/Misc";
import { searchParamsParsers } from "@/utils/searchParamsParsers";
import { useQueryState } from "nuqs";
import React from "react";

interface IEmployeeComboboxProps {
  employees: IEmployeeWithUserMetadata[];
  className?: string;
}

export default function EmployeeCombobox({
  employees,
  className,
}: IEmployeeComboboxProps) {
  const [employeeQuery, setEmployeeQuery] = useQueryState(
    "employee",
    searchParamsParsers.employee.withDefault(0).withOptions({
      shallow: false,
      throttleMs: 500,
    })
  );

  return (
    <Select
      value={employeeQuery?.toString()}
      onValueChange={(val) => setEmployeeQuery(Number.parseInt(val))}
    >
      <SelectTrigger className="w-44">
        <SelectValue defaultValue="Select Employee" className={className} />
      </SelectTrigger>
      <SelectContent>
        {employees.length < 1 ? (
          <SelectItem value="0" disabled>
            No Results
          </SelectItem>
        ) : (
          <SelectItem value="0" disabled>
            Select Employee
          </SelectItem>
        )}
        {employees.map((employee) => (
          <SelectItem
            key={employee.employee_id}
            value={employee.employee_id.toString()}
            className="capitalize"
          >
            {getFullNameOfEmployee(employee)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
