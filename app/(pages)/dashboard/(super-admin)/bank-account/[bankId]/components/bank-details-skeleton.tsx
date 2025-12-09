import DataTableSkeleton from "@/components/ui/data-table/data-table-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function BankDetailsSkeleton() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center w-full">
      <Skeleton className="w-1/2 h-64" />
      <div className="flex w-full flex-col">
        <DataTableSkeleton />
      </div>
    </div>
  );
}
