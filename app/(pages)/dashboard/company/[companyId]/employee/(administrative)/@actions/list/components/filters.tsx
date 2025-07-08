"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IEmployee } from "@/schema/EmployeeSchema";
import { searchParamsParsers } from "@/utils/searchParamsParsers";
import { ChevronsUpDown, Filter } from "lucide-react";
import { useQueryState } from "nuqs";
import React, { useMemo } from "react";

type EmployeeStatus = IEmployee["status"];

const EmploymentStatusList: Array<[string, EmployeeStatus | "ALL"]> = [
  ["Select All", "ALL"],
  ["Active", "ACTIVE"],
  ["On Leave", "LEAVE"],
  ["Resigned", "RESIGNED"],
  ["Retired", "RETIRED"],
  ["Terminated", "TERMINATED"],
];

export default function Filters() {
  const [isForeign, setIsForeign] = useQueryState(
    "isForeign",
    searchParamsParsers.isForeign
  );
  const [employeeStatus, setEmployeeStatus] = useQueryState(
    "employeeStatus",
    searchParamsParsers.employeeStatus
  );

  const empOriginKey = useMemo(() => isForeign, [isForeign]);

  const empStatusKey = useMemo(() => employeeStatus.join(), [employeeStatus]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="[&_svg]:size-4 justify-start gap-4 w-48"
        >
          <Filter />
          Filter
          <span className="flex-1"></span>
          <ChevronsUpDown className="text-muted-foreground" />
        </Button>
      </PopoverTrigger>

      <PopoverContent align="start" className="w-48 flex flex-col gap-4">
        <div className="flex flex-col gap-2" key={empOriginKey}>
          <Label>Employment Origin</Label>
          {[
            ["Select All", "all"],
            ["Domestic Hire", "0"],
            ["International Hire", "1"],
          ].map(([label, value]) => (
            <div
              key={`emp-origin-${label}`}
              className="flex gap-2 items-center"
            >
              <Checkbox
                id={`emp-origin-cb-${label}`}
                defaultChecked={isForeign === value || isForeign === "all"}
                onCheckedChange={(val) => {
                  if (val === "indeterminate") return;

                  if (val) {
                    setIsForeign(value as typeof isForeign);
                  } else {
                    setIsForeign(null);
                  }
                }}
              />
              <Label
                htmlFor={`emp-origin-cb-${label}`}
                className="cursor-pointer"
              >
                {label}
              </Label>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2" key={empStatusKey}>
          <Label>Employment Status</Label>
          {EmploymentStatusList.map(([label, value]) => (
            <div
              key={`emp-status-${label}`}
              className="flex gap-2 items-center"
            >
              <Checkbox
                id={`emp-status-cb-${label}`}
                defaultChecked={
                  value === "ALL"
                    ? employeeStatus.length == EmploymentStatusList.length - 1
                    : employeeStatus.includes(value)
                }
                onCheckedChange={(val) => {
                  if (val === "indeterminate") return;

                  const s = new Set(employeeStatus);

                  if (val) {
                    if (value === "ALL") {
                      EmploymentStatusList.forEach((item) => {
                        if (item[1] !== "ALL") s.add(item[1]);
                      });
                    } else {
                      s.add(value);
                    }
                  } else {
                    if (value === "ALL") {
                      s.clear();
                    } else {
                      s.delete(value);
                    }
                  }

                  if (s.size > 0) setEmployeeStatus(Array.from(s));
                  else setEmployeeStatus(null);
                }}
              />
              <Label
                htmlFor={`emp-status-cb-${label}`}
                className="cursor-pointer"
              >
                {label}
              </Label>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
