import React from "react";
import { DataTableSkeleton } from "@/components/ui/data-table";
import { CompanyEmploymentTypeDataTableColumns } from "@/components/custom/DataTable/Columns/Company/CompanyEmploymentTypeDataTableColumns";
import { Skeleton } from "@/components/ui/skeleton";

export default function AllEmployeePageLoading() {
  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">All Employees</p>
      <div className="flex items-center justify-between">
        <Skeleton className="w-3/5 h-5" />

        {/* <EmployeeCreationDialog /> */}
      </div>

      {/* Main content, a table of employees */}
      <DataTableSkeleton columns={CompanyEmploymentTypeDataTableColumns} />
    </main>
  );
}
