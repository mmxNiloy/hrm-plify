"use client";

import { searchParamsParsers } from "@/utils/searchParamsParsers";
import { useQueryState } from "nuqs";
import { useCallback } from "react";

export function useAttendanceFilter() {
  const [employees, setEmployees] = useQueryState(
    "employees",
    searchParamsParsers.employees
  );
  const [fromDate, setFromDate] = useQueryState(
    "fromDate",
    searchParamsParsers.fromDate
  );
  const [toDate, setToDate] = useQueryState(
    "toDate",
    searchParamsParsers.toDate
  );
  const [sort, setSort] = useQueryState("sort", searchParamsParsers.sort);

  const reset = useCallback(() => {
    setEmployees(null);
    setFromDate(null);
    setToDate(null);
    setSort(null);
  }, [setEmployees, setFromDate, setSort, setToDate]);

  return {
    employees,
    setEmployees,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    sort,
    setSort,
    reset,
  };
}
