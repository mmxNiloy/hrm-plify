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

export default function AllJobsPageSkeleton() {
  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Designations Dashboard</p>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="../../">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink
              href={`..`}
              className="line-clamp-1 text-ellipsis max-w-32"
            >
              Company Name
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href=".">Designations</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>All Designations</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

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
