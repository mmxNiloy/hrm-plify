"use server";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
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
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  const company = await getCompanyData(company_id);
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
        key={`company-${company_id}-${company.data?.company_name}`}
        defaultValue={company.data?.company_name ?? "Company Not Found"}
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
