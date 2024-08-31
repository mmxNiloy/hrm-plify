import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ICompanyAuthorisedDetails } from "@/schema/CompanySchema";
import { ButtonBlue } from "@/styles/button.tailwind";
import Link from "next/link";
import React from "react";

export default function CompanyAuthorizationTab({
  data,
  title = "Authorised Personnel",
}: {
  data?: ICompanyAuthorisedDetails;
  title?: "Authorised Personnel" | "Key Contact" | "Level 1 User";
}) {
  return (
    <div className="grid grid-cols-2 gap-4 p-8 border rounded-md">
      <p className="col-span-full text-lg font-semibold">{title}</p>
      <div className="flex flex-col gap-2">
        <Label>First Name</Label>
        <Input
          className="rounded-full"
          readOnly
          defaultValue={data?.fname ?? ""}
          placeholder="First Name"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Last Name</Label>
        <Input
          className="rounded-full"
          readOnly
          defaultValue={data?.lname ?? ""}
          placeholder="Last Name"
        />
      </div>

      <div className="col-span-full flex flex-col gap-2">
        <Label>Designation</Label>
        <Input
          className="rounded-full"
          readOnly
          defaultValue={data?.designation ?? ""}
          placeholder="Designation"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Phone</Label>
        <Input
          type="tel"
          className="rounded-full"
          readOnly
          defaultValue={data?.phone_no ?? ""}
          placeholder="Phone Number"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Email</Label>
        <Input
          type="email"
          className="rounded-full"
          readOnly
          defaultValue={data?.email ?? ""}
          placeholder="Email"
        />
      </div>

      <div className="col-span-full flex flex-col gap-2">
        <Label>Document</Label>
        <Link href={data?.doc_link ?? "#"} passHref>
          <Button className={cn(ButtonBlue, "w-full")}>
            <Icons.document /> Document
          </Button>
        </Link>
      </div>

      <div className="col-span-full flex flex-col gap-2">
        <Label>Previous Offences</Label>
        <Textarea
          className="rounded-md resize-none"
          readOnly
          rows={5}
          defaultValue={data?.offence_history ?? ""}
          placeholder="Do you have a history of criminal conviction, bankruptcy, or disqualification?"
        />
      </div>
    </div>
  );
}
