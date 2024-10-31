"use server";
import { getCompanyExtraData } from "@/app/(server)/actions/getCompanyExtraData";
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
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import React from "react";

export default async function DepartmentSelect({
  company_id,
  disabled,
  defaultValue,
  required,
}: {
  company_id: number;
  disabled?: boolean;
  defaultValue?: string;
  required?: boolean;
}) {
  // Get company information
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  // Find department here
  const companyExtraData = await getCompanyExtraData(company_id);
  return (
    <div className="flex flex-col gap-2">
      <Label>Department</Label>
      <Select
        disabled={disabled}
        defaultValue={defaultValue ?? ""}
        required={required}
        name="department_id"
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a Department" />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectLabel>Select a department</SelectLabel>

            {companyExtraData.data?.departments.map((dpt) => (
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
  );
}
