"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FilePicker } from "@/components/ui/file-picker";
import Icons from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ICompanyAuthorizedDetailsBase } from "@/schema/CompanySchema";
import { ButtonGradient } from "@/styles/button.tailwind";
import { FileSizeWarning } from "@/styles/label.tailwind";
import { IFormFragmentProps } from "@/utils/Types";
import Link from "next/link";
import React from "react";

interface Props extends IFormFragmentProps<ICompanyAuthorizedDetailsBase> {
  setDocError?: React.Dispatch<React.SetStateAction<Boolean>>;
  title?: "Authorised Personnel" | "Key Contact" | "Level 1 User";
}

export default function CompanyAuthorityFormFragment({
  data,
  readOnly,
  disabled,
  setDocError,
  title,
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      {!readOnly && (
        <div className="col-span-full flex flex-col sm:flex-row items-start sm:items-center gap-2 md:gap-4">
          <Checkbox
            defaultChecked={data?.is_same_as_key_contact}
            disabled={readOnly || disabled}
            id="is-same-as-key-contact"
            name="is_same_as_key_contact"
          />
          <Label
            htmlFor="is-same-as-key-contact"
            className="text-sm md:text-base"
          >
            Are{" "}
            {title === "Authorised Personnel"
              ? "Key Contact and L1 User"
              : title === "Key Contact"
              ? "Authorised Personnel and L1 User"
              : "Authorised Personnel and Key Contact"}{" "}
            the same as {title}?
          </Label>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <Label
          htmlFor="first-name-input"
          className={cn(
            readOnly ? "" : "after:content-['*'] after:text-red-500 after:ml-1"
          )}
        >
          First Name
        </Label>
        <Input
          required
          key={`authority-fname-${data?.fname}`}
          className="rounded-full"
          readOnly={readOnly}
          disabled={disabled}
          defaultValue={data?.fname ?? ""}
          placeholder="First Name"
          name="fname"
          id="first-name-input"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label
          htmlFor="last-name-input"
          className={cn(
            readOnly ? "" : "after:content-['*'] after:text-red-500 after:ml-1"
          )}
        >
          Last Name
        </Label>
        <Input
          required
          key={`authority-lname-${data?.lname}`}
          className="rounded-full"
          readOnly={readOnly}
          disabled={disabled}
          defaultValue={data?.lname ?? ""}
          placeholder="Last Name"
          name="lname"
          id="last-name-input"
        />
      </div>

      <div className="col-span-full flex flex-col gap-2">
        <Label
          htmlFor="designation-input"
          className={cn(
            readOnly ? "" : "after:content-['*'] after:text-red-500 after:ml-1"
          )}
        >
          Designation
        </Label>
        <Input
          required
          key={`authority-designation-${data?.designation}`}
          className="rounded-full"
          readOnly={readOnly}
          disabled={disabled}
          defaultValue={data?.designation ?? ""}
          placeholder="Designation"
          name="designation"
          id="designation-input"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label
          className={cn(
            readOnly ? "" : "after:content-['*'] after:text-red-500 after:ml-1"
          )}
          htmlFor="phone-input"
        >
          Phone
        </Label>
        <Input
          required
          key={`authority-phone-no-${data?.phone_no}`}
          type="tel"
          className="rounded-full"
          readOnly={readOnly}
          disabled={disabled}
          defaultValue={data?.phone_no ?? ""}
          placeholder="Phone Number"
          name="phone_no"
          id="phone-input"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label
          className={cn(
            readOnly ? "" : "after:content-['*'] after:text-red-500 after:ml-1"
          )}
          htmlFor="email-input"
        >
          Email
        </Label>
        <Input
          required
          key={`authority-email-${data?.email}`}
          type="email"
          className="rounded-full"
          readOnly={readOnly}
          disabled={disabled}
          defaultValue={data?.email ?? ""}
          placeholder="Email"
          name="email"
          id="email-input"
        />
      </div>

      <div className="col-span-full flex flex-col gap-2">
        <Label
          htmlFor="document-input"
          className={!readOnly ? FileSizeWarning : ""}
        >
          Document
        </Label>
        {readOnly ? (
          <Link
            key={`authority-doc-link-${data?.doc_link}`}
            id="document-input"
            href={data?.doc_link ?? "#"}
            target={data?.doc_link ? "_blank" : "_self"}
            passHref
          >
            <Button className={cn(ButtonGradient, "w-full")}>
              <Icons.document /> Document
            </Button>
          </Link>
        ) : (
          <FilePicker
            readOnly={readOnly}
            disabled={disabled}
            onError={() => {
              if (setDocError) setDocError(true);
            }}
            onSuccess={() => {
              if (setDocError) setDocError(false);
            }}
            className="data-[error=true]:border-red-500"
            name="document"
            id="document-input"
          />
        )}
      </div>

      <div className="col-span-full flex flex-col gap-2">
        <Label htmlFor="offence-input">Previous Offences</Label>
        <Textarea
          key={`authority-offence-history-${data?.offence_history}`}
          id="offence-input"
          name="offence_history"
          className="rounded-md resize-none"
          readOnly={readOnly}
          disabled={disabled}
          rows={5}
          defaultValue={data?.offence_history ?? ""}
          placeholder="Do you have a history of criminal conviction, bankruptcy, or disqualification?"
        />
      </div>
    </div>
  );
}
