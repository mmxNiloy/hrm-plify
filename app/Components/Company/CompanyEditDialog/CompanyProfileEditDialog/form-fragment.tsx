import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ICompany } from "@/schema/CompanySchema";
import { IFormFragmentProps } from "@/utils/Types";
import React from "react";

export default function CompanyProfileFormFragment({
  data,
  readOnly,
  disabled,
}: IFormFragmentProps<ICompany>) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <Label htmlFor="company-name-input">Company Name</Label>
        <Input
          disabled={disabled}
          readOnly={readOnly}
          defaultValue={data?.company_name ?? ""}
          id="company-name-input"
          name="company_name"
          placeholder="Company Name"
          className="rounded-full"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="industry-input">Industry</Label>
        <Input
          disabled={disabled}
          readOnly={readOnly}
          defaultValue={data?.industry ?? ""}
          id="industry-input"
          name="industry"
          placeholder="Industry"
          className="rounded-full"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="headquarters-input">Headquarters</Label>
        <Input
          disabled={disabled}
          readOnly={readOnly}
          defaultValue={data?.headquarters ?? ""}
          id="headquarters-input"
          name="headquarters"
          placeholder="Headquarters"
          className="rounded-full"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="contact-number-input">Contact Number</Label>
        <Input
          disabled={disabled}
          readOnly={readOnly}
          defaultValue={data?.contact_number ?? ""}
          id="contact-number-input"
          type="tel"
          name="contact_number"
          placeholder="Contact Number"
          className="rounded-full"
        />
      </div>

      <div className="flex flex-row gap-4 items-center justify-between">
        <div className="flex-grow flex flex-col gap-2">
          <Label htmlFor="founded-year-input">Founded Year</Label>
          <Input
            disabled={disabled}
            readOnly={readOnly}
            defaultValue={data?.founded_year ?? ""}
            id="founded-year-input"
            type="number"
            max={new Date().getFullYear()}
            min={0}
            name="founded_year"
            placeholder="Founded Year"
            className="rounded-full"
          />
        </div>

        <div className="flex-grow flex flex-col gap-2">
          <Label htmlFor="website-input">Website</Label>
          <Input
            disabled={disabled}
            readOnly={readOnly}
            defaultValue={data?.website ?? ""}
            id="website-input"
            type="url"
            name="website"
            placeholder="Website"
            className="rounded-full"
          />
        </div>
      </div>

      {/* TODO: Replace logo with a file/image picker here */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="logo-input">Logo</Label>
        <Input
          disabled={disabled}
          readOnly={readOnly}
          defaultValue={data?.logo ?? ""}
          id="logo-input"
          name="logo"
          placeholder="Logo"
          className="rounded-full"
        />
      </div>
    </>
  );
}
