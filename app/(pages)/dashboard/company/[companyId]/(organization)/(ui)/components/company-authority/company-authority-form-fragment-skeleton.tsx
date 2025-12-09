import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function CompanyAuthorityFormFragment() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      <div className="flex flex-col gap-2">
        <Label>First Name</Label>
        <Skeleton className="w-full h-10" />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Last Name</Label>
        <Skeleton className="w-full h-10" />
      </div>

      <div className="col-span-full flex flex-col gap-2">
        <Label>Designation</Label>
        <Skeleton className="w-full h-10" />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Phone</Label>
        <Skeleton className="w-full h-10" />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Email</Label>
        <Skeleton className="w-full h-10" />
      </div>

      <div className="col-span-full flex flex-col gap-2">
        <Label>Document</Label>
        <Skeleton className="w-full h-10" />
      </div>

      <div className="col-span-full flex flex-col gap-2">
        <Label htmlFor="offence-input">Previous Offences</Label>
        <Skeleton className="w-full h-24" />
      </div>
    </div>
  );
}
