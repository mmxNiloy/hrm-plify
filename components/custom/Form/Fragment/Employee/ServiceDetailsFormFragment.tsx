import DepartmentSelect from "@/app/Components/Department/DepartmentSelect";
import DesignationSelect from "@/app/Components/Department/DesignationSelect";
import { SelectSkeleton } from "@/app/Components/Department/SelectSkeleton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IEmployeeWithPersonalInfo } from "@/schema/EmployeeSchema";
import { toYYYYMMDD } from "@/utils/Misc";
import { IFormFragmentProps } from "@/utils/Types";
import React, { Suspense } from "react";
import CompanyNameInput from "../../../Input/CompanyNameInput";
import CompanyNameSkeleton from "../../../Input/CompanyNameSkeleton";

export default function ServiceDetailsFormFragment({
  data,
  readOnly,
  disabled,
}: IFormFragmentProps<IEmployeeWithPersonalInfo>) {
  return (
    <>
      <Suspense fallback={<CompanyNameSkeleton />}>
        <CompanyNameInput
          readOnly={readOnly}
          disabled={disabled}
          company_id={data?.company_id ?? 0}
        />
      </Suspense>

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

      {/* Empty cell */}
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

      <Suspense fallback={<SelectSkeleton label="Department" />}>
        <DepartmentSelect
          key={`department-${data?.department_id}`}
          company_id={data?.company_id ?? 0}
          required
          disabled={disabled || readOnly}
          defaultValue={`${data?.department_id ?? ""}`}
        />
      </Suspense>

      <Suspense fallback={<SelectSkeleton label="Designation" />}>
        <DesignationSelect
          key={`designation-${data?.designation_id}`}
          company_id={data?.company_id ?? 0}
          required
          disabled={readOnly || disabled}
          defaultValue={`${data?.designation_id ?? ""}`}
        />
      </Suspense>

      <div className="flex flex-col gap-2">
        <Label>Employment Type</Label>
        <Select
          disabled={disabled || readOnly}
          defaultValue={`${data?.employment_type ?? ""}`}
          name="employment_type"
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Employment Type" />
          </SelectTrigger>

          {/* TODO: Add support for employment type here */}
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="date-of-joining-input">Date of Joining</Label>
        <Input
          key={`date-of-joining-${data?.date_of_joining}`}
          defaultValue={toYYYYMMDD(
            data?.date_of_joining ? new Date(data.date_of_joining) : undefined
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
              ? new Date(data.contract_end_date)
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
