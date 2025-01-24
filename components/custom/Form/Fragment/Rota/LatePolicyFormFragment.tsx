"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Icons from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IDepartment } from "@/schema/CompanySchema";
import { IDesignation } from "@/schema/DesignationSchema";
import { ILatePolicy, IOffDays, IShift } from "@/schema/RotaSchema";
import { RequiredAsterisk } from "@/styles/label.tailwind";
import { IFormFragmentProps } from "@/utils/Types";
import React, { useCallback, useState } from "react";

interface Props extends IFormFragmentProps<ILatePolicy> {
  shifts: IShift[];
  departments: IDepartment[];
  designations: IDesignation[];
}

export default function LatePolicyFormFragment({
  data,
  readOnly,
  disabled,
  shifts,
  departments,
  designations,
}: Props) {
  const [filteredDesignations, setFilteredDesignations] =
    useState<IDesignation[]>(designations);

  const onDepartmentChange = useCallback(
    (dept_id: string) => {
      if (dept_id.length < 1) setFilteredDesignations(designations);
      else {
        setFilteredDesignations(
          designations.filter((item) => `${item.dept_id}` === dept_id)
        );
      }
    },
    [designations]
  );

  const [department, setDepartment] = useState<number>(
    data?.department_id ?? 0
  );
  const [designation, setDesignation] = useState<number>(
    data?.designation_id ?? 0
  );

  return (
    <>
      {/* New approach: Heirarchical structure */}
      <div className="flex flex-col gap-2">
        <Label className={RequiredAsterisk}>
          Select a Department and a Designation
        </Label>
        <div className="hidden">
          <Input
            value={department}
            placeholder="Department ID"
            name="department_id"
            readOnly
          />
          <Input
            value={designation}
            placeholder="Designation ID"
            name="designation_id"
            readOnly
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              disabled={readOnly || disabled}
              variant={"outline"}
              className="justify-between"
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger
                    type="button"
                    className="flex items-center justify-between size-full gap-2"
                  >
                    <>
                      {!department
                        ? "None selected"
                        : `${
                            departments.find(
                              (item) => item.department_id == department
                            )?.dpt_name
                          } > ${
                            designations.find(
                              (item) => item.designation_id == designation
                            )?.designation_name
                          }`}
                      <Icons.chevronsUpDown className="size-4 text-muted-foreground" />
                    </>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {!department
                        ? "None selected"
                        : `${
                            departments.find(
                              (item) => item.department_id == department
                            )?.dpt_name
                          } > ${
                            designations.find(
                              (item) => item.designation_id == designation
                            )?.designation_name
                          }`}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="min-w-72">
            <DropdownMenuLabel>Departments</DropdownMenuLabel>
            <DropdownMenuSeparator />

            {departments.map((dept) => (
              <DropdownMenuSub key={`department-submenu-${dept.department_id}`}>
                <DropdownMenuSubTrigger className="gap-2">
                  <Icons.check
                    className={`size-4 ${
                      dept.department_id == department
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  />
                  {dept.dpt_name}
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuLabel>Designations</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  {/* List all designations under this department */}
                  {designations
                    .filter((item) => item.dept_id == dept.department_id)
                    .map((dsg) => (
                      <DropdownMenuCheckboxItem
                        checked={designation == dsg.designation_id}
                        onClick={() => {
                          setDepartment(dept.department_id);
                          setDesignation(dsg.designation_id);
                        }}
                        key={`designation-${dsg.designation_id}`}
                      >
                        {dsg.designation_name}
                      </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex flex-col gap-2">
        <Label className={RequiredAsterisk}>Shift</Label>
        <Select
          required
          defaultValue={data ? `${data.shift_id}` : undefined}
          name="shift_id"
          disabled={disabled || readOnly}
        >
          <SelectTrigger>
            <SelectValue placeholder={"Select a Shift"} />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select a shift</SelectLabel>

              {shifts.map((shift) => (
                <SelectItem
                  key={`shift-${shift.shift_id}`}
                  value={`${shift.shift_id}`}
                >
                  {shift.shift_name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label className={RequiredAsterisk}>
          Maximum Grace Period (In Minutes)
        </Label>
        <Input
          readOnly={readOnly}
          disabled={disabled}
          type="number"
          min={0}
          name="max_grace_period_min"
          defaultValue={data?.max_grace_period_min}
          placeholder="Maximum Grace Period (In Minutes)"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label className={RequiredAsterisk}>Number of Days Allowed</Label>
        <Input
          readOnly={readOnly}
          disabled={disabled}
          type="number"
          min={0}
          name="num_day_allow"
          defaultValue={data?.max_grace_period_min}
          placeholder="Number of days allowed"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label className={RequiredAsterisk}>
          Number of Salary Deduction Days
        </Label>
        <Input
          readOnly={readOnly}
          disabled={disabled}
          type="number"
          min={0}
          name="num_day_salary_deduct"
          defaultValue={data?.num_day_salary_deduct}
          placeholder="Number of salary deduction days"
        />
      </div>
    </>
  );
}
