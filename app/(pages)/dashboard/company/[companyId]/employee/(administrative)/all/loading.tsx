import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";
import { DataTableSkeleton } from "@/components/ui/data-table";
import { CompanyEmploymentTypeDataTableColumns } from "@/components/custom/DataTable/Columns/Company/CompanyEmploymentTypeDataTableColumns";

export default function AllEmployeePageLoading() {
  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">All Employees</p>
      <div className="flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Company Name</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Employee Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>All Employees</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* <EmployeeCreationDialog /> */}
      </div>

      {/* Main content, a table of employees */}
      <DataTableSkeleton columns={CompanyEmploymentTypeDataTableColumns} />
    </main>
  );
}
