import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

export default function CompanyProfileFormFragment() {
  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <Skeleton className="w-full h-10" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-10" />
      </div>

      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-10" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-10" />
      </div>

      <Skeleton className="w-1/2 h-10" />

      <Skeleton className="w-1/2 h-20" />
    </div>
  );
}
