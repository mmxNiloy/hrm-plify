"use server";
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
  const session = cookies().get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";
  const user = JSON.parse(
    cookies().get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  // Find department here
  var departments: IDepartment[] = [];
  //   var designations: IDesignation[] = [];
  try {
    const dptRes = await fetch(
      `${process.env.API_BASE_URL}/company/operation/get-all-departments/${company_id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session}`,
        },
      }
    );

    const dptData = (await dptRes.json()) as IDepartment[];
    departments = dptData;

    // const dsgRes = await fetch(
    //   `${process.env.API_BASE_URL}/company/operation/get-designation/${company_id}`,
    //   {
    //     method: "GET",
    //     headers: {
    //       Authorization: `Bearer ${session}`,
    //     },
    //   }
    // );

    // const dsgData = (await dsgRes.json()) as { data: IDesignation[] };
    // designations = dsgData.data;
  } catch (err) {
    console.error("Failed to get departments", err);
    departments = [];
    // designations = [];
  }
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
  );
}
