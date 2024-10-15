import { DataTableSkeleton } from "@/components/ui/data-table";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { JobsDataTableColumns } from "@/components/custom/DataTable/Columns/JobsDataTableColumns";
import { Skeleton } from "@/components/ui/skeleton";

export default function AllJobsPageSkeleton() {
  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Designations Dashboard</p>
      <Skeleton className="w-3/5 h-5" />

      <div className="grid grid-cols-2 gap-2">
        <div className="col-span-full">
          <DataTableSkeleton showOptions columns={JobsDataTableColumns} />
        </div>
        {/* <EmployeeStatsCard /> */}
        {/* <StaffReportCard companyId={params.companyId} /> */}
      </div>
    </main>
  );
}
