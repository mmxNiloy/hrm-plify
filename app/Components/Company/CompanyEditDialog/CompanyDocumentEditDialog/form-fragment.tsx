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
import { ICompanyDoc } from "@/schema/CompanySchema";
import { IFormFragmentProps } from "@/utils/Types";
import React from "react";

const docTypes = [
  "PAYEE And Account Reference Letter From HMRC",
  "Latest RTI from Accountant",
  "Employer Liability Insurance Certificate",
  "Proof of Business Premises (Tenancy Agreement)",
  "Copy Of Lease Or Freehold Property",
  "Business Bank statement for 1 Month",
  "Business Bank statement for 2 Month",
  "Business Bank statement for 3 Month",
  "SIGNED Annual account (if the business is over 18 months old)",
  "VAT Certificate (if registered)",
  "Copy of Health and safety star Rating (Applicable for food business only)",
  "Registered Business License or Certificate",
  "Franchise Agreement",
  "Governing Body Registration",
  "Copy Of Health & Safety Star Rating",
  "Audited Annual Account (if you have)",
  "Regulatory body certificate if applicable to your business such as ACCA, FCA , OFCOM, IATA, ARLA",
  "Others Document",
];

export default function CompanyDocumentFormFragment({
  data,
  readOnly,
  disabled,
}: IFormFragmentProps<ICompanyDoc>) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <Label htmlFor="doc-name-input">Document Name</Label>
        <Input
          className="rounded-full"
          id="doc-name-input"
          name="doc_name"
          defaultValue={data?.doc_name ?? ""}
          placeholder="Document Name"
          readOnly={readOnly}
          disabled={disabled}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="doc-type-select">Document Type</Label>
        <Select
          name="doc_type"
          defaultValue={data?.doc_name ?? ""}
          disabled={readOnly || disabled}
        >
          <SelectTrigger className="rounded-full" id="doc-type-select">
            <SelectValue placeholder="Select a document type" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Document Type</SelectLabel>
              {docTypes.map((dt) => (
                <SelectItem value={dt} key={dt}>
                  {dt}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="doc-name-input">Document File</Label>
        <Input
          className="rounded-full"
          id="doc-file-input"
          name="doc_file"
          type="file"
          placeholder="Document File"
          readOnly={readOnly}
          disabled={disabled}
        />
      </div>
    </>
  );
}
