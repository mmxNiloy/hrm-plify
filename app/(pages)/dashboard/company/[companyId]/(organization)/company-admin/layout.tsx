import React, { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  children: React.ReactNode;
  breadcrumbs: React.ReactNode;
}
export default function CompanyAdminPageLayout({
  children,
  breadcrumbs,
}: Props) {
  return (
    <main className="container flex flex-col gap-4 sm:gap-6 py-4 sm:py-6">
      <p className="text-lg sm:text-xl md:text-2xl font-semibold">
        Company Admin
      </p>
      <Suspense fallback={<Skeleton className="w-3/5 h-6" />}>
        {breadcrumbs}
      </Suspense>
      {children}
    </main>
  );
}
