"use client";
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
import { IEmployeeWithUserMetadata } from "@/schema/EmployeeSchema";
import { RequiredAsterisk } from "@/styles/label.tailwind";
import {
  getFullNameOfEmployee,
  getFullNameOfUser,
  toYYYYMMDD,
} from "@/utils/Misc";
import React, { useCallback, useContext, useState } from "react";
import { DatePicker } from "../../DatePicker/DatePicker";
import { ICompanyUser } from "@/schema/UserSchema";
import { Input } from "@/components/ui/input";
import RTWFormContext from "@/context/RTWFormContext";

export default function RTWEmployeeSelectionTab({
  employees,
}: {
  employees: IEmployeeWithUserMetadata[];
}) {
  const { setSelectedEmployee, setDateOfCheck } = useContext(RTWFormContext);
  const [selectedEmp, setSelectedEmp] = useState<string | undefined>(undefined);

  const getSelectedEmployeesDateOfJoining = useCallback(() => {
    const emp = employees.find((emp) => `${emp.employee_id}` === selectedEmp);
    if (!emp) return "";
    return toYYYYMMDD(
      new Date(emp.hire_date ?? emp.date_of_joining ?? new Date())
    );
  }, [employees, selectedEmp]);

  return (
    <div className="flex flex-col gap-4">
      {/* Employee select */}
      <div className="flex flex-col gap-2">
        <Label className={RequiredAsterisk}>Employee</Label>
        <Select
          required
          name="employee_id"
          onValueChange={(e) => {
            setSelectedEmp(e);
            setSelectedEmployee(
              employees.find((emp) => `${emp.employee_id}` === selectedEmp)
            );
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select an Employee" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select an Employee</SelectLabel>
              {employees.map((emp) => (
                <SelectItem
                  value={`${emp.employee_id}`}
                  key={`rtw-employee-select-${emp.employee_id}`}
                >
                  {getFullNameOfEmployee(emp)}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label>Date of Hire/Joining</Label>
        <Input
          type="date"
          key={`selected-employee-${selectedEmp}-joining-date`}
          readOnly
          defaultValue={getSelectedEmployeesDateOfJoining()}
          onChange={(e) => setDateOfCheck(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label className={RequiredAsterisk}>Date of Check</Label>
        <Input name="date_of_check" type="date" required />
      </div>
    </div>
  );
}
