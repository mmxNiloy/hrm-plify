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
import { cn } from "@/lib/utils";
import { IEmployeeWithPersonalInfo } from "@/schema/EmployeeSchema";
import { toYYYYMMDD } from "@/utils/Misc";
import { IFormFragmentProps } from "@/utils/Types";
import React from "react";
import { ICompany, IDepartment } from "@/schema/CompanySchema";
import { IDesignation } from "@/schema/DesignationSchema";
import { IEmploymentType } from "@/schema/EmploymentTypeSchema";

interface Props extends IFormFragmentProps<IEmployeeWithPersonalInfo> {
  departments: IDepartment[];
  designations: IDesignation[];
  company?: ICompany;
  employmentTypes: IEmploymentType[];
}

export default function ServiceDetailsFormFragmentClient({
  data,
  readOnly,
  disabled,
  designations,
  departments,
  employmentTypes,
  company,
}: Props) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <Label>Company</Label>
        <Input
          readOnly
          value={company?.company_name ?? ""}
          placeholder="Company Name"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="employee-code-input">Employee Code</Label>
        <Input
          defaultValue={data?.employee_code ?? ""}
          name="employee_code"
          placeholder="Employee Code"
          id="employee-code-input"
          required
          readOnly
          disabled
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="job-title-input">Job Title</Label>
        <Input
          key={`job-title-${data?.job_title}`}
          defaultValue={data?.job_title ?? ""}
          name="job_title"
          placeholder="Job Title"
          id="job-title-input"
          readOnly={readOnly}
          disabled={disabled}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label
          className={cn(
            readOnly ? "" : "after:content-['*'] after:ml-1 after:text-red-500"
          )}
        >
          Department
        </Label>
        <Select
          key={`${data?.department_id ?? "0"}`}
          disabled={disabled}
          defaultValue={`${data?.department_id ?? "0"}`}
          required
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
        <Label
          className={cn(
            readOnly ? "" : "after:content-['*'] after:ml-1 after:text-red-500"
          )}
        >
          Designation
        </Label>
        <Select
          key={`designation-${data?.designation_id}`}
          disabled={disabled}
          defaultValue={`${data?.designation_id ?? "0"}`}
          required
          name="designation_id"
        >
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

      <div className="flex flex-col gap-2">
        <Label>Employment Type</Label>
        <Select
          disabled={disabled || readOnly}
          defaultValue={`${data?.employment_type?.emp_type_id ?? ""}`}
          name="emp_type_id"
        >
          <SelectTrigger>
            <SelectValue placeholder="Select an Employment Type" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select an employment type</SelectLabel>

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
        <Label htmlFor="date-of-joining-input">Date of Joining</Label>
        <Input
          key={`date-of-joining-${data?.date_of_joining}`}
          defaultValue={toYYYYMMDD(
            data?.date_of_joining ? new Date(data?.date_of_joining) : undefined
          )}
          name="date_of_joining"
          placeholder="Date of Joining"
          id="date-of-joining-input"
          type="date"
          readOnly={readOnly}
          disabled={disabled}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="date-of-confirmation-input">Date of Confirmation</Label>
        <Input
          key={`date-of-confirmation-${data?.date_of_confirmaton}`}
          defaultValue={toYYYYMMDD(
            data?.date_of_confirmaton
              ? new Date(data.date_of_confirmaton)
              : undefined
          )}
          name="date_of_confirmaton"
          placeholder="Date of Confirmation"
          id="date-of-confirmation-input"
          type="date"
          readOnly={readOnly}
          disabled={disabled}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="contract-start-date-input">Contract Start Date</Label>
        <Input
          key={`contract-start-date-${data?.contract_start_date}`}
          defaultValue={toYYYYMMDD(
            data?.contract_start_date
              ? new Date(data.contract_start_date)
              : undefined
          )}
          name="contract_start_date"
          placeholder="Contract Start Date"
          id="contract-start-date-input"
          type="date"
          readOnly={readOnly}
          disabled={disabled}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="contract-end-date-input">
          Contract End Date (if applicable)
        </Label>
        <Input
          key={`contract-end-date-${data?.contract_end_date}`}
          defaultValue={toYYYYMMDD(
            data?.contract_end_date
              ? new Date(data?.contract_end_date)
              : undefined
          )}
          name="contract_end_date"
          placeholder="Contract End Date"
          id="contract-end-date-input"
          type="date"
          readOnly={readOnly}
          disabled={disabled}
        />
      </div>
    </>
  );
}
