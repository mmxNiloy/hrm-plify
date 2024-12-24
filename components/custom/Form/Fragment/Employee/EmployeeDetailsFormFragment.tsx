"use client";
import { AvatarPicker } from "@/components/ui/avatar-picker";
import { Checkbox } from "@/components/ui/checkbox";
import { ComboBox } from "@/components/ui/combobox";
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
import { IEmployeeWithPersonalInfo } from "@/schema/EmployeeSchema";
import {
  getFullNameOfUser,
  maritalStatus,
  nationalities,
  toYYYYMMDD,
} from "@/utils/Misc";
import { IFormFragmentProps } from "@/utils/Types";
import React from "react";

interface Props extends IFormFragmentProps<IEmployeeWithPersonalInfo> {
  dialogForm?: boolean;
}

export default function EmployeeDetailsFormFragment({
  data,
  readOnly,
  disabled,
  dialogForm,
}: Props) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <Label
          className={cn(
            readOnly ? "" : "after:content-['*'] after:text-red-500 after:ml-1"
          )}
          htmlFor="first-name-input"
        >
          First Name
        </Label>

        <Input
          key={`first-name-${data?.users.first_name}`}
          required
          readOnly={readOnly}
          disabled={disabled}
          id="first-name-input"
          defaultValue={data?.users.first_name}
          placeholder="First Name"
          name="first_name"
        />
      </div>

      {dialogForm && (
        <div className="row-span-3 flex flex-col gap-2 items-center justify-center">
          <AvatarPicker
            key={`user-image-${data?.image}`}
            src={data?.image}
            readOnly={readOnly}
            disabled={disabled}
            className="w-52"
            name="profile_pic"
            alt={
              data
                ? getFullNameOfUser(data.users) + "'s Profile Picture"
                : "User Profile Pic"
            }
          />
        </div>
      )}

      <div className="flex flex-col gap-2">
        <Label htmlFor="middle-name-input">Middle Name</Label>
        <Input
          key={`middle-name-${data?.users.middle_name}`}
          readOnly={readOnly}
          disabled={disabled}
          id="middle-name-input"
          defaultValue={data?.users.middle_name}
          placeholder="Middle Name"
          name="middle_name"
        />
      </div>

      {!dialogForm && (
        <div className="row-span-3 flex flex-col gap-2 items-center justify-center">
          <AvatarPicker
            key={`user-image-${data?.image}`}
            src={data?.image}
            className="w-52"
            readOnly={readOnly}
            disabled={disabled}
            name="profile_pic"
            alt={
              data
                ? getFullNameOfUser(data.users) + "'s Profile Picture"
                : "User Profile Pic"
            }
          />
        </div>
      )}

      <div className="flex flex-col gap-2">
        <Label
          className={cn(
            readOnly ? "" : "after:content-['*'] after:text-red-500 after:ml-1"
          )}
          htmlFor="last-name-input"
        >
          Last Name
        </Label>
        <Input
          key={`last-name-${data?.users.last_name}`}
          required
          readOnly={readOnly}
          disabled={disabled}
          id="last-name-input"
          defaultValue={data?.users.last_name}
          placeholder="Last Name"
          name="last_name"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="dob-input">Date of Birth</Label>
        <Input
          key={`dob-${new Date(data?.date_of_birth ?? new Date()).toString()}`}
          type="date"
          readOnly={readOnly}
          disabled={disabled}
          id="dob-input"
          defaultValue={toYYYYMMDD(new Date(data?.date_of_birth ?? new Date()))}
          placeholder="Date of Birth"
          name="date_of_birth"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="gender-input">Gender</Label>

        <Select
          key={`gender-${data?.gender}`}
          defaultValue={data?.gender ?? ""}
          disabled={readOnly || disabled}
          name="gender"
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Your Gender" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select your gender</SelectLabel>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="ni-num-input">NI Number</Label>
        <Input
          key={`ni-num-${data?.ni_num}`}
          readOnly={readOnly}
          disabled={disabled}
          id="ni-num-input"
          defaultValue={data?.ni_num}
          placeholder="NI Number"
          name="ni_num"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="nationality-input">Nationality</Label>
        <ComboBox
          key={`nationality-${data?.nationality}`}
          items={nationalities}
          defaultValue={data?.nationality ?? ""}
          name="nationality"
          placeholder="Select your nationality"
          id="nationality-input"
          readOnly={readOnly}
          disabled={disabled}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="marital-status-input">Marital Status</Label>
        <ComboBox
          key={`marital-status-${data?.marital_status}`}
          items={maritalStatus}
          defaultValue={data?.marital_status ?? ""}
          name="marital_status"
          placeholder="Select your marital status"
          id="marital-status-input"
          readOnly={readOnly}
          disabled={disabled}
        />
      </div>

      {/* Empty cell */}
      <span></span>

      {/* Basic contacts */}
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
          key={`email-${data?.users.email}`}
          type="email"
          defaultValue={data?.users.email ?? ""}
          name="email"
          placeholder="Email"
          id="email-input"
          required
          readOnly={readOnly}
          disabled={disabled}
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
          key={`contact-number-${data?.contact_number}`}
          type="tel"
          defaultValue={data?.contact_number ?? ""}
          name="contact_number"
          placeholder="Contact Number"
          id="contact-number-input"
          required
          readOnly={readOnly}
          disabled={disabled}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="alternative-number-input">Alternative Number</Label>
        <Input
          key={`alternative-number-${data?.alternative_number}`}
          type="tel"
          defaultValue={data?.alternative_number ?? ""}
          name="alternative_number"
          placeholder="Alternative Number"
          id="alternative-number-input"
          readOnly={readOnly}
          disabled={disabled}
        />
      </div>
      <div className="flex flex-row gap-2 items-center">
        <Checkbox
          id="is-foreign-checkbox"
          key={`is-foreign-checkbox-${data?.is_foreign}`}
          disabled={readOnly || disabled}
          name="is_foreign"
          defaultChecked={data?.is_foreign}
        />
        <Label htmlFor="is-foreign-checkbox">
          Are they a migrant employee?
        </Label>
      </div>
    </>
  );
}
