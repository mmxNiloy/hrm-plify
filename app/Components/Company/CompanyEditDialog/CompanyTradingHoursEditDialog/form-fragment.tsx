"use client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ICompanyTradingHour } from "@/schema/CompanySchema";
import { weekDays } from "@/utils/Misc";
import React, { useCallback } from "react";

export default function CompanyTradingHoursFormFragment({
  data,
}: {
  data: ICompanyTradingHour[];
}) {
  const getStatusString = useCallback(
    (day: string) => {
      const t = data.find((th) => th.day_name === day);
      return t ? (t.trade_status == 0 ? "close" : "open") : "";
    },
    [data]
  );

  const getOpeningTime = useCallback(
    (day: string) => {
      const status = getStatusString(day);
      if (status === "open")
        return data.find((th) => th.day_name === day)!.opening_time;
      else return "Closed";
    },
    [data, getStatusString]
  );

  const getClosingTime = useCallback(
    (day: string) => {
      const status = getStatusString(day);
      if (status === "open")
        return data.find((th) => th.day_name === day)!.closing_time;
      else return "Closed";
    },
    [data, getStatusString]
  );
  return (
    <>
      <p>Day</p>
      <p>Status</p>
      <p>Opening Time</p>
      <p>Closing Time</p>
      {weekDays.map((day, index) => (
        <React.Fragment key={`${day}-trading-hour-input`}>
          <Input readOnly defaultValue={day} name="day_name" />
          <Select name="trade_status" defaultValue={getStatusString(day)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Trade Status" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select Trade Status</SelectLabel>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="close">Close</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Input
            type="time"
            disabled={getOpeningTime(day) === "Closed"}
            name="opening_time"
            defaultValue={getOpeningTime(day)}
            placeholder={getOpeningTime(day)}
          />
          <Input
            type="time"
            disabled={getClosingTime(day) === "Closed"}
            name="closing_time"
            defaultValue={getClosingTime(day)}
            placeholder={getClosingTime(day)}
          />
        </React.Fragment>
      ))}
    </>
  );
}
