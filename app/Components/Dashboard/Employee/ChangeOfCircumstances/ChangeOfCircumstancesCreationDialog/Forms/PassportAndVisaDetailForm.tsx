import { Button } from "@/components/ui/button";
import { ComboBox } from "@/components/ui/combobox";
import Icons from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { countryNames, nationalities } from "@/utils/Misc";
import React from "react";

export default function PassportAndVisaDetailForm() {
  return (
    <div className="flex flex-col gap-4">
      <div className="border rounded-md p-4 grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2">
        <div className="col-span-full flex flex-col gap-1">
          <p className="text-lg font-semibold">Passport Details</p>
          <Separator />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="passort-number-input">Passport No.</Label>
          <Input
            id="passport-number-input"
            placeholder="Passport Number"
            name="passport_number"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Select Nationality</Label>
          <ComboBox
            placeholder="Search nationality..."
            label="Select Nationality"
            items={nationalities}
            name="passport_nationality"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="place-of-birth-input">Place of Birth</Label>
          <Input
            id="place-of-birth-input"
            placeholder="Place of Birth"
            name="place_of_birth"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="issued-by-input">Issued by</Label>
          <Input
            id="issued-by-input"
            placeholder="Issued by"
            name="issued_by"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="date-issued-input">Date Issued</Label>
          <Input
            id="date-issued-input"
            placeholder="Date Issued"
            name="date_issued"
            type="date"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="expiry-date-input">Expiry Date</Label>
          <Input
            id="expiry-date-input"
            placeholder="Expiry Date"
            name="expiry_date"
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
            name="eligible_review_date"
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
          <Input
            type="file"
            id="upload-document-input"
            name="passport_document"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="current-passport-radio">
            Is this your current passport?
          </Label>
          <RadioGroup id="current-passport-radio" name="is_current_passport">
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
            placeholder="Remarks"
            id="remarks-input"
            name="passport_remarks"
          />
        </div>
      </div>

      <div className="border rounded-md p-4 grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2">
        <div className="col-span-full flex flex-col gap-1">
          <p className="text-lg font-semibold">Visa/BRP Details</p>
          <Separator />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="visa-number-input">BRP/Visa No.</Label>
          <Input
            id="visa-number-input"
            placeholder="Visa/BRP Number"
            name="visa_number"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Select Nationality</Label>
          <ComboBox
            placeholder="Search nationality..."
            label="Select Nationality"
            items={nationalities}
            name="visa_nationality"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="country-of-residence-input">
            Country of Residence
          </Label>
          <ComboBox
            name="country_of_residence"
            placeholder="Search a country..."
            title="Select the Country of Residence"
            items={countryNames}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="issued-by-input">Issued by</Label>
          <Input
            id="issued-by-input"
            placeholder="Issued by"
            name="visa_issued_by"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="date-issued-input">Date Issued</Label>
          <Input
            id="date-issued-input"
            placeholder="Date Issued"
            name="vis_date_issued"
            type="date"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="expiry-date-input">Expiry Date</Label>
          <Input
            id="expiry-date-input"
            placeholder="Expiry Date"
            name="visa_expiry_date"
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
            name="visa_eligible_review_date"
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
          <Input type="file" id="upload-document-input" name="visa_document" />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Current Bank Side Document</Label>
          <Button type="button" variant="outline" size={"sm"} className="gap-1">
            <Icons.download />
            Filename
          </Button>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="upload-bank-side-document-input">
            Upload Bank Side Document
          </Label>
          <Input
            type="file"
            id="upload-bank-side-document-input"
            name="visa_bank_document"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="current-passport-radio">
            Is this your current passport?
          </Label>
          <RadioGroup id="current-passport-radio" name="is_current_visa">
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
          <Input placeholder="Remarks" id="remarks-input" name="visa_remarks" />
        </div>
      </div>
    </div>
  );
}
