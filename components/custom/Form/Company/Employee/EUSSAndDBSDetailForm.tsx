import { Button } from "@/components/ui/button";
import { ComboBox } from "@/components/ui/combobox";
import Icons from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import { nationalities } from "@/utils/Misc";
import React from "react";

export default function EUSSAndDBSDetailForm({
  defaultData,
}: {
  defaultData?: IChangeOfCircumstances;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="border rounded-md p-4 grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2">
        <div className="col-span-full flex flex-col gap-1">
          <p className="text-lg font-semibold">EUSS/Time Limit Details</p>
          <Separator />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="reference-number-input">Reference No.</Label>
          <Input
            defaultValue={defaultData?.euss_reference_number ?? ""}
            id="reference-number-input"
            placeholder="Reference Number"
            name="euss_reference_number"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Select Nationality</Label>
          <ComboBox
            defaultValue={defaultData?.nationality ?? ""}
            placeholder="Search nationality..."
            label="Select Nationality"
            items={nationalities}
            name="euss_nationality"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="date-issued-input">Date Issued</Label>
          <Input
            defaultValue={defaultData?.euss_date_issued ?? ""}
            id="date-issued-input"
            placeholder="Date Issued"
            name="euss_date_issued"
            type="date"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="expiry-date-input">Expiry Date</Label>
          <Input
            defaultValue={
              defaultData?.euss_expiry_date?.toLocaleDateString("en-GB") ?? ""
            }
            id="expiry-date-input"
            placeholder="Expiry Date"
            name="euss_expiry_date"
            type="date"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="eligible-review-date-input">
            Eligible Review Date
          </Label>
          <Input
            defaultValue={
              defaultData?.euss_eligible_review_date?.toLocaleDateString(
                "en-GB"
              ) ?? ""
            }
            id="eligible-review-date-input"
            readOnly
            placeholder="Eligible Review Date"
            name="euss_eligible_review_date"
            type="date"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="current-document-button">Current Document</Label>
          <Button type="button" variant="outline" size={"sm"} className="gap-1">
            <Icons.download />
            Filename
          </Button>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="upload-document-input">Upload Document</Label>
          <Input type="file" id="upload-document-input" name="euss_document" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="current-passport-radio">
            Is this your current status?
          </Label>
          <RadioGroup
            defaultValue={defaultData?.euss_current_status ?? "yes"}
            id="current-passport-radio"
            name="euss_current_status"
          >
            <div className="flex gap-2 items-center">
              <RadioGroupItem value="yes" id="option-yes" />
              <Label htmlFor="option-yes">Yes</Label>
            </div>
            <div className="flex gap-2 items-center">
              <RadioGroupItem value="no" id="option-no" />
              <Label htmlFor="option-no">No</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="remarks-input">Remarks</Label>
          <Input
            defaultValue={defaultData?.euss_remarks}
            placeholder="Remarks"
            id="remarks-input"
            name="euss_remarks"
          />
        </div>
      </div>

      <div className="border rounded-md p-4 grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2">
        <div className="col-span-full flex flex-col gap-1">
          <p className="text-lg font-semibold">
            Disclosure and Barring Service(DBS) Details
          </p>
          <Separator />
        </div>

        <div className="flex flex-col gap-2">
          <Label>DBS Type</Label>
          <Select name="dbs_type">
            <SelectTrigger>
              <SelectValue placeholder="Select a DBS Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select a DBS Type</SelectLabel>
                <SelectItem value="basic">Basic</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="reference-number-input">Reference No.</Label>
          <Input
            id="reference-number-input"
            placeholder="Reference Number"
            name="dbs_reference_number"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Select Nationality</Label>
          <ComboBox
            placeholder="Search nationality..."
            label="Select Nationality"
            items={nationalities}
            name="dbs_nationality"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="date-issued-input">Date Issued</Label>
          <Input
            id="date-issued-input"
            placeholder="Date Issued"
            name="dbs_date_issued"
            type="date"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="expiry-date-input">Expiry Date</Label>
          <Input
            id="expiry-date-input"
            placeholder="Expiry Date"
            name="dbs_expiry_date"
            type="date"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="eligible-review-date-input">
            Eligible Review Date
          </Label>
          <Input
            id="eligible-review-date-input"
            readOnly
            placeholder="Eligible Review Date"
            name="dbs_eligible_review_date"
            type="date"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="current-document-button">Current Document</Label>
          <Button type="button" variant="outline" size={"sm"} className="gap-1">
            <Icons.download />
            Filename
          </Button>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="upload-document-input">Upload Document</Label>
          <Input type="file" id="upload-document-input" name="dbs_document" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="current-passport-radio">
            Is this your current status?
          </Label>
          <RadioGroup id="current-passport-radio" name="dbs_is_current_status">
            <div className="flex gap-2 items-center">
              <RadioGroupItem value="yes" id="option-yes" />
              <Label htmlFor="option-yes">Yes</Label>
            </div>
            <div className="flex gap-2 items-center">
              <RadioGroupItem value="no" id="option-no" />
              <Label htmlFor="option-no">No</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="remarks-input">Remarks</Label>
          <Input placeholder="Remarks" id="remarks-input" name="dbs_remarks" />
        </div>
      </div>
    </div>
  );
}
