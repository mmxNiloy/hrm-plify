import { ChangeOfCircumstancesDataTableColumns } from "@/components/custom/DataTable/Columns/Company/ChangeOfCircumstancesDataTableColumns";
import ChangeOfCircumstancesDataTableSkeleton from "@/components/custom/DataTable/Company/Employee/ChangeOfCircumstancesDataTableSkeleton";
import { DataTableSkeleton } from "@/components/ui/data-table";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function EmployeeChangeOfCircumstancesPageLoading() {
  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Change of Circumstances</p>
      <div className="flex items-center justify-between">
        <Skeleton className="w-3/5 h-5" />

        {/* <EmployeeCreationDialog /> */}
      </div>

      {/* Main content, a table of employees */}
      <DataTableSkeleton
        columns={ChangeOfCircumstancesDataTableColumns}
        showOptions
      />
    </main>
  );
}
