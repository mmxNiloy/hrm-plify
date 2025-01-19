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
import { IDesignation } from "@/schema/DesignationSchema";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import React from "react";

export default async function DesignationSelect({
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

  const companyExtraData = await getCompanyExtraData(company_id);
  return (
    <div className="flex flex-col gap-2">
      <Label>Designation</Label>
      <Select
        disabled={disabled}
        defaultValue={defaultValue ?? ""}
        required={required}
        name="designation_id"
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a Designation" />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectLabel>Select a designation</SelectLabel>

            {companyExtraData.data?.designations.map((dsg) => (
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
  );
}
