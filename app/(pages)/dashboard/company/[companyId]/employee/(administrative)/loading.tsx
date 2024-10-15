import EmployeeStatsSkeleton from "@/components/custom/Dashboard/Employee/EmployeeStatsSkeleton";
import StaffReportCardSkeleton from "@/components/custom/Dashboard/Employee/StaffReportCard/skeleton";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function CompanyEmployeeLoading() {
  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Employee Management Dashboard</p>
      <Skeleton className="w-3/5 h-5" />

      <div className="grid lg:grid-cols-2 gap-2">
        <EmployeeStatsSkeleton />

        <StaffReportCardSkeleton />
      </div>
    </main>
  );
}
