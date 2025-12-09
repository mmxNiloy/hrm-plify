import { CompanyContractAgreementDataTableColumns } from "@/components/custom/DataTable/Columns/Company/CompanyContractAgreementDataTableColumns";
import ContractAgreementDataTableSkeleton from "@/components/custom/DataTable/Company/Employee/ContractAgreementDataTableSkeleton";
import DataTableSkeleton from "@/components/ui/data-table/data-table-skeleton";
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

      <DataTableSkeleton columns={8} />
    </main>
  );
}
