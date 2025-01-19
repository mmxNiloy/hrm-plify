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
import { IJobListing } from "@/schema/JobSchema";
import { getFullNameOfUser } from "@/utils/Misc";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useState } from "react";

export default function CompanyEmployeeSelect({
  employees,
}: {
  employees: IEmployeeWithUserMetadata[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleJobChange = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("page");
      params.delete("limit");

      if (value === "all") params.delete("employee_id");
      else {
        params.append("employee_id", value);
      }

      router.push(`?${params.toString()}`);
    },
    [router, searchParams]
  );
  return (
    <div className="flex flex-col gap-2">
      <Label>Selected Employee(s)</Label>
      <Select
        defaultValue={searchParams.get("job_id") ?? "all"}
        onValueChange={handleJobChange}
      >
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Select a Job" />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectLabel>Select a job</SelectLabel>
            <SelectItem value="all">All Jobs</SelectItem>
            {employees.map((item) => (
              <SelectItem
                value={`${item.employee_id}`}
                key={`company-employee-${item.employee_id}`}
              >
                {item.designations?.designation_name &&
                  `(${item.designations.designation_name}) - `}
                {getFullNameOfUser(item.user)}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
