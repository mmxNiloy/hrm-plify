"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import Icons from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { searchParamsParsers } from "@/utils/searchParamsParsers";
import { format } from "date-fns";
import { useQueryState } from "nuqs";
import React, { useCallback, useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  name?: string;
  required?: boolean;
  requireRangeEnd?: boolean;
  onValueChange?: (dateRange?: DateRange) => void;
}

const RangedDatePicker = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, name, required, requireRangeEnd, onValueChange, ...props },
    ref
  ) => {
    const [fromDate, setFromDate] = useQueryState(
      "fromDate",
      searchParamsParsers.fromDate
    );

    const [toDate, setToDate] = useQueryState(
      "toDate",
      searchParamsParsers.toDate
    );

    const [date, setDate] = useState<DateRange | undefined>(
      fromDate
        ? {
            from: fromDate,
            to: toDate ?? undefined,
          }
        : undefined
    );

    useEffect(() => {
      if (date?.from) {
        setFromDate(date.from);
      } else {
        setFromDate(null);
      }

      if (date?.to) {
        setToDate(date.to);
      } else {
        setToDate(null);
      }

      if (!date) {
        setFromDate(null);
        setToDate(null);
      }
    }, [date, setFromDate, setToDate]);

    return (
      <>
        <Popover
          data-error={
            !date
              ? "no-value"
              : !date.from
              ? "no-start"
              : !date.to
              ? "no-end"
              : "no-error"
          }
        >
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground",
                className
              )}
            >
              <Icons.calendar className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              captionLayout="dropdown-buttons"
              defaultMonth={date?.from}
              selected={date}
              onSelect={(mDate) => {
                if (onValueChange) {
                  onValueChange(mDate);
                }
                setDate(mDate);
              }}
              numberOfMonths={1}
            />
          </PopoverContent>
        </Popover>
      </>
    );
  }
);
RangedDatePicker.displayName = "RangedDatePicker";

export { RangedDatePicker };
