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
import { IDepartment } from "@/schema/CompanySchema";
import { IDesignation } from "@/schema/DesignationSchema";
import { RequiredAsterisk } from "@/styles/label.tailwind";
import { IFormFragmentProps } from "@/utils/Types";
import React from "react";

export default function EmployeeOnboardingFormFragment({
  departments,
  designations,
}: {
  departments: IDepartment[];
  designations: IDesignation[];
}) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <Label className={RequiredAsterisk} htmlFor="email-input">
          Email
        </Label>
        <Input
          required
          id="email-input"
          name="email"
          type="email"
          placeholder="Email"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label className={RequiredAsterisk} htmlFor="first-name-input">
          First Name
        </Label>
        <Input
          required
          id="first-name-input"
          name="fname"
          placeholder="First Name"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label className={RequiredAsterisk} htmlFor="middle-name-input">
          Middle Name
        </Label>
        <Input
          required
          id="middle-name-input"
          name="middleName"
          placeholder="Middle Name"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label className={RequiredAsterisk} htmlFor="last-name-input">
          Last Name
        </Label>
        <Input
          required
          id="last-name-input"
          name="lname"
          placeholder="Last Name"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label className={RequiredAsterisk}>Department</Label>
        <Select required name="department_id">
          <SelectTrigger>
            <SelectValue placeholder="Select a Department" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select a department</SelectLabel>

              {departments.map((dpt) => (
                <SelectItem
                  value={`${dpt.department_id}`}
                  key={`${dpt.department_id}`}
                >
                  {dpt.dpt_name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <Label className={RequiredAsterisk}>Designation</Label>
        <Select required name="designation_id">
          <SelectTrigger>
            <SelectValue placeholder="Select a Designation" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select a designation</SelectLabel>

              {designations.map((dsg) => (
                <SelectItem
                  value={`${dsg.designation_id}`}
                  key={`${dsg.designation_id}`}
                >
                  {dsg.designation_name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
