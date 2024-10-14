"use server";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ICompany } from "@/schema/CompanySchema";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import React from "react";

export default async function CompanyNameInput({
  company_id,
  disabled,
  required,
  readOnly,
}: {
  company_id: number;
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
}) {
  // Get company information
  const session = cookies().get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";
  const user = JSON.parse(
    cookies().get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  var company: ICompany | undefined;
  try {
    const dptRes = await fetch(
      `${process.env.API_BASE_URL}/companies/${company_id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session}`,
        },
      }
    );

    company = (await dptRes.json()) as ICompany;
  } catch (err) {
    console.error("Failed to get company info", err);
    company = undefined;
  }
  return (
    <div className="flex flex-col gap-2">
      <Label
        className={cn(
          readOnly ? "" : "after:content-['*'] after:text-red-500 after:ml-1"
        )}
        htmlFor="company-input"
      >
        Company
      </Label>

      <Input
        className="hidden"
        defaultValue={company_id}
        name="company_id"
        placeholder="Company"
        id="company-input"
        required
        readOnly
        disabled
      />

      <Input
        key={`company-${company_id}-${company?.company_name}`}
        defaultValue={company?.company_name ?? "Company Not Found"}
        name="company_name"
        placeholder="Company Name"
        id="company-input"
        required={required}
        readOnly={readOnly}
        disabled={disabled}
      />
    </div>
  );
}
