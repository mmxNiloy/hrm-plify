"use client";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { months, toYYYYMMDD } from "@/utils/Misc";
import React, { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface MonthPickerProps extends React.HTMLAttributes<HTMLInputElement> {
  contentClassName?: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
}

const MonthPicker = React.forwardRef<HTMLInputElement, MonthPickerProps>(
  (
    { className, contentClassName, name, required, disabled, ...props },
    ref
  ) => {
    const defaultDate = useMemo(() => {
      if (props.defaultValue) {
        return new Date(props.defaultValue as string);
      }

      return new Date();
    }, [props.defaultValue]);

    const [month, setMonth] = useState<number>(defaultDate.getMonth());
    const [year, setYear] = useState<number>(defaultDate.getFullYear());

    return (
      <>
        <Input
          required={required}
          name={name}
          disabled={disabled}
          className="sr-only"
          ref={ref}
          readOnly
          value={toYYYYMMDD(new Date(Date.UTC(year, month, 1, 0, 0, 0, 0)))}
          type="date"
          {...props}
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              disabled={disabled}
              variant={"outline"}
              className={cn("gap-2 justify-between", className)}
            >
              <p>
                {months[month]}, {year}
              </p>
              <Icons.calendar />
            </Button>
          </PopoverTrigger>

          <PopoverPrimitive.Content
            align="start"
            sideOffset={4}
            className={cn(
              "z-50 w-auto flex flex-col gap-4 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
              contentClassName
            )}
          >
            {/* Year Navigation */}
            <div className="flex flex-row gap-2 items-center justify-between">
              <Button
                type="button"
                size="icon"
                variant={"ghost"}
                onClick={() => setYear((oldYear) => Math.max(0, oldYear - 1))}
              >
                <Icons.chevronLeft />
              </Button>
              <Input
                key={`selected-year-${year}`}
                className="w-32"
                defaultValue={year}
                type="number"
                min={0}
                onChange={(e) => {
                  var mYear = Number.parseInt(e.target.value);
                  if (Number.isNaN(mYear)) mYear = new Date().getFullYear();
                  setYear(mYear);
                }}
              />
              <Button
                type="button"
                size="icon"
                variant={"ghost"}
                onClick={() => setYear((oldYear) => oldYear + 1)}
              >
                <Icons.chevronRight />
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {months.map((mn, index) => (
                <Button
                  type="button"
                  variant={months[month] !== mn ? "outline" : "default"}
                  className={cn(
                    months[month] === mn
                      ? "bg-blue-500 text-white hover:bg-blue-400"
                      : ""
                  )}
                  onClick={() => setMonth(index)}
                  key={`monthpicker-month-${mn}`}
                >
                  {mn}
                </Button>
              ))}
            </div>

            <PopoverPrimitive.PopoverClose asChild>
              <Button>
                <Icons.check />
                Done
              </Button>
            </PopoverPrimitive.PopoverClose>
          </PopoverPrimitive.Content>
        </Popover>
      </>
    );
  }
);
MonthPicker.displayName = "MonthPicker";

export { MonthPicker };
