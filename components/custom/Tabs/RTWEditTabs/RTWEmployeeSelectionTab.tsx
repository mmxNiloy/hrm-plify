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
import { IRightToWork } from "@/schema/RightToWork";
import { IFormFragmentProps } from "@/utils/Types";

interface Props extends IFormFragmentProps<IRightToWork> {
  employees: IEmployeeWithUserMetadata[];
}

export default function RTWEmployeeSelectionTab({
  employees,
  readOnly = false,
  data,
}: Props) {
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
          disabled={readOnly}
          defaultValue={data ? `${data.employee_id}` : undefined}
          onValueChange={(e) => {
            setSelectedEmp(e);
            setSelectedEmployee(
              employees.find((emp) => `${emp.employee_id}` === e)
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
          defaultValue={
            data && data.employee
              ? toYYYYMMDD(
                  new Date(
                    data.employee.date_of_joining ??
                      data.employee.hire_date ??
                      new Date()
                  )
                )
              : getSelectedEmployeesDateOfJoining()
          }
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label className={RequiredAsterisk}>Date of Check</Label>
        <Input
          name="date_of_check"
          type="date"
          required
          readOnly={readOnly}
          defaultValue={
            data
              ? toYYYYMMDD(new Date(data.date_of_check ?? new Date()))
              : undefined
          }
          onChange={(e) => setDateOfCheck(e.target.value)}
        />
      </div>
    </div>
  );
}
