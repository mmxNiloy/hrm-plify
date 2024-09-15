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
        <Label
          htmlFor="company-name-input"
          className={cn(
            readOnly ? "" : "after:content-['*'] after:text-red-500 after:ml-1"
          )}
        >
          Company Name
        </Label>
        <Input
          minLength={3}
          required
          key={`company-name-${data?.company_name ?? ""}`}
          disabled={disabled}
          readOnly={readOnly}
          defaultValue={data?.company_name ?? ""}
          id="company-name-input"
          name="company_name"
          placeholder="Company Name"
          className="rounded-full"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="industry-input"
            className={cn(
              readOnly
                ? ""
                : "after:content-['*'] after:text-red-500 after:ml-1"
            )}
          >
            Industry
          </Label>
          <Input
            required
            minLength={3}
            key={`company-industry-${data?.industry ?? ""}`}
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
          <Label>Status</Label>
          <Select
            key={`company-status-${data?.is_active ?? 0}`}
            disabled={disabled || readOnly}
            name="is_active"
            defaultValue={(data?.is_active ?? 0) == 1 ? "yes" : "no"}
          >
            <SelectTrigger className="rounded-full">
              <SelectValue placeholder="Select a status" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select a company status</SelectLabel>
                <SelectItem value="yes">Active</SelectItem>
                <SelectItem value="no">Inactive</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label
          className={cn(
            readOnly ? "" : "after:content-['*'] after:text-red-500 after:ml-1"
          )}
          htmlFor="headquarters-input"
        >
          Headquarters
        </Label>
        <Input
          required
          minLength={3}
          key={`company-hq-${data?.headquarters ?? ""}`}
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
        <Label
          className={cn(
            readOnly ? "" : "after:content-['*'] after:text-red-500 after:ml-1"
          )}
          htmlFor="contact-number-input"
        >
          Contact Number
        </Label>
        <Input
          required
          key={`company-contact-number-${data?.contact_number ?? ""}`}
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

      <div className="grid grid-cols-2 gap-4">
        <div className="flex-grow flex flex-col gap-2">
          <Label
            className={cn(
              readOnly
                ? ""
                : "after:content-['*'] after:text-red-500 after:ml-1"
            )}
            htmlFor="founded-year-input"
          >
            Founded Year
          </Label>
          <Input
            required
            key={`company-founded-year-${data?.founded_year ?? 0}`}
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
            key={`company-website-${data?.website ?? ""}`}
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
          key={`company-logo-${data?.logo ?? ""}`}
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
