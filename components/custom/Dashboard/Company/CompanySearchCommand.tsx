import { Command, CommandList } from "@/components/ui/command";
import React, { Suspense } from "react";
import CompanySearchCommandContent from "./CompanySearchCommandContent";
import CompanySearchCommandInput from "./CompanySearchCommandInput";
import CompanySearchCommandSkeleton from "./CompanySearchCommandSkeleton";
import { serialize } from "@/utils/searchParamsParsers";
import { SearchParams } from "nuqs";
import CompanySearchCommandDropdown from "./CompanySearchCommandDropdown";

export default function CompanySearchCommand({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  // This key is used for invoke suspense if any of the search params changed (used for filters).
  const key = serialize({ ...searchParams });

  return (
    <Command className="rounded-lg border shadow-md">
      <div className="relative flex items-center">
        <CompanySearchCommandInput />

        <CompanySearchCommandDropdown />
      </div>

      <CommandList className="max-h-[60vh] sm:max-h-[70vh] overflow-auto">
        <Suspense key={key} fallback={<CompanySearchCommandSkeleton />}>
          <CompanySearchCommandContent />
        </Suspense>
      </CommandList>
    </Command>
  );
}
