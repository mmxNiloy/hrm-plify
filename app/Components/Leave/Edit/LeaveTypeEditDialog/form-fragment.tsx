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
        <Label className={RequiredAsterisk} htmlFor="leave-type-input">
          Leave Type
        </Label>
        <Input
          id="leave-type-input"
          key={`leave-type-${data?.leave_type}`}
          defaultValue={data?.leave_type}
          name="leave_type"
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
          name="leave_short_code"
          required
          readOnly={readOnly}
          disabled={disabled}
        />
      </div>

      <div className="flex flex-col gap-2 col-span-full">
        <Label htmlFor="leave-type-remarks-input">Remarks</Label>
        <Textarea
          className="resize-none"
          rows={3}
          id="leave-type-remarks-input"
          key={`leave-type-remarks-${data?.remarks}`}
          defaultValue={data?.remarks}
          name="remarks"
          readOnly={readOnly}
          disabled={disabled}
        />
      </div>
    </>
  );
}
