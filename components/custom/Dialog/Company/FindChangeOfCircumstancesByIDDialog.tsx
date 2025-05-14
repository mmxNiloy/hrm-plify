"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Icons from "@/components/ui/icons";
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
import React, { useCallback, useEffect, useState } from "react";
import ChangeOfCircumstancesDataTable from "../../DataTable/Company/Employee/ChangeOfCircumstancesDataTable";
import { IChangeOfCircumstances } from "@/schema/EmployeeSchema";
import { FilteredChangeOfCircumstancesDataTableColumns } from "../../DataTable/Columns/Company/FilteredChangeOfCircumstancesDataTableColumns";

export default function FindChangeOfCircumstancesByIDDialog() {
  const [employmentType, setEmploymentType] = useState<string>("");
  const [employees, setEmployees] = useState<string[]>([]);
  const [employeeID, setEmployeeID] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const getEmployees = useCallback(async () => {
    if (employmentType.length < 1) return;

    // Reset selection
    setEmployeeID("");

    setLoading(true);

    const apiRes = await fetch(
      `/api/employee/employment-type?employment_type=${employmentType}`
    );
    if (apiRes.ok) {
      setEmployees(await apiRes.json());
    } else setEmployees([]);

    setLoading(false);
  }, [employmentType]);

  useEffect(() => {
    getEmployees();
  }, [getEmployees]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={"sm"}
          className="bg-orange-500 hover:bg-orange-400 text-white gap-1 rounded-full"
        >
          <Icons.filter /> Find By ID
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-screen-md lg:max-w-2xl xl:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Find Change of Circumstances of an Employee</DialogTitle>
          <DialogDescription>
            Find change of circumstances of an employee by employee ID.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col gap-2">
            <Label>Employment Type</Label>
            <Select onValueChange={(val) => setEmploymentType(val)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Employment Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select employment type</SelectLabel>
                  <SelectItem value="full-time">Full Time</SelectItem>
                  <SelectItem value="contractual">Contractual</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="part-time">Part Time</SelectItem>
                  <SelectItem value="left">Left</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Employee ID</Label>
            <Select
              value={employeeID}
              onValueChange={(val) => setEmployeeID(val)}
            >
              <SelectTrigger disabled={loading || employees.length < 1}>
                <SelectValue placeholder="Select Employee ID" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select Employee ID</SelectLabel>
                  {employees.map((emp) => (
                    <SelectItem value={emp} key={emp}>
                      {emp}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {!loading && employeeID.length > 0 && employmentType.length > 0 && (
            <div className="flex flex-col gap-2">
              <Label>Download Report as PDF</Label>
              <Button
                size="sm"
                className="bg-orange-500 hover:bg-orange-400 text-white gap-1 rounded-full"
              >
                <Icons.pdf className="invert" />
                Download PDF
              </Button>
            </div>
          )}
        </div>

        <div className="h-[70vh] overflow-auto px-2">
          <ChangeOfCircumstancesDataTable
            data={Array.from<unknown, IChangeOfCircumstances>(
              { length: employeeID.length > 0 ? 5 : 0 },
              (_) => {
                return {
                  created_at: new Date("2024-08-14"),
                  employment_type: employmentType,
                  employee_id: employeeID.substring(
                    employeeID.indexOf("(") + 1,
                    employeeID.length - 1
                  ),
                  employee_name: employeeID
                    .substring(0, employeeID.indexOf("("))
                    .trim(),
                  job_title: "Software Engineer",
                  address: "123 Main St, Anytown, AT 12345",
                  contact: "+1-800-555-1234",
                  nationality: "British",
                  brp: "BRP123456789",
                  visa_expired: new Date("2025-12-31"),
                  remarks: "Employee moved to a new address.",
                  passport_number: "123456789",
                  euss_details: "Settled Status",
                  dbs_details: "DBS cleared on 2023-05-15",
                  national_id_details: "NID123456789",
                  other_documents: "Driving License, Utility Bill",
                  is_informed: "Yes",
                  is_cooperative: "Yes",
                  annual_reminder_date: new Date("2025-12-21"),
                };
              }
            )}
            defaultColumns={FilteredChangeOfCircumstancesDataTableColumns}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
