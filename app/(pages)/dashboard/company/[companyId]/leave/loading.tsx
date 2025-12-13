import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Icons from "@/components/ui/icons";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function CompanyLeaveDashboardLoading() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        <Skeleton className="w-1/2 h-12" />
        <Skeleton className="w-3/5 h-5" />
      </div>

      <Skeleton className="w-full h-96" />
    </div>
  );
}
