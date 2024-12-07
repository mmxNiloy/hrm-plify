"use client";

import { FilePicker } from "@/components/ui/file-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { IJobApplicant } from "@/schema/JobSchema";
import { RequiredAsterisk } from "@/styles/label.tailwind";
import { IFormFragmentProps } from "@/utils/Types";
import React, { useState } from "react";

interface Props extends IFormFragmentProps<IJobApplicant> {
  onResumeCVDocumentError?: React.Dispatch<React.SetStateAction<boolean>>;
  onCoverLetterDocumentError?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function JobApplicantFormFragment({
  data,
  readOnly,
  disabled,
  onResumeCVDocumentError,
  onCoverLetterDocumentError,
}: Props) {
  const [email, setEmail] = useState<string>("");
  return (
    <>
      <div className="flex flex-col gap-2">
        <Label className={RequiredAsterisk}>First Name</Label>
        <Input
          defaultValue={data?.first_name}
          name="first_name"
          required
          readOnly={readOnly}
          disabled={disabled}
          placeholder="First Name"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Middle Name</Label>
        <Input
          defaultValue={data?.middle_name}
          name="middle_name"
          readOnly={readOnly}
          disabled={disabled}
          placeholder="Middle Name"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label className={RequiredAsterisk}>Last Name</Label>
        <Input
          defaultValue={data?.last_name}
          name="last_name"
          required
          readOnly={readOnly}
          disabled={disabled}
          placeholder="Last Name"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label className={RequiredAsterisk}>Email</Label>
        <Input
          className={cn(email.length > 0 ? "invalid:border-red-500" : "")}
          defaultValue={data?.email}
          onChange={(e) => setEmail(e.currentTarget.value.trim())}
          type="email"
          name="email"
          required
          readOnly={readOnly}
          disabled={disabled}
          placeholder="Email"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label className={RequiredAsterisk}>Résumé / CV</Label>
        <FilePicker
          name="resume_cv_document"
          accept=".pdf, .doc, .docx, .txt, .html, .rtf, .odt"
          required
          disabled={disabled}
          onError={() => {
            if (onResumeCVDocumentError) onResumeCVDocumentError(true);
          }}
          onSuccess={() => {
            if (onResumeCVDocumentError) onResumeCVDocumentError(false);
          }}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Cover Letter</Label>
        <FilePicker
          name="cover_letter_document"
          accept=".pdf, .doc, .docx, .txt, .html, .rtf, .odt"
          disabled={disabled}
          onError={() => {
            if (onCoverLetterDocumentError) onCoverLetterDocumentError(true);
          }}
          onSuccess={() => {
            if (onCoverLetterDocumentError) onCoverLetterDocumentError(false);
          }}
        />
      </div>
    </>
  );
}
