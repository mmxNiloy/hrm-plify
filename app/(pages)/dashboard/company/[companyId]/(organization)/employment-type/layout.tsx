import { Skeleton } from "@/components/ui/skeleton";
import React, { Suspense } from "react";
import StatusFilter from "@/components/custom/status-filter";

interface Props {
  children: React.ReactNode;
  breadcrumbs: React.ReactNode;
  actions: React.ReactNode;
}

export default function DesignationListPageLayout({
  children,
  breadcrumbs,
  actions,
}: Props) {
  return (
    <main className="container flex flex-col gap-4 sm:gap-6 py-4 sm:py-6">
      <p className="text-lg sm:text-xl md:text-2xl font-semibold">
        Employment Types
      </p>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <Suspense fallback={<Skeleton className="w-3/5 h-4" />}>
          {breadcrumbs}
        </Suspense>
        {/* <Suspense fallback={<ActionsSkeleton />}>{actions}</Suspense> */}
      </div>

      <Suspense fallback={<Skeleton className="flex-1 w-full" />}>
        {children}
      </Suspense>
    </main>
  );
}
