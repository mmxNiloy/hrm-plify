"use client";

import { searchParamsParsers } from "@/utils/searchParamsParsers";
import { useQueryState } from "nuqs";
import React, { Activity, useMemo } from "react";

export default function ViewHolder({
  children,
  viewKey,
}: {
  children: React.ReactNode;
  viewKey: string;
}) {
  const [activeView] = useQueryState(
    "employeeProfileView",
    searchParamsParsers.employeeProfileView,
  );
  const shouldView = useMemo(
    () => activeView === viewKey,
    [activeView, viewKey],
  );

  return (
    <Activity mode={shouldView ? "visible" : "hidden"}>{children}</Activity>
  );
}
