import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function CompanyAuthorityFormSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-20" />
      <Skeleton className="w-full h-24 col-span-full" />
    </div>
  );
}
