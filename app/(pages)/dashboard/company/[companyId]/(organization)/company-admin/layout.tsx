import React, { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ActionsSkeleton } from "../department/features/actions";

interface Props {
  children: React.ReactNode;
  breadcrumbs: React.ReactNode;
  assignDialogSlot: React.ReactNode;
}
export default function CompanyAdminPageLayout({
  children,
  breadcrumbs,
  assignDialogSlot,
}: Props) {
  return (
    <main className="container flex flex-col gap-4 sm:gap-6 py-4 sm:py-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-lg sm:text-xl md:text-2xl font-semibold">
            Company Admin
          </p>
          <Suspense fallback={<Skeleton className="w-3/5 h-6" />}>
            {breadcrumbs}
          </Suspense>
        </div>
        <Suspense fallback={<ActionsSkeleton />}>{assignDialogSlot}</Suspense>
      </div>
      {children}
    </main>
  );
}
