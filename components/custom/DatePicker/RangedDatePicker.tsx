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
import { format } from "date-fns";
import React, { useCallback, useState } from "react";
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
    const [date, setDate] = useState<DateRange | undefined>();

    const getRangeString = useCallback(() => {
      if (!date) return "";
      const d1 = date.from ? format(date.from, "yyyy-MM-dd") : "";
      const d2 = date.to ? format(date.to, "yyyy-MM-dd") : "";
      return `${d1}-${d2}`;
    }, [date]);

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
        <div className="sr-only">
          <Input
            ref={ref}
            name={name}
            readOnly
            type={"text"}
            defaultValue={getRangeString()}
            required={required}
            {...props}
          />
          <Input
            type={"date"}
            readOnly
            defaultValue={
              date && date.from ? format(date.from, "yyyy-MM-dd") : undefined
            }
            name="datepicker_from_date"
          />
          <Input
            type={"date"}
            readOnly
            defaultValue={
              date && date.to ? format(date.to, "yyyy-MM-dd") : undefined
            }
            name="datepicker_to_date"
            required={requireRangeEnd}
          />
        </div>
      </>
    );
  }
);
RangedDatePicker.displayName = "RangedDatePicker";

export { RangedDatePicker };
