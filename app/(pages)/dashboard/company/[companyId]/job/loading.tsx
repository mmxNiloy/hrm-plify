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

export default function CompanyJobsPageSkeleton() {
  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Job & Recruitment Dashboard</p>
      <Skeleton className="w-3/5 h-5" />

      <div className="grid lg:grid-cols-2 gap-2">
        {/* <EmployeeStatsSkeleton /> */}

        {/* <StaffReportCardSkeleton /> */}
      </div>
    </main>
  );
}
