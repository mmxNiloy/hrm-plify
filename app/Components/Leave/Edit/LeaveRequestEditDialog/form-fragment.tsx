"use client";

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
import { Textarea } from "@/components/ui/textarea";
import { ILeaveRequest, ILeaveRule, ILeaveType } from "@/schema/LeaveSchema";
import { RequiredAsterisk } from "@/styles/label.tailwind";
import { toYYYYMMDD } from "@/utils/Misc";
import { IFormFragmentProps } from "@/utils/Types";
import React from "react";

interface Props extends IFormFragmentProps<ILeaveRequest> {
  leaveTypes?: ILeaveType[];
}

export default function LeaveRequestFormFragment({
  data,
  readOnly,
  disabled,
  leaveTypes = [],
}: Props) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <Label
          className={RequiredAsterisk}
          htmlFor="leave-type-short-code-input"
        >
          Leave Type
        </Label>
        <Select
          key={`leave-type-short-code-${data?.leave_type_id}`}
          defaultValue={data ? `${data?.leave_type_id}` : ""}
          name="leave_type_id"
          required
          disabled={disabled || readOnly || Boolean(data)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Leave Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select Leave Type</SelectLabel>
              {leaveTypes.map((item) => (
                <SelectItem
                  value={`${item.leave_type_id}`}
                  key={`${item.leave_type_id}`}
                >
                  {item.leave_type_name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label className={RequiredAsterisk}>Start Date</Label>
        <Input
          type="date"
          id="start-date-input"
          key={`start-date-${
            data ? toYYYYMMDD(new Date(data.start_date)) : ""
          }`}
          placeholder="Start Date"
          defaultValue={data ? toYYYYMMDD(new Date(data.start_date)) : ""}
          name="start_date"
          readOnly={readOnly}
          disabled={disabled}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label className={RequiredAsterisk}>End Date</Label>
        <Input
          type="date"
          id="end-date-input"
          key={`end-date-${data ? toYYYYMMDD(new Date(data.end_date)) : ""}`}
          placeholder="End Date"
          defaultValue={data ? toYYYYMMDD(new Date(data.end_date)) : ""}
          name="end_date"
          readOnly={readOnly}
          disabled={disabled}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Reason</Label>
        <Textarea
          rows={3}
          placeholder="Write a short reason for your leave..."
          name="reason"
          maxLength={200}
          className="resize-none"
          key={`reason-${data?.reason}`}
          defaultValue={data?.reason}
          readOnly={readOnly}
          disabled={disabled}
        />
      </div>

      {data && (
        <div className="flex flex-col gap-2">
          <Select
            key={`leave-request-status-${data?.status}`}
            defaultValue={data?.status}
            name="status"
            disabled={disabled || readOnly}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Leave Request Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select leave request status</SelectLabel>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      )}
    </>
  );
}
