"use client";

import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function CompanyProfileFormSkeleton() {
  return (
    <div className="p-1 grid grid-cols-1 md:grid-cols-2 gap-4">
      <Skeleton className="col-span-full w-full h-10" />
      <Skeleton className="w-full h-20" />
      <Skeleton className="w-full h-20" />
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full aspect-video" />
    </div>
  );
}
