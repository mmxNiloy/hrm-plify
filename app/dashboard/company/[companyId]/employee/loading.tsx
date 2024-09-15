import EmployeeStatsSkeleton from "@/app/Components/Dashboard/Employee/EmployeeStatsSkeleton";
import StaffReportCardSkeleton from "@/app/Components/Dashboard/Employee/StaffReportCard/skeleton";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

export default function CompanyEmployeeLoading() {
  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Employee Dashboard</p>
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
            <BreadcrumbPage>Employee</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid lg:grid-cols-2 gap-2">
        <EmployeeStatsSkeleton />

        <StaffReportCardSkeleton />
      </div>
    </main>
  );
}
