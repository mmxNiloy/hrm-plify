import { LeavePageCompanyDataTableColumns } from "@/app/Components/Leave/LeavePageCompanyDataTableColumns";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { DataTableSkeleton } from "@/components/ui/data-table";
import React from "react";

export default function LeaveDashboardPageLoading() {
  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">User Access Management Dashboard</p>
      <div className="flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Leave</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <DataTableSkeleton
        showOptions
        columns={LeavePageCompanyDataTableColumns}
      />
    </main>
  );
}
