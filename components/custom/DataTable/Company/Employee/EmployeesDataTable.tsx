import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { CompanyEmployeeDataTableColumns } from "../../Columns/Company/CompanyEmployeeDataTableColumns";

export default function EmployeesDataTable() {
  return <DataTable data={[]} columns={CompanyEmployeeDataTableColumns} />;
}
