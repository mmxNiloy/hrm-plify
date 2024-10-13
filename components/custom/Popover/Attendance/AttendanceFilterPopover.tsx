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

interface Props {
  departments?: IDepartment[];
  designations?: IDesignation[];
  employees?: IEmployeeWithUserMetadata[];
}

export default function AttendanceFilterPopover({
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
        <form className="grid grid-cols-2 gap-4 w-full">
          <div className="flex flex-col gap-2">
            <Label>Department</Label>
            <Select name="department" onValueChange={(e) => setDepartment(e)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select a Department</SelectLabel>
                  {departments.map((item) => (
                    <SelectItem
                      key={`company-department-${item.department_id}`}
                      value={`${item.department_id}`}
                    >
                      {item.dpt_name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Designation</Label>
            <Select name="designation" onValueChange={(e) => setDesignation(e)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a Designation" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select a Designation</SelectLabel>
                  {designations.map((item) => (
                    <SelectItem
                      key={`company-designation-${item.designation_id}`}
                      value={`${item.designation_id}`}
                    >
                      {item.designation_name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="col-span-full flex flex-col gap-2">
            <Label>Employee</Label>
            <Select
              name="employee"
              // TODO: Get the department id and designation id of an employee
              // TODO: from the server and then apply this logic
              //   disabled={department.length < 1 || designation.length < 1}
              onValueChange={(e) => setEmployee(e)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an Employee" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select an Employee</SelectLabel>
                  {employees.map((item) => {
                    // TODO: Get the department id and designation id of an employee
                    // TODO: from the server and then apply this logic
                    // if (
                    //   item.department_id.toString() !== department ||
                    //   item.designation_id.toString() !== designation
                    // )
                    //   return null;

                    return (
                      <SelectItem
                        key={`company-employee-${item.employee_id}`}
                        value={`${item.employee_id}`}
                      >
                        {getFullNameOfEmployee(item)}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label>From Date</Label>
            <Input name="from_date" type="date" />
          </div>

          <div className="flex flex-col gap-2">
            <Label>To Date</Label>
            <Input name="to_date" type="date" />
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
