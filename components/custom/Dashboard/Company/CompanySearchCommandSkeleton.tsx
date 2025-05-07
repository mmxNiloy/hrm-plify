import { CommandGroup, CommandItem } from "@/components/ui/command";
import Icons from "@/components/ui/icons";
import React from "react";

export default function CompanySearchCommandSkeleton() {
  return (
    <div className="flex flex-col gap-2 items-center justify-center min-h-48 sm:min-h-64 text-base sm:text-xl">
      <Icons.spinner className="animate-spin size-6 sm:size-8 ease-in-out" />
      Loading...
    </div>
  );
}
