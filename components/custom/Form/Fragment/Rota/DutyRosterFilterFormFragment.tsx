"use client";
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
import { IDepartment } from "@/schema/CompanySchema";
import { IDesignation } from "@/schema/DesignationSchema";
import { IEmployeeWithUserMetadata } from "@/schema/EmployeeSchema";
import { IDutyRoster, IShift } from "@/schema/RotaSchema";
import { convertTo12Hour } from "@/utils/Misc";
import { IFormFragmentProps } from "@/utils/Types";
import React, { useCallback, useState } from "react";

interface Props extends IFormFragmentProps<IDutyRoster> {
  showEmployee?: boolean;
  departments?: IDepartment[];
  designations?: IDesignation[];
  employees?: IEmployeeWithUserMetadata[];
  shifts?: IShift[];
}

export default function DutyRosterFilterFormFragment({
  readOnly,
  disabled,
  showEmployee,
  departments = [],
  designations = [],
  employees = [],
  shifts = [],
}: Props) {
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");

  const [selectedEmployee, setSelectedEmployee] = useState<
    string | undefined
  >();

  const [filteredEmployees, setFilteredEmployees] = useState<
    IEmployeeWithUserMetadata[]
  >([]);

  const filterEmployees = useCallback(
    (department: string) => {
      setSelectedDepartment(department);

      if (department.length < 1) {
        setFilteredEmployees([]);
        return;
      }

      const department_id = Number.parseInt(department);
      setFilteredEmployees(
        employees.filter((emp) => emp.department_id == department_id)
      );
    },
    [employees]
  );

  return (
    <>
      <div className="flex flex-col gap-2 col-span-full">
        <Label>Department</Label>
        {/* <LabelledComboBox
          contentClassName="w-fit max-w-screen-xl"
          key={`department-${data?.departments.department_id ?? ""}`}
          required
          defaultValue={`${data?.departments.department_id ?? ""}`}
          name="department_id"
          disabled={disabled || readOnly}
          onValueChange={(e) => filterEmployees(e)}
          items={departments.map((item) => ({
            value: `${item.department_id}`,
            label: `${item.dpt_name}`,
          }))}
          label="Select a Department"
        /> */}

        <Select
          name="department_id"
          disabled={disabled || readOnly}
          onValueChange={(e) => filterEmployees(e)}
        >
          <SelectTrigger>
            <SelectValue placeholder={"Select a Department"} />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select a department</SelectLabel>

              {departments.map((item) => (
                <SelectItem
                  value={`${item.department_id}`}
                  key={`department-${item.department_id}`}
                >
                  {item.dpt_name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* <div className="flex flex-col gap-2">
        <Label className={readOnly ? "" : RequiredAsterisk}>Designation</Label>
        <Select
          required
          defaultValue={`${data?.designation.designation_id ?? ""}`}
          name="designation_id"
          disabled={disabled || readOnly}
        >
          <SelectTrigger>
            <SelectValue placeholder={"Select a Designation"} />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select a designation</SelectLabel>

              <SelectItem value="1">Designation 1</SelectItem>
              <SelectItem value="2">Designation 2</SelectItem>
              <SelectItem value="3">Designation 3</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div> */}

      <div className="flex flex-col gap-2 col-span-full">
        <Label>Shift</Label>
        {/* <LabelledComboBox
          contentClassName="w-fit max-w-screen-xl"
          key={`shift-${data?.shift_db.shift_id ?? ""}`}
          required
          defaultValue={`${data?.shift_db.shift_id ?? ""}`}
          name="shift_id"
          disabled={disabled || readOnly}
          items={shifts.map((item) => ({
            value: `${item.shift_id}`,
            label: `${item.shift_name} (${convertTo12Hour(
              item.start_time
            )}-${convertTo12Hour(item.end_time)})`,
          }))}
          label="Select a Shift"
        /> */}

        <Select name="shift_id" disabled={disabled || readOnly}>
          <SelectTrigger>
            <SelectValue placeholder={"Select a Shift"} />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select a Shift</SelectLabel>

              {shifts.map((item) => (
                <SelectItem
                  key={`shift-option-${item.shift_id}`}
                  value={`${item.shift_id}`}
                >
                  {item.shift_name} ({convertTo12Hour(item.start_time)}-
                  {convertTo12Hour(item.end_time)})
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {showEmployee && (
        <div className="flex flex-col gap-2 col-span-full">
          <Label>Employee</Label>
          {/* <LabelledComboBox
            contentClassName="w-fit max-w-screen-xl"
            items={filteredEmployees.map((emp) => ({
              value: `${emp.employee_id}`,
              label: `${emp.user.first_name}${
                emp.user.middle_name.length > 1
                  ? ` ${emp.user.middle_name}`
                  : ""
              } ${emp.user.last_name}`,
            }))}
            name="employee_id"
            required
            readOnly={readOnly}
            disabled={disabled || selectedDepartment.length < 1}
            key={`employee-${data?.employees.employee_id ?? ""}`}
            defaultValue={`${data?.employees.employee_id ?? ""}`}
            label="Select an Employee"
          /> */}
          <Select
            name="employee_id"
            disabled={disabled || readOnly || selectedDepartment.length < 1}
          >
            <SelectTrigger>
              <SelectValue placeholder={"Select an Employee"} />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select an Employee</SelectLabel>

                {filteredEmployees.map((item) => (
                  <SelectItem
                    key={`employee-${item.employee_id}`}
                    value={`${item.employee_id}`}
                  >{`${item.user.first_name}${
                    item.user.middle_name.length > 0
                      ? ` ${item.user.middle_name}`
                      : ""
                  } ${item.user.last_name}`}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <Label htmlFor="from-date-input">From Date</Label>
        <Input
          id={"from-date-input"}
          readOnly={readOnly}
          disabled={disabled}
          type="date"
          name="from_date"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="to-date-input">To Date</Label>
        <Input
          id={"to-date-input"}
          readOnly={readOnly}
          disabled={disabled}
          type="date"
          name="end_date"
        />
      </div>
    </>
  );
}
