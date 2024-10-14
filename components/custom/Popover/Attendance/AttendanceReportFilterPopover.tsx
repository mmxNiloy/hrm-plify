"use client";
import { Button } from "@/components/ui/button";
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
import { cn } from "@/lib/utils";
import { IDepartment } from "@/schema/CompanySchema";
import { IDesignation } from "@/schema/DesignationSchema";
import { IEmployeeWithUserMetadata } from "@/schema/EmployeeSchema";
import { ButtonSuccess, ButtonWarn } from "@/styles/button.tailwind";
import { getFullNameOfEmployee } from "@/utils/Misc";
import React, { useState } from "react";
import { RangedDatePicker } from "../../DatePicker/RangedDatePicker";
import AnimatedTrigger from "../AnimatedTrigger";

interface Props {
  departments?: IDepartment[];
  designations?: IDesignation[];
  employees?: IEmployeeWithUserMetadata[];
}

export default function AttendanceReportFilterPopover({
  departments = [],
  designations = [],
  employees = [],
}: Props) {
  const [department, setDepartment] = useState<string>("");
  const [designation, setDesignation] = useState<string>("");
  const [employee, setEmployee] = useState<string>("");

  return (
    <Popover>
      <PopoverTrigger className="group" asChild>
        <AnimatedTrigger
          label="Filter"
          Icon={<Icons.filter />}
          className={ButtonWarn}
        />
      </PopoverTrigger>
      <PopoverContent className="w-96" align="end">
        <form className="flex flex-col gap-4 w-full">
          <div className="col-span-full flex flex-col gap-2">
            <Label>Employee</Label>
            <Select name="employee" onValueChange={(e) => setEmployee(e)}>
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
            <Label>Select a Date Range</Label>
            <RangedDatePicker />
          </div>

          <div className="col-span-full flex flex-col gap-2">
            <Label>Sort</Label>
            <Select
              name="sort"
              onValueChange={(e) => setEmployee(e)}
              defaultValue="DESC"
            >
              <SelectTrigger>
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sort</SelectLabel>
                  <SelectItem value="DESC">Newest to Oldest</SelectItem>
                  <SelectItem value="ASC">Oldest to Newest</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
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
