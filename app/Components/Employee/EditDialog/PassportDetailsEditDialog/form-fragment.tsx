"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { IFormFragmentProps } from "@/utils/Types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import React from "react";
import { IEmployeePassportDetail } from "@/schema/EmployeeSchema";
import { toYYYYMMDD } from "@/utils/Misc";
import { ButtonBlue } from "@/styles/button.tailwind";

export default function PassportDetailsFormFragment({
  data,
  readOnly,
  disabled,
}: IFormFragmentProps<IEmployeePassportDetail>) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <Label
          className={cn(
            readOnly ? "" : "after:content-['*'] after:text-red-500 after:ml-1"
          )}
          htmlFor="passport-number-input"
        >
          Passport Number
        </Label>
        <Input
          key={`employee-passport-number-${data?.passport_number}`}
          id="passport-number-input"
          name="passport_number"
          defaultValue={data?.passport_number}
          placeholder="Passport Number"
          readOnly={readOnly}
          disabled={disabled}
          required
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
          id="issue-date-input"
          key={`issue-date-${data?.issue_date}`}
          type="date"
          name="issue_date"
          defaultValue={
            data?.issue_date ? toYYYYMMDD(new Date(data.issue_date)) : ""
          }
          placeholder="Issue Date"
          readOnly={readOnly}
          disabled={disabled}
          required
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
          id="expiry-date-input"
          key={`expiry-date-${data?.expiry_date}`}
          type="date"
          name="expiry_date"
          defaultValue={
            data?.expiry_date ? toYYYYMMDD(new Date(data.expiry_date)) : ""
          }
          placeholder="Expiry Date"
          readOnly={readOnly}
          disabled={disabled}
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label
          className={cn(
            readOnly ? "" : "after:content-['*'] after:text-red-500 after:ml-1"
          )}
          htmlFor="place-of-birth-input"
        >
          Place of Birth
        </Label>
        <Input
          id="place-of-birth-input"
          key={`place-of-birth-${data?.place_of_birth}`}
          name="place_of_birth"
          defaultValue={data?.place_of_birth}
          placeholder="Place of Birth"
          readOnly={readOnly}
          disabled={disabled}
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="document-input">Document</Label>
        {!readOnly ? (
          <Input
            disabled={disabled}
            id="document-input"
            type="file"
            name="document"
          />
        ) : (
          <Link
            className="w-full"
            href={data?.document ?? "#document-download"}
            passHref
          >
            <Button
              id="document-download"
              disabled={!data || !data.document}
              className={cn(ButtonBlue, "w-full")}
            >
              <Icons.download /> View Document
            </Button>
          </Link>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="remark-input">Remark</Label>
        <Input
          id="remark-input"
          key={`remark-${data?.remark}`}
          name="remark"
          defaultValue={data?.remark ?? ""}
          placeholder="Remark"
          readOnly={readOnly}
          disabled={disabled}
        />
      </div>
    </>
  );
}
