import { DataTableSkeleton } from "@/components/ui/data-table";
import React from "react";
import { column_skeletons } from "../Columns/Company/CompanyDataTableColumns";

export default function CompanyDataTableSkeleton() {
  return <DataTableSkeleton columns={column_skeletons} showOptions />;
}
