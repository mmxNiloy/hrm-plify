"use client";
import { LabelledComboBox } from "@/components/ui/combobox";
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
    <LabelledComboBox
      className={className}
      onValueChange={(val) => setEmployeeQuery(Number.parseInt(val))}
      defaultValue={employeeQuery.toString()}
      items={employees.map((emp) => ({
        value: emp.employee_id.toString(),
        label: getFullNameOfEmployee(emp),
      }))}
      label="Select an employee"
    />
  );
}
