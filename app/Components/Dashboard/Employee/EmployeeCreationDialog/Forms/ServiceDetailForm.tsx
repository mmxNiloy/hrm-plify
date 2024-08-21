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
import React from "react";

export default function ServiceDetailForm() {
  return (
    <div className="border rounded-md p-4 grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2">
      <div className="col-span-full flex flex-col gap-1">
        <p className="text-lg font-semibold">Service Details</p>
        <Separator />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Department</Label>
        <Select name="department">
          <SelectTrigger>
            <SelectValue placeholder="Select a Department" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select a department</SelectLabel>
              {Array.from({ length: 10 }, (_, index) => index + 1).map(
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
        <Label>Designation</Label>
        <Select name="designation">
          <SelectTrigger>
            <SelectValue placeholder="Select a Designation" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select a designation</SelectLabel>

              {Array.from({ length: 10 }, (_, index) => index + 1).map(
                (item) => (
                  <SelectItem
                    key={`example-designation-${item}`}
                    value={`example-designation-${item}`}
                  >
                    Designation #{item}
                  </SelectItem>
                )
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="doj-input">Date of Joining</Label>
        <Input id="doj-input" type="date" name="date_of_joining" />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Employee Type</Label>
        <Select name="employee_type">
          <SelectTrigger>
            <SelectValue placeholder="Select a Type" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select a Type</SelectLabel>
              <SelectItem value="full-time">Full-time</SelectItem>
              <SelectItem value="contractual">Contractual</SelectItem>
              <SelectItem value="part-time">Part-time</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
              <SelectItem value="left">Left</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="doc-input">Date of Confirmation</Label>
        <Input id="doc-input" type="date" name="date_of_confirmation" />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="contract-start-date-input">Contract Start Date</Label>
        <Input
          id="contract-start-date-input"
          type="date"
          name="contract_start_date"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="contract-end-date-input">
          Contract End Date (If applicable)
        </Label>
        <Input
          id="contract-end-date-input"
          type="date"
          name="contract_end_date"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="job-location-input">Job Location</Label>
        <Input id="job-location-input" name="job_location" />
      </div>

      {/* <div className="flex flex-col gap-2">
        <Label htmlFor="reporting-authority-input">Reporting Authority</Label>
        <ComboBox
          id="reporting-authority-input"
          name="reporting_authority"
          items={Array.from(
            { length: 50 },
            (_, index) => `Example Employee #${index} (EMP-${101 + index})`
          )}
          label="Reporting Authority"
          placeholder="Search an employee..."
        />
      </div> */}

      {/* <div className="flex flex-col gap-2">
        <Label htmlFor="leave-sanction-authority-input">
          Leave Sanction Authority
        </Label>
        <ComboBox
          id="leave-sanction-authority-input"
          name="leave_sanction_authority"
          items={Array.from(
            { length: 50 },
            (_, index) => `Example Employee #${index} (EMP-${101 + index})`
          )}
          label="Leave Sanction Authority"
          placeholder="Search an employee..."
        />
      </div> */}
    </div>
  );
}
