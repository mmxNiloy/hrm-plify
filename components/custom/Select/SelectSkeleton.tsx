import Icons from "@/components/ui/icons";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger } from "@/components/ui/select";
import React from "react";
export const SelectSkeleton = ({ label }: { label?: string }) => {
  return (
    <div className="flex flex-col gap-2">
      <Label>{label ?? "Select"}</Label>
      <Select disabled>
        <SelectTrigger>
          <div className="gap-2 flex items-center">
            <Icons.spinner className="animate-spin ease-in-out" />
            Loading...
          </div>
        </SelectTrigger>
      </Select>
    </div>
  );
};
