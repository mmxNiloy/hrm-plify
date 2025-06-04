import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ActionsSkeleton() {
  return (
    <div className="w-full sm:w-auto">
      <Skeleton className="h-10 w-24" />
    </div>
  );
}
