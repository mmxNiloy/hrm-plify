"use client";

import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
export default function CompanyTradeDetailsSkeleton() {
  return (
    <div className="p-1 grid grid-cols-1 md:grid-cols-2 gap-4">
      {Array.from({ length: 7 }, (_, idx) => idx).map((idx) => (
        <Skeleton key={`skeleton-${idx}`} className="w-full h-10" />
      ))}
    </div>
  );
}
