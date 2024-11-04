"use client";

import { Button } from "@/components/ui/button";
import { ComboBox } from "@/components/ui/combobox";
import Icons from "@/components/ui/icons";
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
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { IEmployeeNid } from "@/schema/EmployeeSchema";
import { ButtonBlue } from "@/styles/button.tailwind";
import { countryNames, nationalities, toYYYYMMDD } from "@/utils/Misc";
import { IFormFragmentProps } from "@/utils/Types";
import Link from "next/link";
import React from "react";

export default function NidFormFragment({
  data,
  readOnly,
  disabled,
}: IFormFragmentProps<IEmployeeNid>) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <Label
          className={cn(
            readOnly ? "" : "after:content-['*'] after:text-red-500 after:ml-1"
          )}
          htmlFor="nid-number-input"
        >
          National ID No.
        </Label>
        <Input
          key={`nid-number-${data?.nid_number}`}
          required
          id="nid-number-input"
          name="nid_number"
          placeholder="National ID No."
          defaultValue={data?.nid_number ?? ""}
          readOnly={readOnly}
          disabled={disabled}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label
          className={cn(
            readOnly ? "" : "after:content-['*'] after:text-red-500 after:ml-1"
          )}
          htmlFor="issue-date-input"
        >
          Issue Date
        </Label>
        <Input
          type="date"
          key={`issue-date-${data?.issue_date}`}
          required
          id="issue-date-input"
          name="issue_date"
          defaultValue={
            data?.issue_date ? toYYYYMMDD(new Date(data.issue_date)) : ""
          }
          readOnly={readOnly}
          disabled={disabled}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label
          className={cn(
            readOnly ? "" : "after:content-['*'] after:text-red-500 after:ml-1"
          )}
          htmlFor="expiry-date-input"
        >
          Expiry Date
        </Label>
        <Input
          type="date"
          key={`expiry-date-${data?.expiry_date}`}
          required
          id="expiry-date-input"
          name="expiry_date"
          defaultValue={
            data?.expiry_date ? toYYYYMMDD(new Date(data.expiry_date)) : ""
          }
          readOnly={readOnly}
          disabled={disabled}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label
          className={cn(
            readOnly ? "" : "after:content-['*'] after:text-red-500 after:ml-1"
          )}
          htmlFor="nationality-input"
        >
          Nationality
        </Label>
        <ComboBox
          items={nationalities}
          key={`nationality-${data?.nationality}`}
          required
          id="nationality-input"
          name="nationality"
          placeholder="Nationality"
          defaultValue={data?.nationality ?? ""}
          readOnly={readOnly}
          disabled={disabled}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label
          className={cn(
            readOnly ? "" : "after:content-['*'] after:text-red-500 after:ml-1"
          )}
          htmlFor="country-of-residence-input"
        >
          Country of Residence
        </Label>
        <ComboBox
          items={countryNames}
          key={`country-of-residence-${data?.country_of_residence}`}
          required
          id="country-of-residence-input"
          name="country_of_residence"
          placeholder="Country of Residence"
          defaultValue={data?.country_of_residence ?? ""}
          readOnly={readOnly}
          disabled={disabled}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="document-input">Document</Label>
        {readOnly ? (
          data?.document ? (
            <Link passHref href={data.document} target="_blank">
              <Button className={cn(ButtonBlue, "w-full")}>
                <Icons.externalLink /> View Document
              </Button>
            </Link>
          ) : (
            <Button className={ButtonBlue} disabled>
              <Icons.externalLink /> View Document
            </Button>
          )
        ) : (
          <Input
            type="file"
            key={`document-${data?.document}`}
            id="document-input"
            name="document"
            placeholder="Document"
            readOnly={readOnly}
            disabled={disabled}
          />
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="remark-input">Is this your current status?</Label>
        <Select
          key={`is-current-${data?.isCurrent}`}
          name="isCurrent"
          defaultValue={data?.isCurrent == 1 ? "yes" : "no"}
          disabled={readOnly || disabled}
        >
          <SelectTrigger>
            <SelectValue placeholder="Is this your current status?" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Is this your current status?</SelectLabel>
            </SelectGroup>

            <SelectItem value="yes">Yes</SelectItem>
            <SelectItem value="no">No</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2 col-span-full">
        <Label htmlFor="remark-input">Remark</Label>
        <Textarea
          key={`remark-${data?.remark}`}
          id="remark-input"
          name="remark"
          placeholder="Remark"
          rows={5}
          className="resize-none"
          defaultValue={data?.remark ?? ""}
          readOnly={readOnly}
          disabled={disabled}
        />
      </div>
    </>
  );
}
