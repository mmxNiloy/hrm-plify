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
import { IChangeOfCircumstances } from "@/schema/EmployeeSchema";
import { nationalities, countryNames } from "@/utils/Misc";
import React, { useCallback, useRef, useState } from "react";

function splitName(name: string) {
  const words = name.split(" ").filter((n) => /[a-zA-Z]/.test(n));

  return {
    firstName: words.length > 0 ? words[0] : "",
    lastName: words.length > 1 ? words[words.length - 1] : "",
    middleName:
      words.length > 2 ? words.slice(1, words.length - 1).join(" ") : "",
  };
}

export default function EmployeeDetailForm({
  defaultData,
}: {
  defaultData?: IChangeOfCircumstances;
}) {
  const [employeeName, setEmployeeName] = useState<string>(
    defaultData?.employee_name ?? ""
  );
  const lastNameRef: React.LegacyRef<HTMLInputElement> | undefined =
    useRef(null);
  const middleNameRef: React.LegacyRef<HTMLInputElement> | undefined =
    useRef(null);

  const handleEmployeeNameChange = useCallback(
    (value: string) => {
      setEmployeeName(value);

      if (lastNameRef && lastNameRef.current) {
        lastNameRef.current.value = splitName(value).lastName;
      }

      if (middleNameRef && middleNameRef.current) {
        middleNameRef.current.value = splitName(value).middleName;
      }
    },
    [lastNameRef, middleNameRef]
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="border rounded-md p-4 grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2">
        <div className="col-span-full flex flex-col gap-1">
          <p className="text-lg font-semibold">Employee Details</p>
          <Separator />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Select Employee</Label>
          <ComboBox
            defaultValue={defaultData?.employee_name ?? ""}
            onValueChange={handleEmployeeNameChange}
            name="employee_name"
            label="Select Employee"
            placeholder="Search Employee..."
            items={Array.from({ length: 50 }, (_, index) =>
              index % 2 == 0
                ? `John Doe #${index + 1}`
                : `Jane Doe #${index + 1}`
            )}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="employee-id-input">Employee ID</Label>
          <Input
            defaultValue={defaultData?.employee_id ?? ""}
            id="employee-id-input"
            readOnly
            placeholder="Employee ID"
            name="employee_id"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="current-name-input">Current Name</Label>
          <Input
            defaultValue={defaultData?.employee_name ?? ""}
            id="current-name-input"
            readOnly
            placeholder="Current Name"
            value={employeeName}
            name="old_name"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="first-name-input">First Name</Label>
          <Input
            defaultValue={splitName(defaultData?.employee_name ?? "").firstName}
            id="first-name-input"
            readOnly
            value={splitName(employeeName).firstName}
            placeholder="First Name"
            name="first_name"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="middle-name-input">Middle Name</Label>
          <Input
            ref={middleNameRef}
            id="middle-name-input"
            defaultValue={splitName(employeeName).middleName}
            placeholder="Middle Name"
            name={"middle_name"}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="last-name-input">Last Name</Label>
          <Input
            ref={lastNameRef}
            id="last-name-input"
            defaultValue={splitName(employeeName).lastName}
            placeholder="Last Name"
            name="last_name"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Department</Label>
          <Select
            name="department"
            defaultValue={defaultData?.department ?? ""}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a Department" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select a department</SelectLabel>
                {Array.from({ length: 15 }, (_, index) => index + 1).map(
                  (item) => (
                    <SelectItem
                      key={`example-department-${item}`}
                      value={`example-department-${item}`}
                    >
                      Department #{item}
                    </SelectItem>
                  )
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label>Job Title</Label>
          <Select name="job_title" defaultValue={defaultData?.job_title ?? ""}>
            <SelectTrigger>
              <SelectValue placeholder="Select a Job" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select a job</SelectLabel>
                {Array.from({ length: 15 }, (_, index) => index + 1).map(
                  (item) => (
                    <SelectItem
                      key={`example-job-${item}`}
                      value={`example-job-${item}`}
                    >
                      Job #{item}
                    </SelectItem>
                  )
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="contact-input">Contact Number</Label>
          <Input
            defaultValue={defaultData?.contact ?? ""}
            type="tel"
            id="contact-input"
            placeholder="Contact Number"
            name="contact_number"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="last-name-input">Date of birth</Label>
          <Input
            id="dob-input"
            type="date"
            defaultValue={"1989-12-31"}
            placeholder="Date of Birth"
            name="dob"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="ni-number-input">NI No.</Label>
          <Input
            defaultValue={defaultData?.ni_number ?? ""}
            id="ni-number-input"
            placeholder="National Insurance Number"
            name="ni_number"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Select Nationality</Label>
          <ComboBox
            defaultValue={defaultData?.nationality ?? ""}
            placeholder="Search nationality..."
            label="Select Nationality"
            items={nationalities}
            name="nationality"
          />
        </div>
      </div>

      <div className="border rounded-md p-4 grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2">
        <div className="col-span-full flex flex-col gap-1">
          <p className="text-base font-semibold">
            Contact Information (Correspondence Address)
          </p>
          <Separator />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="post-code-input">Post Code</Label>
          <Input
            defaultValue={defaultData?.post_code ?? ""}
            id="post-code-input"
            name="post_code"
            placeholder="Post Code"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Select Address</Label>
          <Select defaultValue={defaultData?.address ?? ""}>
            <SelectTrigger>
              <SelectValue placeholder="Select an Address" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select an address</SelectLabel>

                {Array.from({ length: 15 }, (_, index) => index + 1).map(
                  (item) => (
                    <SelectItem
                      key={`example-address-${item}`}
                      value={`example address-${item}`}
                    >
                      Address #{item}
                    </SelectItem>
                  )
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="address-line-1-input">Address Line 1</Label>
          <Input
            defaultValue={defaultData?.address_line_1 ?? ""}
            id="address-line-1-input"
            name="address_line_1"
            placeholder="Address Line 1"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="address-line-2-input">Address Line 2</Label>
          <Input
            defaultValue={defaultData?.address_line_2 ?? ""}
            id="address-line-2-input"
            name="address_line_2"
            placeholder="Address Line 2"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="address-line-3-input">Address Line 3</Label>
          <Input
            defaultValue={defaultData?.address_line_3 ?? ""}
            id="address-line-3-input"
            name="address_line_3"
            placeholder="Address Line 3"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="city-input">City / County</Label>
          <Input
            id="city-input"
            name="city"
            placeholder="City / County"
            defaultValue={defaultData?.city ?? ""}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Country</Label>
          <ComboBox
            name="country"
            title="Select a Country"
            placeholder="Search a country..."
            items={countryNames}
            defaultValue={defaultData?.country ?? ""}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="proof-of-address-input">Proof of Address</Label>
          <Input
            type="file"
            placeholder="Proof of address"
            defaultValue={defaultData?.proof_of_address ?? ""}
          />
        </div>
      </div>
    </div>
  );
}
