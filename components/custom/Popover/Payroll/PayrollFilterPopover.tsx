"use client";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
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
import { cn } from "@/lib/utils";
import { IDepartment } from "@/schema/CompanySchema";
import { IDesignation } from "@/schema/DesignationSchema";
import { IEmployeeWithUserMetadata } from "@/schema/EmployeeSchema";
import { ButtonSuccess, ButtonWarn } from "@/styles/button.tailwind";
import { getFullNameOfEmployee } from "@/utils/Misc";
import React, { useState } from "react";
import { MonthPicker } from "../../DatePicker/MonthPicker";

interface Props {
  departments?: IDepartment[];
  designations?: IDesignation[];
  employees?: IEmployeeWithUserMetadata[];
  selectedEmployee?: string;
  selectedDate?: string;
}

export default function PayrollFilterPopover({
  departments = [],
  designations = [],
  employees = [],
  selectedEmployee,
  selectedDate,
}: Props) {
  const [department, setDepartment] = useState<string>("");
  const [designation, setDesignation] = useState<string>("");
  const [employee, setEmployee] = useState<string>("");

  return (
    <Popover>
      <PopoverTrigger className="group" asChild>
        <Button
          className={cn(
            ButtonWarn,
            "data-[state=open]:bg-red-500 data-[state=open]:hover:bg-red-400"
          )}
        >
          <div className="flex relative">
            <Icons.filter className="rotate-0 scale-100 transition-all group-data-[state=open]:rotate-180 group-data-[state=open]:scale-0" />
            <Icons.cross className="absolute rotate-180 scale-0 transition-all group-data-[state=closed]:hidden group-data-[state=open]:rotate-0 group-data-[state=open]:scale-100" />
          </div>
          Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[36rem]" align="end">
        <form className="grid grid-cols-1 gap-4 w-full">
          <div className="col-span-full flex flex-col gap-2">
            <Label>Employee</Label>
            <Select
              key={`selected-employee-${selectedEmployee}`}
              name="employee"
              defaultValue={selectedEmployee}
            >
              <SelectTrigger className="z-[100]">
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
                      ({item.employee_code}) - {getFullNameOfEmployee(item)}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Pay Period</Label>
            <MonthPicker
              defaultValue={selectedDate}
              name="pay_period"
              key={`pay-period-${selectedDate}`}
            />
          </div>

          <Button className={cn(ButtonSuccess, "col-span-full")} type="submit">
            <Icons.check />
            Submit
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
