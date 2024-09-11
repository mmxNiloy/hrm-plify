import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IFormFragmentProps } from "@/utils/Types";
import { IEmployeeEducationalDetail } from "@/schema/EmployeeSchema";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import Icons from "@/components/ui/icons";
import { ButtonBlue } from "@/styles/button.tailwind";

export default function EducationDetailsFormFragment({
  data,
  readOnly,
  disabled,
}: IFormFragmentProps<IEmployeeEducationalDetail>) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <Label
          className={cn(
            readOnly ? "" : "after:content-['*'] after:text-red-500 after:ml-1"
          )}
          htmlFor="institution-name-input"
        >
          Institution Name
        </Label>
        <Input
          id="institution-name-input"
          key={`institution-name-${data?.institution_name}`}
          name="institution_name"
          readOnly={readOnly}
          disabled={disabled}
          defaultValue={data?.institution_name}
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label
          className={cn(
            readOnly ? "" : "after:content-['*'] after:text-red-500 after:ml-1"
          )}
          htmlFor="qualification-input"
        >
          Qualification
        </Label>
        <Input
          id="qualification-input"
          key={`qualification-${data?.qualification}`}
          name="qualification"
          readOnly={readOnly}
          disabled={disabled}
          defaultValue={data?.qualification}
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="subject-input">Subject</Label>
        <Input
          id="subject-input"
          key={`subject-${data?.subject}`}
          name="subject"
          readOnly={readOnly}
          disabled={disabled}
          defaultValue={data?.subject ?? ""}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="passing-year-input">Passing Year</Label>
        <Input
          id="passing-year-input"
          key={`passing-year-${data?.passing_year}`}
          name="passing_year"
          readOnly={readOnly}
          disabled={disabled}
          defaultValue={data?.passing_year ?? ""}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="grade-input">Grade</Label>
        <Input
          id="grade-input"
          key={`grade-${data?.grade}`}
          name="grade"
          readOnly={readOnly}
          disabled={disabled}
          defaultValue={data?.grade ?? ""}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="transcript-link-input">Transcript</Label>
        {!readOnly ? (
          <Input
            disabled={disabled}
            id="transcript-link-input"
            type="file"
            name="transcript"
          />
        ) : (
          <Link
            className="w-full"
            href={data?.transcript_link ?? "#transcript-download"}
            passHref
          >
            <Button
              id="transcript-download"
              disabled={!data || !data.transcript_link}
              className={cn(ButtonBlue, "w-full")}
            >
              <Icons.download /> View Transcript
            </Button>
          </Link>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="certificate-link-input">Certificate</Label>
        {!readOnly ? (
          <Input
            disabled={disabled}
            id="certificate-link-input"
            type="file"
            name="certificate"
          />
        ) : (
          <Link
            className="w-full"
            href={data?.certificate_link ?? "#certificate-download"}
            passHref
          >
            <Button
              id="certificate-download"
              disabled={!data || !data.certificate_link}
              className={cn(ButtonBlue, "w-full")}
            >
              <Icons.download /> View Certificate
            </Button>
          </Link>
        )}
      </div>
    </>
  );
}
