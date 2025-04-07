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
import React, { useEffect, useState } from "react";
import { RangedDatePicker } from "../../DatePicker/RangedDatePicker";
import AnimatedTrigger from "../AnimatedTrigger";
import { Input } from "@/components/ui/input";
import { PopoverClose } from "@radix-ui/react-popover";
import { MultiSelect } from "../../Multiselect";
import { useAttendanceFilter } from "@/hooks/use-attendance-filter";
import { ESortFilter } from "@/schema/enum/sort-filter";
import { usePagination } from "@/hooks/use-pagination";
import { useRouter } from "next/navigation";

interface Props {
  departments?: IDepartment[];
  designations?: IDesignation[];
  employees?: IEmployeeWithUserMetadata[];
  asEmployee?: boolean;
}

export default function AttendanceReportFilterPopover({
  employees = [],
  asEmployee = false,
}: Props) {
  const [employee, setEmployee] = useState<string>("");
  const {
    employees: selectedEmployees,
    setEmployees,
    setSort,
    sort,
  } = useAttendanceFilter();

  const { reset } = usePagination();

  const router = useRouter();

  return (
    <Popover>
      <PopoverTrigger className="group" asChild>
        <AnimatedTrigger
          label="Filter"
          Icon={<Icons.filter />}
          className={ButtonWarn}
        />
      </PopoverTrigger>
      <PopoverContent
        className="w-96"
        align="end"
        onInteractOutside={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <div className="flex flex-col gap-4 w-full">
          <div className={"col-span-full flex flex-col gap-2"}>
            <Label>Employees</Label>
            <Select
              disabled={asEmployee}
              // maxCount={1}

              // placeholder="Select Employees"
              defaultValue={selectedEmployees.map((e) => e.toString()).at(0)}
              onValueChange={(emp) => {
                // setEmployees(emps.map((e) => Number.parseInt(e)));
                setEmployees([Number.parseInt(emp)]);
                reset();
              }}
              // options={employees.map((emp) => ({
              //   label: getFullNameOfEmployee(emp),
              //   value: emp.employee_id.toString(),
              // }))}
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
            <Label>Select a Date Range</Label>
            <RangedDatePicker onValueChange={reset} />
          </div>

          <div className="col-span-full flex flex-col gap-2">
            <Label>Sort</Label>
            <Select
              name="sort"
              onValueChange={(e) => setSort(e as ESortFilter)}
              defaultValue={sort}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sort</SelectLabel>
                  <SelectItem value={ESortFilter.DESC}>
                    Newest to Oldest
                  </SelectItem>
                  <SelectItem value={ESortFilter.ASC}>
                    Oldest to Newest
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <PopoverClose asChild>
            <Button className={cn(ButtonSuccess, "col-span-full")}>
              <Icons.check />
              Apply
            </Button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
}
