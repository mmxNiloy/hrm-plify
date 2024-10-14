import { DataTableSkeleton } from "@/components/ui/data-table";
import React from "react";
import { column_skeletons } from "../Columns/Company/StaffReportDataTableColumns";

export default function StaffReportDataTableSkeleton() {
  return <DataTableSkeleton columns={column_skeletons} showOptions />;
}
