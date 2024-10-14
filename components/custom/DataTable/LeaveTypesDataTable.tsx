import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { LeaveTypesDataTableColumns } from "./Columns/LeaveTypesDataTableColumns";

export default function LeaveTypesDataTable() {
  return <DataTable columns={LeaveTypesDataTableColumns} data={[]} />;
}
