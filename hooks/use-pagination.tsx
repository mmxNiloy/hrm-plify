"use client";
import { searchParamsParsers } from "@/utils/searchParamsParsers";
import { useQueryState } from "nuqs";
import { useCallback } from "react";

export function usePagination() {
  const [page, setPage] = useQueryState("page", searchParamsParsers.page);
  const [limit, setLimit] = useQueryState("limit", searchParamsParsers.limit);

  const reset = useCallback(() => {
    setPage(null);
    setLimit(null);
  }, [setLimit, setPage]);

  return {
    page,
    setPage,
    limit,
    setLimit,
    reset,
  };
}
