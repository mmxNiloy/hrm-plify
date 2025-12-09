import { ChangeOfCircumstancesDataTableColumns } from "@/components/custom/DataTable/Columns/Company/ChangeOfCircumstancesDataTableColumns";
import DataTableSkeleton from "@/components/ui/data-table/data-table-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function EmployeeChangeOfCircumstancesPageLoading() {
  return <DataTableSkeleton columns={8} />;
}
