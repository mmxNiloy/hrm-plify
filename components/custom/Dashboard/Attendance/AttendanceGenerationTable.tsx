"use client";
import { generateAttendance } from "@/app/(server)/actions/generateAttendance";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { StaticDataTable } from "@/components/ui/data-table";
import Icons from "@/components/ui/icons";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { IAttendanceRecord } from "@/schema/AttendanceSchema";
import { IEmployeeWithUserMetadata } from "@/schema/EmployeeSchema";
import { ButtonSuccess } from "@/styles/button.tailwind";
import { RequiredAsterisk } from "@/styles/label.tailwind";
import { getFullNameOfEmployee } from "@/utils/Misc";
import { format } from "date-fns";
import React, { useCallback, useState } from "react";
import { DateRange } from "react-day-picker";
import { AttendanceGenerationRecordDataTableColumns } from "../../DataTable/Columns/Attendance/AttendanceGenerationRecordDataTableColumns";

interface Props {
  companyId: number;
  employees: IEmployeeWithUserMetadata[];
}

export default function AttendanceGenerationTable({
  companyId,
  employees,
}: Props) {
  const [date, setDate] = useState<DateRange | undefined>();
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [attendance, setAttendance] = useState<IAttendanceRecord[]>([]);
  const [employee, setEmployee] = useState<
    IEmployeeWithUserMetadata | undefined
  >();

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();

      if (!date || !date.from || !date.to) {
        toast({
          title: "Date Range Error",
          description:
            "Invalid date range selected. Please select a valid date range and try again.",
          variant: "destructive",
        });
        return;
      }

      const fd = new FormData(e.currentTarget);
      const data = {
        employee_id: Number.parseInt(
          (fd.get("employee_id") as string | undefined) ?? "0"
        ),
        company_id: companyId,
        from_date: fd.get("datepicker_from_date") as string,
        to_date: fd.get("datepicker_to_date") as string,
      };

      setLoading(true);

      const mAttendance = await generateAttendance(data);
      if (!mAttendance) {
        toast({
          title: "Attendance Generation Failed",
          description:
            "Failed to generate attendance. Please check the logs for details.",
          variant: "destructive",
        });
      } else {
        setAttendance(mAttendance.new_records);
      }

      setLoading(false);
    },
    [companyId, date, toast]
  );

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-3 gap-4 items-end justify-center"
      >
        <div className="flex flex-col gap-2">
          <Label className={RequiredAsterisk}>Employee</Label>
          <Select
            required
            name={"employee_id"}
            onValueChange={(e) =>
              setEmployee(employees.find((item) => `${item.employee_id}` === e))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an Employee" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select an Employee</SelectLabel>
                {employees.map((item) => (
                  <SelectItem
                    key={`company-employee-${item.employee_id}`}
                    value={`${item.employee_id}`}
                  >
                    {getFullNameOfEmployee(item)}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label className={RequiredAsterisk}>Select a Date Range</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
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
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={1}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex flex-col gap-2">
          {/* Error message upon submit */}
          {!date ||
            (!date.to && (
              <p className="text-red-500 text-xs">
                {!date || !date.from
                  ? "A date range is required"
                  : !date.to
                  ? "An ending date is required"
                  : ""}
              </p>
            ))}
          <Button
            disabled={!date || !date.from || !date.to || loading}
            className={ButtonSuccess}
            type="submit"
          >
            {loading ? (
              <Icons.spinner className="animate-spin ease-in-out" />
            ) : (
              <Icons.check />
            )}
            {loading ? "Generating..." : "Submit"}
          </Button>
        </div>
      </form>

      <StaticDataTable
        loading={loading}
        data={attendance.map((item) => ({ ...item, employee }))}
        columns={AttendanceGenerationRecordDataTableColumns}
      />
    </>
  );
}
