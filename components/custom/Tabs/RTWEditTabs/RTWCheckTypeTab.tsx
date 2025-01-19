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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { IRightToWork } from "@/schema/RightToWork";
import { IFormFragmentProps } from "@/utils/Types";

export default function RTWCheckTypeTab({
  data,
  readOnly,
}: IFormFragmentProps<IRightToWork>) {
  const { selectedEmployee, setSelectedEmployee, dateOfCheck } =
    useContext(RTWFormContext);
  const getSelectedEmployeesDateOfJoining = useCallback(() => {
    return toYYYYMMDD(
      new Date(
        selectedEmployee?.hire_date ??
          selectedEmployee?.date_of_joining ??
          new Date()
      )
    );
  }, [selectedEmployee?.date_of_joining, selectedEmployee?.hire_date]);

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-full flex flex-col gap-2">
        <Label>Employee</Label>
        <Input
          name="employee_name"
          readOnly
          defaultValue={
            data && data.employee
              ? getFullNameOfEmployee(data.employee)
              : selectedEmployee
              ? getFullNameOfEmployee(selectedEmployee)
              : undefined
          }
          placeholder="Selected Employee"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Date of Check</Label>
        <Input
          type="date"
          readOnly
          value={dateOfCheck ?? data?.date_of_check}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Date of Joining/Hiring</Label>
        <Input
          type="date"
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
        <Label className={RequiredAsterisk}>Type of Check</Label>
        <RadioGroup
          disabled={readOnly}
          name="type_of_check"
          defaultValue={data?.type_of_check ?? "initial-check"}
        >
          <div className="flex gap-2 items-center">
            <RadioGroupItem id="radio-init-check" value="initial-check" />
            <Label htmlFor="radio-init-check">
              Initial check before employment
            </Label>
          </div>

          <div className="flex gap-2 items-center">
            <RadioGroupItem id="radio-followup-check" value="follow-up-check" />
            <Label htmlFor="radio-followup-check">
              Follow-up Check on an employee
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex flex-col gap-2">
        <Label className={RequiredAsterisk}>Medium of Check</Label>
        <RadioGroup
          required
          disabled={readOnly}
          name="medium_of_check"
          defaultValue={data?.medium_of_check ?? "in-person-check"}
        >
          <div className="flex gap-2 items-center">
            <RadioGroupItem
              id="radio-in-person-check"
              value="in-person-check"
            />
            <Label htmlFor="radio-in-person-check">
              In-person manual check with original documents
            </Label>
          </div>

          <div className="flex gap-2 items-center">
            <RadioGroupItem id="radio-online-check" value="online-check" />
            <Label htmlFor="radio-online-check">
              Online right to work check
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex flex-col gap-2">
        <Label className={RequiredAsterisk}>Evidence Presented</Label>
        <Select
          required
          disabled={readOnly}
          defaultValue={data?.evidence_presented}
          name="evidence_presented"
        >
          <SelectTrigger>
            <SelectValue placeholder="Select an Option" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Evidence Presented</SelectLabel>
              <SelectItem value="proof_of_address">
                Proof of Correspondance Address
              </SelectItem>
              <SelectItem value="passport">Passport Document</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label className={RequiredAsterisk}>Time of Check</Label>
        <Input
          type="time"
          readOnly={readOnly}
          name="time_of_check"
          required
          defaultValue={data?.time_of_check}
        />
      </div>
    </div>
  );
}
