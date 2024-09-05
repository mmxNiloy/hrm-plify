import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ICompanyAuthorisedDetails } from "@/schema/CompanySchema";
import { ButtonBlue } from "@/styles/button.tailwind";
import { IFormFragmentProps } from "@/utils/Types";
import Link from "next/link";
import React from "react";

export default function CompanyAuthorityFormFragment({
  data,
  readOnly,
  disabled,
}: IFormFragmentProps<ICompanyAuthorisedDetails>) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <Label htmlFor="first-name-input">First Name</Label>
        <Input
          className="rounded-full"
          readOnly={readOnly}
          disabled={disabled}
          defaultValue={data?.fname ?? ""}
          placeholder="First Name"
          name="first_name"
          id="fist-name-input"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="last-name-input">Last Name</Label>
        <Input
          className="rounded-full"
          readOnly={readOnly}
          disabled={disabled}
          defaultValue={data?.lname ?? ""}
          placeholder="Last Name"
          name="last_name"
          id="last-name-input"
        />
      </div>

      <div className="col-span-full flex flex-col gap-2">
        <Label htmlFor="designation-input">Designation</Label>
        <Input
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
        <Label htmlFor="phone-input">Phone</Label>
        <Input
          type="tel"
          className="rounded-full"
          readOnly={readOnly}
          disabled={disabled}
          defaultValue={data?.phone_no ?? ""}
          placeholder="Phone Number"
          name="phone"
          id="phone-input"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="email-input">Email</Label>
        <Input
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
        <Label htmlFor="document-input">Document</Label>

        {readOnly ? (
          <Link id="document-input" href={data?.doc_link ?? "#"} passHref>
            <Button className={cn(ButtonBlue, "w-full")}>
              <Icons.document /> Document
            </Button>
          </Link>
        ) : (
          <Input
            readOnly={readOnly}
            disabled={disabled}
            type="file"
            name="document"
            className="rounded-full"
            id="document-input"
          />
        )}
      </div>

      <div className="col-span-full flex flex-col gap-2">
        <Label htmlFor="offence-input">Previous Offences</Label>
        <Textarea
          id="offence-input"
          name="offense_history"
          className="rounded-md resize-none"
          readOnly={readOnly}
          disabled={disabled}
          rows={5}
          defaultValue={data?.offence_history ?? ""}
          placeholder="Do you have a history of criminal conviction, bankruptcy, or disqualification?"
        />
      </div>
    </>
  );
}
