"use server";

import { getContactDemo } from "@/app/(server)/actions/getContactDemo";
import { ContactDemoDataTableColumns } from "@/components/custom/DataTable/Columns/ContactDemoDataTableColumns";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import { DataTable } from "@/components/ui/data-table";
import React from "react";

export default async function DemoRequestsSlot() {
  const demos = await getContactDemo({ is_demo_only: "true" });
  if (demos.error) {
    return <ErrorFallbackCard error={demos.error} />;
  }
  return <DataTable data={demos.data} columns={ContactDemoDataTableColumns} />;
}
