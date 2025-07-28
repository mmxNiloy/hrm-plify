import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import { Skeleton } from "@/components/ui/skeleton";
import React, { Suspense } from "react";

interface Props {
  children: React.ReactNode;
  billCreation: React.ReactNode;
}

export default function BillingPageLayout({ children, billCreation }: Props) {
  return (
    <main className="container flex flex-col gap-4 sm:gap-6 py-4 sm:py-6">
      <p className="text-lg sm:text-xl md:text-2xl font-semibold">Billing</p>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <MyBreadcrumbs title="Billing" />

        <Suspense fallback={<Skeleton className="w-32 h-6" />}>
          {billCreation}
        </Suspense>
      </div>
      <Suspense fallback={<Skeleton className="flex-1 w-full" />}>
        {children}
      </Suspense>
    </main>
  );
}
