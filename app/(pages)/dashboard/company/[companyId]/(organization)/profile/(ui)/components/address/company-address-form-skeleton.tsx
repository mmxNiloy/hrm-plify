"use client";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function CompanyAddressFormSkeleton() {
  return (
    <div className="p-2 grid grid-cols-2 gap-4">
      <Skeleton className="w-full h-10" />

      <span className="col-span-full hidden md:block"></span>

      <Skeleton className="w-full h-20" />
      <Skeleton className="w-full h-20" />
      <Skeleton className="w-full h-20" />

      <span className="col-span-full hidden md:block"></span>

      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-10" />
    </div>
  );
}
