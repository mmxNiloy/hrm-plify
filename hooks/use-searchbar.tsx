"use client";

import { searchParamsParsers } from "@/utils/searchParamsParsers";
import { useQueryState } from "nuqs";
import { useCallback } from "react";

export default function useSearchbar() {
  const [searchQuery, setSearchQuery] = useQueryState(
    "search",
    searchParamsParsers.search
      .withDefault("")
      .withOptions({ shallow: false, throttleMs: 1000 })
  );

  const resetSearch = useCallback(() => {
    setSearchQuery(null);
  }, [setSearchQuery]);

  return { searchQuery, setSearchQuery, resetSearch };
}
