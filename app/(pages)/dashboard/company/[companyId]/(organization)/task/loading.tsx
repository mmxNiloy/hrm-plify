import { TasksDataTableColumns } from "@/components/custom/DataTable/Columns/TasksDataTableColumns";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { StaticDataTable } from "@/components/ui/data-table";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function CompanyTasksDashboardPageLoading() {
  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Tasks Dashboard</p>
      <Skeleton className="w-3/5 h-5" />

      <StaticDataTable columns={TasksDataTableColumns} data={[]} loading />
      {/* <TaskPageCompanyDataTable /> */}
    </main>
  );
}
