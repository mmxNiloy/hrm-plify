import ContractAgreementDataTableSkeleton from "@/components/custom/DataTable/Company/Employee/ContractAgreementDataTableSkeleton";
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

export default function EmployeeContractAgreementPageLoading() {
  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Contract Agreement</p>
      <div className="flex items-center justify-between">
        <Skeleton className="w-3/5 h-5" />

        {/* <EmployeeCreationDialog /> */}
      </div>

      {/* Main content, a table of employees */}
      <ContractAgreementDataTableSkeleton />
    </main>
  );
}
