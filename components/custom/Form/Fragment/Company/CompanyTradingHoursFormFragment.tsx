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
import React, { useCallback, useState } from "react";

export default function CompanyTradingHoursFormFragment({
  data,
}: {
  data: ICompanyTradingHour[];
}) {
  const getStatusString = useCallback(
    (day: string) => {
      const t = data.find((th) => th.day_name === day);
      return t ? (t.trade_status == 0 ? "close" : "open") : "close";
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

  const [status, setStatus] = useState<boolean[]>(
    Array.from({ length: 7 }, (_, index) => {
      if (data.find((th) => weekDays[index] == th.day_name)?.trade_status == 1)
        return true;
      return false;
    })
  );

  const [startTime, setStartTime] = useState<string[]>(
    Array.from({ length: 7 }, (_) => "")
  );

  const getID = (day: string) => {
    const t = data.find((th) => th.day_name === day);
    return t ? t.id : -1;
  };

  return (
    <>
      <p>Day</p>
      <p>Status</p>
      <p>Opening Time</p>
      <p>Closing Time</p>
      {weekDays.map((day, index) => (
        <React.Fragment key={`${day}-trading-hour-input`}>
          <Input readOnly tabIndex={-1} defaultValue={day} name="day_name" />
          <Select
            key={`${day}-trading-hour-status-${getStatusString(day)}`}
            name="trade_status"
            defaultValue={getStatusString(day)}
            onValueChange={(val: ReturnType<typeof getStatusString>) => {
              setStatus((oldStatus) =>
                oldStatus.map((flag, idx) =>
                  idx == index ? (val === "open" ? true : false) : flag
                )
              );
            }}
          >
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
            required={status[index]}
            key={`${day}-trading-hour-starting-time-${getOpeningTime(day)}`}
            type="time"
            disabled={!status[index]}
            name="opening_time"
            defaultValue={getOpeningTime(day)}
            placeholder={getOpeningTime(day)}
            onChange={(e) => {
              const val = e.target.value;
              setStartTime((oldVal) =>
                oldVal.map((t, idx) => (idx == index ? val : t))
              );
            }}
          />
          <Input
            required={status[index]}
            key={`${day}-trading-hour-closing-time-${getClosingTime(day)}`}
            type="time"
            disabled={!status[index]}
            name="closing_time"
            defaultValue={getClosingTime(day)}
            placeholder={getClosingTime(day)}
          />
        </React.Fragment>
      ))}
    </>
  );
}
