"use client";
import { ComboBox } from "@/components/ui/combobox";
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
import { IEmployeeWithUserMetadata } from "@/schema/EmployeeSchema";
import { IHoliday, IHolidayType } from "@/schema/HolidaySchema";
import { IEmployeeUserRole, IUserConfig } from "@/schema/UserSchema";
import { RequiredAsterisk } from "@/styles/label.tailwind";
import { dateDiffInDays, weekDays } from "@/utils/Misc";
import { IFormFragmentProps } from "@/utils/Types";
import React, { useState } from "react";

interface Props extends IFormFragmentProps<IHoliday> {
  holidayTypes: IHolidayType[];
}

export default function HolidayFormFragment({
  data,
  readOnly,
  disabled,
  holidayTypes,
}: Props) {
  const [startDate, setStartDate] = useState<Date | undefined>(
    data ? new Date(data.start_date) : undefined
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    data ? new Date(data.end_date) : undefined
  );

  return (
    <>
      <div className="flex flex-col gap-2 col-span-full">
        <Label className={RequiredAsterisk}>Holiday Type</Label>
        <Select
          key={`holiday-type-${data?.holiday_type_id ?? ""}`}
          defaultValue={`${data?.holiday_type_id ?? ""}`}
          name="holiday_type_id"
          required
          disabled={disabled || readOnly}
        >
          <SelectTrigger>
            <SelectValue placeholder={"Select a Holiday Type"} />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select a Holiday Type</SelectLabel>

              {holidayTypes.map((item) => (
                <SelectItem
                  key={`select-holiday-type-${item.holiday_type_id}`}
                  value={`${item.holiday_type_id}`}
                >
                  {item.holiday_type_name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label className={RequiredAsterisk}>Start Date</Label>
        <Input
          key={`start-date-${data?.start_date ?? ""}`}
          defaultValue={
            data?.start_date
              ? new Date(data.start_date).toLocaleDateString("en-GB")
              : undefined
          }
          name="start_date"
          type="date"
          placeholder="Start Date"
          required
          readOnly={readOnly}
          disabled={disabled}
          onChange={(e) => setStartDate(new Date(e.currentTarget.value))}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label className={RequiredAsterisk}>End Date</Label>
        <Input
          key={`end-date-${data?.end_date ?? ""}`}
          defaultValue={
            data?.end_date
              ? new Date(data.end_date).toLocaleDateString("en-GB")
              : undefined
          }
          name="end_date"
          type="date"
          placeholder="End Date"
          required
          readOnly={readOnly}
          disabled={disabled}
          onChange={(e) => setEndDate(new Date(e.currentTarget.value))}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label className={RequiredAsterisk}>No. of Days</Label>
        <Input
          defaultValue={
            data
              ? dateDiffInDays(
                  new Date(data.start_date),
                  new Date(data.end_date)
                ).toString()
              : undefined
          }
          value={
            startDate && endDate
              ? dateDiffInDays(startDate, endDate)
              : undefined
          }
          placeholder="Number of Days"
          readOnly
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label className={RequiredAsterisk}>Starting Day</Label>
        <Input
          defaultValue={
            data ? weekDays[new Date(data.start_date).getUTCDay()] : undefined
          }
          value={startDate ? weekDays[startDate.getUTCDay()] : undefined}
          placeholder="Starting Day"
          readOnly
        />
      </div>
    </>
  );
}
