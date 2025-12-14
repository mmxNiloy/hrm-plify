import DataTableSkeleton from "@/components/ui/data-table/data-table-skeleton";
import Icons from "@/components/ui/icons";
import { Skeleton } from "@/components/ui/skeleton";

export default function CompanyLeaveDashboardLoading() {
  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Employee Access Management</p>
      <div className="flex items-center justify-between">
        <Skeleton className="w-3/5 h-5" />
      </div>

      <DataTableSkeleton />
    </main>
  );
}
