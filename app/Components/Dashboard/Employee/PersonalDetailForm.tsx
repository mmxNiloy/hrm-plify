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
import { Nationalities } from "@/utils/Misc";
import React from "react";

export default function PersonalDetailForm() {
  return (
    <div className="border rounded-md p-4 grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2">
      <div className="col-span-full flex flex-col gap-1">
        <p className="text-lg font-semibold">Personal Details</p>
        <Separator />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="emp-id-input">Employee ID</Label>
        <Input
          id="emp-id-input"
          readOnly
          placeholder="EMP-151"
          value="EMP-151"
          name="employee_id"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label
          htmlFor="first-name-input"
          className="after:content-['*'] after:text-red-500 after:ml-2"
        >
          First Name
        </Label>
        <Input
          id="first-name-input"
          required
          placeholder="First Name"
          name="first_name"
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

      <div className="flex flex-col gap-2">
        <Label
          htmlFor="last-name-input"
          className="after:content-['*'] after:text-red-500 after:ml-2"
        >
          Last Name
        </Label>
        <Input
          id="last-name-input"
          required
          placeholder="Last Name"
          name="last_name"
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
          id="email-input"
          required
          type="email"
          className="invalid:border-red-500 invalid:focus-within:ring-red-500"
          placeholder="Email"
          name="email"
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
          id="contact-input"
          required
          type="tel"
          className="invalid:border-red-500 invalid:focus-within:ring-red-500"
          placeholder="Contact Number"
          name="contact"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="contact-input">Alternative Contact Number</Label>
        <Input
          id="alternative-contact-input"
          type="tel"
          placeholder="Alternative Contact Number"
          name="alternative_contact"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="dob-input">Date of Birth</Label>
        <Input id="dob-input" type="date" name="dob" />
      </div>

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
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label>Select Nationality</Label>
        <ComboBox
          placeholder="Search nationality..."
          label="Select Nationality"
          items={Nationalities}
          name="nationality"
        />
      </div>

      <div className="flex flex-col gap-2">
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
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="contact-input">National Insurance Number</Label>
        <Input
          id="contact-input"
          required
          placeholder="National Insurance Number"
          name="ni_number"
        />
      </div>
    </div>
  );
}
