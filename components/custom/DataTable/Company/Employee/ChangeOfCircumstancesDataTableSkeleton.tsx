import { DataTableSkeleton } from "@/components/ui/data-table";
import React from "react";
import { ChangeOfCircumstancesDataTableColumns } from "../../Columns/Company/ChangeOfCircumstancesDataTableColumns";

export default function ChangeOfCircumstancesDataTableSkeleton() {
  return (
    <DataTableSkeleton
      columns={ChangeOfCircumstancesDataTableColumns}
      showOptions
    />
  );
}
