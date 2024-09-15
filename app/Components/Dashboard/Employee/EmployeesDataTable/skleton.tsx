import { DataTableSkeleton } from "@/components/ui/data-table";
import React from "react";
import { column_skeletons } from "./columns";

export default function EmployeesDataTableSkeleton() {
  return <DataTableSkeleton columns={column_skeletons} showOptions />;
}
