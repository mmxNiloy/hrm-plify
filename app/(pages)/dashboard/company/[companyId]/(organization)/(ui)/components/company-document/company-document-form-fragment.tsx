import { FilePicker } from "@/components/ui/file-picker";
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
import SiteConfig from "@/utils/SiteConfig";
import { IFormFragmentProps } from "@/utils/Types";
import React from "react";

const docTypes = SiteConfig.data.documentTypes;

interface Props extends IFormFragmentProps<ICompanyDoc> {
  setDocError?: React.Dispatch<React.SetStateAction<Boolean>>;
}

export default function CompanyDocumentFormFragment({
  data,
  readOnly,
  disabled,
  setDocError,
}: Props) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <Label
          htmlFor="doc-name-input"
          className="after:text-red-500 after:ml-2 after:content-['*']"
        >
          Document Name
        </Label>
        <Input
          required
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
        <Label
          htmlFor="doc-type-select"
          className="after:text-red-500 after:ml-2 after:content-['*']"
        >
          Document Type
        </Label>
        <Select
          required
          name="doc_type"
          defaultValue={data?.doc_type ?? undefined}
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
        <Label
          htmlFor="doc-name-input"
          className="after:text-red-500 after:ml-2 after:content-['*']"
        >
          Document File
        </Label>
        <FilePicker
          required
          id="doc-file-input"
          name="doc_file"
          onError={() => {
            if (setDocError) setDocError(true);
          }}
          onSuccess={() => {
            if (setDocError) setDocError(false);
          }}
          className="data-[error=true]:border-red-500"
          placeholder="Document File"
          readOnly={readOnly}
          disabled={disabled}
        />
      </div>
    </>
  );
}
