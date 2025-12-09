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
import { toYYYYMMDD } from "@/utils/Misc";
import { format } from "date-fns";
import React, { useCallback, useState } from "react";
import { DateRange } from "react-day-picker";

interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  name?: string;
  readOnly?: boolean;
  disabled?: boolean;
}

const DatePicker = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, name, readOnly, disabled, ...props }, ref) => {
    const [date, setDate] = useState<Date | undefined>();

    return (
      <>
        <Popover data-error={!date ? "no-value" : "no-error"}>
          <PopoverTrigger asChild>
            <Button
              disabled={readOnly || disabled}
              id="date"
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground",
                className
              )}
            >
              <Icons.calendar className="mr-2 h-4 w-4" />
              {date ? format(date, "LLL, y") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              captionLayout="dropdown"
              selected={date}
              onSelect={setDate}
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
            defaultValue={date ? format(date, "yyyy-MM-dd") : undefined}
            {...props}
          />
          <Input
            type={"date"}
            readOnly
            defaultValue={date ? format(date, "yyyy-MM-dd") : undefined}
            name="datepicker_date"
          />
        </div>
      </>
    );
  }
);
DatePicker.displayName = "DatePicker";

export { DatePicker };
