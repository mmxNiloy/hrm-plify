import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

export default function CompanyNameSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <Label>Company</Label>
      <Input placeholder="Loading..." disabled />
    </div>
  );
}
