"use client";
import { AvatarPicker } from "@/components/ui/avatar-picker";
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
import { Separator } from "@/components/ui/separator";
import { nationalities } from "@/utils/Misc";
import React, { useCallback, useEffect, useState } from "react";

export default function PersonalDetailForm({
  onValidityChange,
}: {
  onValidityChange?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  // first name, last name, email, and contact flags
  // Bitwise flags, from lsb to msb
  const [isFormValid, setIsFormValid] = useState<number>(0);

  const checkEmailValidity = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const email = e.target.value;
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (emailRegex.test(email)) {
        setIsFormValid((n) => n | 4);
      } else {
        setIsFormValid((n) => n & 0b1011);
      }
    },
    []
  );

  const checkContactValidity = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const contact = e.target.value;
      const phoneRegex =
        /^(?:\+?\d{,3})?[-.\s]?\(?\d{1,4}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
      if (phoneRegex.test(contact)) {
        setIsFormValid((n) => n | 8);
      } else {
        setIsFormValid((n) => n & 0b0111);
      }
    },
    []
  );

  useEffect(() => {
    if (onValidityChange) {
      if (isFormValid == 0b1111) onValidityChange(true);
      else onValidityChange(false);
    }
  }, [isFormValid, onValidityChange]);

  return (
    <div className="border rounded-md p-4 grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2">
      <div className="col-span-full flex flex-col gap-1">
        <p className="text-lg font-semibold">Personal Details</p>
        <Separator />
      </div>

      <div className="flex flex-col gap-2">
        <Label
          htmlFor="first-name-input"
          className="after:content-['*'] after:text-red-500 after:ml-2"
        >
          First Name
        </Label>
        <Input
          onChange={(e) => {
            if (e.target.value.length > 0) {
              setIsFormValid((n) => n | 1);
            } else {
              setIsFormValid((n) => n & 0b1110);
            }
          }}
          id="first-name-input"
          required
          placeholder="First Name"
          name="first_name"
          className="invalid:border-red-500 invalid:focus-within:ring-red-500"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="middle-name-input">Middle Name</Label>
        <Input
          id="middle-name-input"
          placeholder="Middle Name"
          name="middle_name"
        />
      </div>

      {/* Avatar picker */}
      <div className="row-span-4 flex flex-col gap-2">
        <Label htmlFor="profile-picture-input">Profile Picture</Label>
        <AvatarPicker name="image" className="size-full bg-accent/60" />
        {/* <Input type='file' placeholder="Profile Picture" name="profile_picture"/> */}
      </div>

      <div className="flex flex-col gap-2">
        <Label
          htmlFor="last-name-input"
          className="after:content-['*'] after:text-red-500 after:ml-2"
        >
          Last Name
        </Label>
        <Input
          onChange={(e) => {
            if (e.target.value.length > 0) {
              setIsFormValid((n) => n | 2);
            } else {
              setIsFormValid((n) => n & 0b1101);
            }
          }}
          id="last-name-input"
          required
          placeholder="Last Name"
          name="last_name"
          className="invalid:border-red-500 invalid:focus-within:ring-red-500"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label
          htmlFor="email-input"
          className="after:content-['*'] after:text-red-500 after:ml-2"
        >
          Email
        </Label>
        <Input
          onChange={checkEmailValidity}
          id="email-input"
          required
          type="email"
          placeholder="Email"
          name="email"
          className={
            (isFormValid & 0b0100) == 0
              ? "border-red-500 focus-visible:ring-red-500"
              : ""
          }
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label
          htmlFor="contact-input"
          className="after:content-['*'] after:text-red-500 after:ml-2"
        >
          Contact Number
        </Label>
        <Input
          onChange={checkContactValidity}
          id="contact-input"
          required
          type="tel"
          placeholder="Contact Number"
          name="contact"
          className={
            (isFormValid & 0b1000) == 0
              ? "border-red-500 focus-visible:ring-red-500"
              : ""
          }
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="contact-input">Alternative Contact Number</Label>
        <Input
          id="alternative-contact-input"
          type="tel"
          placeholder="Alternative Contact Number"
          name="alt_contact"
        />
      </div>

      {/* <div className="flex flex-col gap-2">
        <Label htmlFor="dob-input">Date of Birth</Label>
        <Input id="dob-input" type="date" name="dob" />
      </div> */}

      <div className="flex flex-col gap-2">
        <Label>Gender</Label>
        <Select name="gender">
          <SelectTrigger>
            <SelectValue placeholder="Select a gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select a gender</SelectLabel>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="n/a">Rather not say</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label>Select Nationality</Label>
        <ComboBox
          placeholder="Search nationality..."
          label="Select Nationality"
          items={nationalities}
          name="nationality"
        />
      </div>

      {/* <div className="flex flex-col gap-2">
        <Label>Marital Status</Label>
        <Select name="marital_status">
          <SelectTrigger>
            <SelectValue placeholder="Select a status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select a status</SelectLabel>
              <SelectItem value="married">Married</SelectItem>
              <SelectItem value="common-law-married">
                Common Law Married
              </SelectItem>
              <SelectItem value="separated">Separated</SelectItem>
              <SelectItem value="divorced">Divorced</SelectItem>
              <SelectItem value="widowed">Widowed</SelectItem>
              <SelectItem value="unmarried">Not married</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div> */}

      {/* <div className="flex flex-col gap-2">
        <Label htmlFor="contact-input">National Insurance Number</Label>
        <Input
          id="contact-input"
          required
          placeholder="National Insurance Number"
          name="ni_number"
        />
      </div> */}
    </div>
  );
}
