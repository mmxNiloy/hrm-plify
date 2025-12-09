"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toCapCase } from "@/utils/Misc";
import { searchParamsParsers } from "@/utils/searchParamsParsers";
import { useQueryState } from "nuqs";
import React, { useCallback } from "react";

const options = ["profile", "authority", "address", "trade", "documents"];

export default function CompanyDetailViewSelect({
  companyId,
}: {
  companyId: string;
}) {
  const [view, setView] = useQueryState(
    "companyProfileView",
    searchParamsParsers.companyProfileView.withOptions({
      shallow: false,
      throttleMs: 300,
    })
  );

  const handleViewChange = useCallback(
    (val: string) => {
      setView(val as typeof view);
    },
    [setView]
  );

  return (
    <Select value={view ?? "profile"} onValueChange={handleViewChange}>
      <SelectTrigger className="max-w-40">
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>Views</SelectLabel>

          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {toCapCase(option)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
