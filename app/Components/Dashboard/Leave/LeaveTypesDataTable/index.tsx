import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { columns } from "./columns";
import { ILeaveType } from "@/schema/LeaveSchema";

export default function LeaveTypesDataTable() {
  return <DataTable columns={columns} data={[]} />;
}
