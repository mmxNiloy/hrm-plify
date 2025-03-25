"use client";
import { Button } from "@/components/ui/button";
import { ComboBox } from "@/components/ui/combobox";
import { FilePicker } from "@/components/ui/file-picker";
import Icons from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { IEmployeeContactInfo } from "@/schema/EmployeeSchema";
import { ButtonGradient } from "@/styles/button.tailwind";
import { countryNames } from "@/utils/Misc";
import { IFormFragmentProps } from "@/utils/Types";
import Link from "next/link";
import React from "react";

interface Props extends IFormFragmentProps<IEmployeeContactInfo> {
  setDocError?: React.Dispatch<React.SetStateAction<Boolean>>;
}

export default function ContactInfoFormFragment({
  data,
  readOnly,
  disabled,
  setDocError,
}: Props) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <Label htmlFor="post-code-input">Post Code</Label>
        <Input
          id="post-code-input"
          key={`post-code-${data?.postcode}`}
          name="postcode"
          readOnly={readOnly}
          disabled={disabled}
          defaultValue={data?.postcode}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="address-input">Address</Label>
        <Input
          id="address-input"
          key={`address-line-${data?.address_line}`}
          name="address_line"
          readOnly={readOnly}
          disabled={disabled}
          defaultValue={data?.address_line}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="additional-address-1-input">Additional Address</Label>
        <Input
          id="additional-address-1-input"
          key={`additional-address-1-${data?.additional_address_1}`}
          name="additional_address_1"
          readOnly={readOnly}
          disabled={disabled}
          defaultValue={data?.additional_address_1}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="additional-address-2-input">Additional Address</Label>
        <Input
          id="additional-address-2-input"
          key={`additional-address-2-${data?.additional_address_2}`}
          name="additional_address_2"
          readOnly={readOnly}
          disabled={disabled}
          defaultValue={data?.additional_address_2}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="country-input">Country</Label>
        <ComboBox
          items={countryNames}
          id="country-input"
          key={`country-${data?.country}`}
          name="country"
          readOnly={readOnly}
          disabled={disabled}
          defaultValue={data?.country}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="proof-of-address-input">Proof of Address</Label>
        {!readOnly ? (
          <FilePicker
            disabled={disabled}
            id="proof-of-address-input"
            onError={() => {
              if (setDocError) setDocError(true);
            }}
            onSuccess={() => {
              if (setDocError) setDocError(false);
            }}
            className="data-[error=true]:border-red-500"
            name="proof_of_address_doc"
          />
        ) : data?.proof_address_doc_link ? (
          <Link passHref href={data.proof_address_doc_link} target="_blank">
            <Button className={cn(ButtonGradient, "w-full")}>
              <Icons.externalLink /> View Document
            </Button>
          </Link>
        ) : (
          <Button className={ButtonGradient} disabled>
            <Icons.externalLink /> View Document
          </Button>
        )}
      </div>
    </>
  );
}
