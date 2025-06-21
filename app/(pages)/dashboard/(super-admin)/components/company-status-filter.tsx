"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { searchParamsParsers } from "@/utils/searchParamsParsers";
import { Check } from "lucide-react";
import { useQueryState } from "nuqs";
import React, { useMemo } from "react";

export default function CompanyStatusFilter() {
  const [isActive, setIsActive] = useQueryState(
    "isActive",
    searchParamsParsers.companyStatus
  );

  const statusList: (typeof isActive)[] = useMemo(() => ["all", "1", "0"], []);

  return (
    <div className="flex border rounded-md border-blue-600 overflow-clip">
      {statusList.map((status) => (
        <Button
          key={`status-filter-${status}`}
          size="sm"
          className={cn(
            "gap-1 min-w-24 h-6 [&_svg]:size-3 rounded-none",
            isActive === status
              ? "bg-blue-400 hover:bg-blue-300 text-white"
              : "bg-transparent hover:bg-blue-200 text-blue-600"
          )}
          onClick={() => setIsActive(status)}
        >
          {isActive === status && <Check className={cn("size-3")} />}
          <span className="text-xs">
            {status === "all" ? "All" : status === "1" ? "Active" : "Inactive"}
          </span>
        </Button>
      ))}
    </div>
  );
}
