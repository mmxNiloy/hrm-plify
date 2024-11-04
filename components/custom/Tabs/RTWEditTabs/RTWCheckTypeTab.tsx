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

export default function RTWCheckTypeTab() {
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
            selectedEmployee
              ? getFullNameOfEmployee(selectedEmployee)
              : undefined
          }
          placeholder="Selected Employee"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Date of Check</Label>
        <Input type="date" readOnly value={dateOfCheck} />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Date of Joining/Hiring</Label>
        <Input
          type="date"
          readOnly
          defaultValue={getSelectedEmployeesDateOfJoining()}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label className={RequiredAsterisk}>Type of Check</Label>
        <RadioGroup name="type_of_check" defaultValue="initial-check">
          <div className="flex gap-2 items-center">
            <RadioGroupItem value="initial-check" />
            <Label>Initial check before employment</Label>
          </div>

          <div className="flex gap-2 items-center">
            <RadioGroupItem value="follow-up-check" />

            <Label>Follow-up Check on an employee</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex flex-col gap-2">
        <Label className={RequiredAsterisk}>Medium of Check</Label>
        <RadioGroup
          required
          name="type_of_check"
          defaultValue="in-person-check"
        >
          <div className="flex gap-2 items-center">
            <RadioGroupItem value="in-person-check" />
            <Label>In-person manual check with original documents</Label>
          </div>

          <div className="flex gap-2 items-center">
            <RadioGroupItem value="online-check" />

            <Label>Online right to work check</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex flex-col gap-2">
        <Label className={RequiredAsterisk}>Evidence Presented</Label>
        <Select required name="evidence_presented">
          <SelectTrigger>
            <SelectValue placeholder="Select an Option" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Evidence Presented</SelectLabel>
              <SelectItem value="correspondance">
                Proof of Correspondance Address
              </SelectItem>
              <SelectItem value="passport">Passport Document</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label className={RequiredAsterisk}>Time of Check</Label>
        <Input type="time" name="time_of_check" required />
      </div>
    </div>
  );
}
