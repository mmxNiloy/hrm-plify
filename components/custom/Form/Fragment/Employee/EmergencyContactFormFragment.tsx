"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { IEmployeeEmergencyContact } from "@/schema/EmployeeSchema";
import { IFormFragmentProps } from "@/utils/Types";
import React from "react";

export default function EmergencyContactFormFragment({
  data,
  readOnly,
  disabled,
}: IFormFragmentProps<IEmployeeEmergencyContact>) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <Label
          className={cn(
            readOnly ? "" : "after:content-['*'] after:text-red-500 after:ml-1"
          )}
          htmlFor="contact-name-input"
        >
          Contact Name
        </Label>
        <Input
          id="contact-name-input"
          key={`contact-name-${data?.contact_name}`}
          name="contact_name"
          readOnly={readOnly}
          disabled={disabled}
          defaultValue={data?.contact_name}
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label
          className={cn(
            readOnly ? "" : "after:content-['*'] after:text-red-500 after:ml-1"
          )}
          htmlFor="relationship-input"
        >
          Relationship
        </Label>
        <Input
          id="relationship-input"
          key={`relationship-${data?.relationship}`}
          name="relationship"
          readOnly={readOnly}
          disabled={disabled}
          defaultValue={data?.relationship}
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label
          className={cn(
            readOnly ? "" : "after:content-['*'] after:text-red-500 after:ml-1"
          )}
          htmlFor="phone-number-input"
        >
          Phone Number
        </Label>
        <Input
          id="phone-number-input"
          key={`phone-number-${data?.phone_number}`}
          name="phone_number"
          readOnly={readOnly}
          disabled={disabled}
          defaultValue={data?.phone_number}
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="email-input">Email</Label>
        <Input
          id="email-input"
          key={`email-${data?.email}`}
          name="email"
          type="email"
          readOnly={readOnly}
          disabled={disabled}
          defaultValue={data?.email ?? ""}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="address-input">Address</Label>
        <Input
          id="address-input"
          key={`address-${data?.address}`}
          name="address"
          readOnly={readOnly}
          disabled={disabled}
          defaultValue={data?.address ?? ""}
        />
      </div>
    </>
  );
}
