"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ILeaveType } from "@/schema/LeaveSchema";
import { RequiredAsterisk } from "@/styles/label.tailwind";
import { IFormFragmentProps } from "@/utils/Types";
import React from "react";

export default function LeaveTypeFormFragment({
  data,
  readOnly,
  disabled,
}: IFormFragmentProps<ILeaveType>) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <Label className={RequiredAsterisk} htmlFor="leave-type-name-input">
          Leave Type
        </Label>
        <Input
          id="leave-type-name-input"
          key={`leave-type-name-${data?.leave_type_name}`}
          defaultValue={data?.leave_type_name}
          placeholder="Leave Type"
          name="leave_type_name"
          required
          readOnly={readOnly}
          disabled={disabled}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label
          className={RequiredAsterisk}
          htmlFor="leave-type-short-code-input"
        >
          Leave Type Short Code
        </Label>
        <Input
          id="leave-type-short-code-input"
          key={`leave-type-short-code-${data?.leave_short_code}`}
          defaultValue={data?.leave_short_code}
          placeholder="Leave Type Short Code"
          name="leave_short_code"
          required
          readOnly={readOnly}
          disabled={disabled}
        />
      </div>

      <div className="flex flex-col gap-2 col-span-full">
        <Label htmlFor="leave-type-description-input">Description</Label>
        <Textarea
          className="resize-none"
          rows={5}
          id="leave-type-description-input"
          key={`leave-type-description-${data?.description}`}
          placeholder="Description..."
          defaultValue={data?.description}
          name="description"
          readOnly={readOnly}
          disabled={disabled}
        />
      </div>
    </>
  );
}
