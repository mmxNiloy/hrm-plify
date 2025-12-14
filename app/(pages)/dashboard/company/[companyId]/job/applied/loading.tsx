import DataTableSkeleton from "@/components/ui/data-table/data-table-skeleton";
import React from "react";
import { JobsDataTableColumns } from "@/components/custom/DataTable/Columns/JobsDataTableColumns";
import { Skeleton } from "@/components/ui/skeleton";

export default function AllJobsPageSkeleton() {
  return (
    <main className="container flex flex-col gap-2">
      <Skeleton className="h-12 w-1/2" />
      <Skeleton className="w-3/5 h-5" />

      <div className="grid grid-cols-2 gap-2">
        <div className="col-span-full">
          <DataTableSkeleton />
        </div>
      </div>
    </main>
  );
}
