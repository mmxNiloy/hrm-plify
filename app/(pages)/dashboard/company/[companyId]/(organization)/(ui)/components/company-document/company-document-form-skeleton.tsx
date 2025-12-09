import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function CompanyDocumentFormSkeleton() {
  return (
    <>
      <div className="flex flex-col gap-2">
        <Label>Document Name</Label>
        <Skeleton className="w-full h-10" />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Document Type</Label>
        <Skeleton className="w-full h-10" />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Document File</Label>
        <Skeleton className="w-full h-10" />
      </div>
    </>
  );
}
