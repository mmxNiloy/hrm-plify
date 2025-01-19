import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ComboBox } from "@/components/ui/combobox";
import { FilePicker } from "@/components/ui/file-picker";
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
import { cn } from "@/lib/utils";
import { IChangeOfCircumstances } from "@/schema/EmployeeSchema";
import { countryNames, nationalities } from "@/utils/Misc";
import React, { useState } from "react";

export default function NIDAndOtherDetailForm({
  defaultData,
}: {
  defaultData?: IChangeOfCircumstances;
}) {
  const [otherDocuments, setOtherDocuments] = useState<string[]>([
    "New Document",
  ]);
  const [currentAccordion, setCurrentAccordion] = useState<string>("doc-0");

  return (
    <div className="flex flex-col gap-4">
      <div className="border rounded-md p-4 grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2">
        <div className="col-span-full flex flex-col gap-1">
          <p className="text-lg font-semibold">National ID Details</p>
          <Separator />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="national-id-number-input">National ID No.</Label>
          <Input
            defaultValue={defaultData?.national_id_number ?? ""}
            placeholder="National ID Number"
            id="national-id-number-input"
            name="national_id_number"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Select Nationality</Label>
          <ComboBox
            defaultValue={defaultData?.nationality ?? ""}
            placeholder="Search nationality..."
            label="Select Nationality"
            items={nationalities}
            name="nid_nationality"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Select Country of Residence</Label>
          <ComboBox
            defaultValue={defaultData?.country ?? ""}
            placeholder="Search country..."
            label="Select Country of Residence"
            items={countryNames}
            name="nid_nationality"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="date-issued-input">Date Issued</Label>
          <Input
            defaultValue={
              defaultData?.nid_date_issued?.toLocaleDateString("en-GB") ?? ""
            }
            id="date-issued-input"
            placeholder="Date Issued"
            name="nid_date_issued"
            type="date"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="expiry-date-input">Expiry Date</Label>
          <Input
            defaultValue={
              defaultData?.nid_expiry_date?.toLocaleDateString("en-GB") ?? ""
            }
            id="expiry-date-input"
            placeholder="Expiry Date"
            name="nid_expiry_date"
            type="date"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="eligible-review-date-input">
            Eligible Review Date
          </Label>
          <Input
            defaultValue={
              defaultData?.nid_eligible_review_date?.toLocaleDateString(
                "en-GB"
              ) ?? ""
            }
            id="eligible-review-date-input"
            readOnly
            placeholder="Eligible Review Date"
            name="nid_eligible_review_date"
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
          <FilePicker
            className="data-[error=true]:border-red-500"
            id="upload-document-input"
            name="nid_document"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="current-passport-radio">
            Is this your current status?
          </Label>
          <RadioGroup
            defaultValue={defaultData?.nid_current_status ?? "yes"}
            id="current-passport-radio"
            name="nid_current_status"
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
            defaultValue={defaultData?.nid_remarks ?? ""}
            placeholder="Remarks"
            id="remarks-input"
            name="nid_remarks"
          />
        </div>
      </div>

      <div className="border rounded-md p-4 flex flex-col gap-2">
        <div className="col-span-full flex flex-col gap-1">
          <p className="text-lg font-semibold">Other Details</p>
          <Separator />
        </div>

        <Accordion
          type="single"
          value={currentAccordion}
          onValueChange={setCurrentAccordion}
          collapsible
          defaultValue="doc-0"
        >
          {otherDocuments.map((doc, index) => (
            <AccordionItem key={`doc-${index}`} value={`doc-${index}`}>
              <AccordionTrigger>
                <p className="flex gap-2">
                  <Icons.document />
                  {doc}
                </p>
              </AccordionTrigger>
              <AccordionContent className="px-4">
                <OtherDocumentForm
                  defaultName={doc}
                  isDeleteable={index > 0}
                  onDocNameChange={(val) => {
                    const temp = [...otherDocuments];
                    temp[index] = val;
                    setOtherDocuments(temp);
                  }}
                  onDelete={() => {
                    setCurrentAccordion("");
                    setOtherDocuments((oldDocs) =>
                      oldDocs.filter((_, idx) => idx != index)
                    );
                  }}
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <Button
          onClick={() => {
            setOtherDocuments((oldDocs) => [
              ...oldDocs,
              `New Document #${oldDocs.length}`,
            ]);
          }}
          type="button"
          size="sm"
          className="col-span-full gap-1 bg-green-500 hover:bg-green-400 text-white rounded-full"
        >
          <Icons.plus /> Add another document
        </Button>
      </div>

      <div className="border rounded-md p-4 grid grid-cols-2 gap-x-4 gap-y-2">
        <div className="col-span-full flex flex-col gap-1">
          <p className="text-lg font-semibold">Remarks</p>
          <Separator />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="change-date-input">Change Date</Label>
          <Input id="change-date-input" type="date" name="change_date" />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="final-remarks-input">
            Remarks/Restriction to work
          </Label>
          <Input
            id="final-remarks-input"
            name="final_remarks"
            placeholder="Remarks/Restriction to work"
          />
        </div>

        <div
          className="flex flex-col gap-2"
          title="Are Sponsored migrants aware that they must inform HR/line manager promptly of changes in contact Details?"
        >
          <Label className="flex gap-4">
            Are Sponsored migrants aware that...{" "}
            <Icons.help className="size-4" />
          </Label>
          <Select name="is_informed">
            <SelectTrigger>
              <SelectValue placeholder="Select an Option" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select an option</SelectLabel>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
                <SelectItem value="n/a">N/A</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div
          className="flex flex-col gap-2"
          title="Are Sponsored migrants aware that they need to cooperate Home Office interview by presenting original passports during the Interview (In applicable cases)?"
        >
          <Label className="flex gap-4">
            Are Sponsored migrants aware that...{" "}
            <Icons.help className="size-4" />
          </Label>
          <Select name="is_cooperative">
            <SelectTrigger>
              <SelectValue placeholder="Select an Option" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select an option</SelectLabel>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
                <SelectItem value="n/a">N/A</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

function OtherDocumentForm({
  isDeleteable = true,
  onDocNameChange,
  defaultName,
  onDelete,
}: {
  isDeleteable?: boolean;
  onDocNameChange?: (value: string) => void;
  defaultName?: string;
  onDelete?: () => void;
}) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2">
      <div className="flex flex-col gap-2">
        <Label htmlFor="doc-name-input">Document Name</Label>
        <Input
          defaultValue={defaultName}
          onChange={(e) => {
            if (onDocNameChange && e.target.value.length > 0)
              onDocNameChange(e.target.value);
          }}
          placeholder="Document Name"
          id="doc-name-input"
          name="other_document_name"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="doc-ref-number-input">Document Reference Number</Label>
        <Input
          placeholder="Document Reference Number"
          id="doc-ref-number-input"
          name="other_document_reference_number"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Select Nationality</Label>
        <ComboBox
          placeholder="Search nationality..."
          label="Select Nationality"
          items={nationalities}
          name="other_nationality"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="date-issued-input">Date Issued</Label>
        <Input
          id="date-issued-input"
          placeholder="Date Issued"
          name="other_date_issued"
          type="date"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="expiry-date-input">Expiry Date</Label>
        <Input
          id="expiry-date-input"
          placeholder="Expiry Date"
          name="other_expiry_date"
          type="date"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="eligible-review-date-input">Eligible Review Date</Label>
        <Input
          id="eligible-review-date-input"
          readOnly
          placeholder="Eligible Review Date"
          name="other_eligible_review_date"
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
        <FilePicker
          className="data-[error=true]:border-red-500"
          id="upload-document-input"
          name="other_document"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="current-passport-radio">
          Is this your current status?
        </Label>
        <RadioGroup id="current-passport-radio" name="other_is_current_status">
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
        <Input placeholder="Remarks" id="remarks-input" name="other_remarks" />
      </div>

      <div
        className={cn(
          "flex flex-col gap-2",
          isDeleteable ? "visible" : "invisible"
        )}
      >
        <Label>Delete this document?</Label>
        <Button
          type="button"
          size="sm"
          variant={"destructive"}
          className={"rounded-full gap-1"}
          onClick={() => {
            if (onDelete) onDelete();
          }}
        >
          <Icons.minus />
          Delete this document?
        </Button>
      </div>
    </div>
  );
}
