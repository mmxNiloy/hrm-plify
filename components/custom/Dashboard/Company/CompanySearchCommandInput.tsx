"use client";
import { CommandInput } from "@/components/ui/command";
import useSearchbar from "@/hooks/use-searchbar";
import React from "react";

export default function CompanySearchCommandInput() {
  const { searchQuery, setSearchQuery } = useSearchbar();
  return (
    <CommandInput
      placeholder="Select a company or search..."
      onValueChange={(query) => {
        setSearchQuery(query);
      }}
      value={searchQuery}
      wrapperClassName="flex-grow"
      className="text-sm sm:text-base pr-10 sm:pr-12"
    />
  );
}
