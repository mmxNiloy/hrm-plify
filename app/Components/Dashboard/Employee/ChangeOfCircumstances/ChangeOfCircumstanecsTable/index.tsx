import { DataTable } from "@/components/ui/data-table";
import { IChangeOfCircumstances } from "@/schema/EmployeeSchema";
import React from "react";
import { columns } from "./columns";

const exampleEmployees: IChangeOfCircumstances[] = Array.from<
  unknown,
  IChangeOfCircumstances
>({ length: 50 }, (_, index) => {
  return {
    updated_date: new Date("2024-08-14"),
    employment_type: "Full-time",
    employee_id: `EMP-${101 + index}`,
    employee_name: `John Doe #${index + 1}`,
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
  };
});

export default function ChangeOfCircumstancesTable() {
  return <DataTable data={exampleEmployees} columns={columns} />;
}
