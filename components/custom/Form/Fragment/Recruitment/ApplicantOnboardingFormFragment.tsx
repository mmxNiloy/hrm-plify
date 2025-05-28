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
import { IDepartment } from "@/schema/CompanySchema";
import { IDesignation } from "@/schema/DesignationSchema";
import { IJobApplicant } from "@/schema/JobSchema";
import { RequiredAsterisk } from "@/styles/label.tailwind";
import { IFormFragmentProps } from "@/utils/Types";
import React from "react";

export default function ApplicantOnboardingFormFragment({
  data,
}: {
  data: IJobApplicant;
}) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <Label className={RequiredAsterisk} htmlFor="email-input">
          Email
        </Label>
        <Input
          required
          readOnly
          id="email-input"
          name="email"
          type="email"
          placeholder="Email"
          defaultValue={data.email}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label className={RequiredAsterisk} htmlFor="first-name-input">
          First Name
        </Label>
        <Input
          required
          readOnly
          id="first-name-input"
          name="fname"
          placeholder="First Name"
          defaultValue={data.first_name}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="middle-name-input">Middle Name</Label>
        <Input
          readOnly
          id="middle-name-input"
          name="middleName"
          placeholder="Middle Name"
          defaultValue={data.middle_name}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label className={RequiredAsterisk} htmlFor="last-name-input">
          Last Name
        </Label>
        <Input
          required
          readOnly
          id="last-name-input"
          name="lname"
          placeholder="Last Name"
          defaultValue={data.last_name}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label className={RequiredAsterisk}>Department</Label>
        <Input
          required
          readOnly
          name="dpt_name"
          placeholder="Department"
          defaultValue={data.job?.department?.dpt_name}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label className={RequiredAsterisk}>Designation</Label>
        <Input
          required
          readOnly
          name="designation_name"
          placeholder="Designation"
          defaultValue={data.job?.designation?.designation_name}
        />
      </div>
    </>
  );
}
