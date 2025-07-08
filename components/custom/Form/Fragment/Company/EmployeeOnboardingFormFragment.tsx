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
import { IEmploymentType } from "@/schema/EmploymentTypeSchema";
import { IJobApplicant } from "@/schema/JobSchema";
import { RequiredAsterisk } from "@/styles/label.tailwind";
import React, { useCallback, useState } from "react";

interface Props {
  departments: IDepartment[];
  designations: IDesignation[];
  data?: IJobApplicant;
  employmentTypes: IEmploymentType[];
}

export default function EmployeeOnboardingFormFragment({
  departments,
  designations,
  data,
  employmentTypes,
}: Props) {
  const [filteredDesignations, setFilteredDesignations] =
    useState<IDesignation[]>(designations);

  const onDepartmentChange = useCallback(
    (dept_id: string) => {
      if (dept_id.length < 1) setFilteredDesignations(designations);
      else {
        setFilteredDesignations(
          designations.filter((item) => `${item.dept_id}` === dept_id)
        );
      }
    },
    [designations]
  );
  return (
    <>
      <div className="flex flex-col gap-2 col-span-full">
        <Label className={RequiredAsterisk} htmlFor="email-input">
          Email
        </Label>
        <Input
          required
          id="email-input"
          name="email"
          type="email"
          placeholder="Email"
          defaultValue={data?.email}
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
          defaultValue={data?.first_name}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="middle-name-input">Middle Name</Label>
        <Input
          required
          id="middle-name-input"
          name="middleName"
          placeholder="Middle Name"
          defaultValue={data?.middle_name}
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
          defaultValue={data?.last_name}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Employment Type</Label>
        <Select name="emp_type_id">
          <SelectTrigger>
            <SelectValue placeholder="Select an Employment Type" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select an employment type</SelectLabel>
              {/* Employment type items go here */}
              {employmentTypes.map((item) => (
                <SelectItem
                  value={`${item.emp_type_id}`}
                  key={`emp-type-option-${item.emp_type_id}`}
                >
                  {item.employment_type}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label className={RequiredAsterisk}>Department</Label>
        <Select
          required
          defaultValue={
            data?.job?.department?.department_id
              ? `${data.job.department.department_id}`
              : undefined
          }
          onValueChange={onDepartmentChange}
          name="department_id"
        >
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
        <Select
          required
          defaultValue={
            data?.job?.designation?.designation_id
              ? `${data.job.designation.designation_id}`
              : undefined
          }
          name="designation_id"
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a Designation" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select a designation</SelectLabel>

              {filteredDesignations.map((dsg) => (
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
