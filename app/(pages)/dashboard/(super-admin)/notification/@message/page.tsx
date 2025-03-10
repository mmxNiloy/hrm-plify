"use server";

import { getContactDemo } from "@/app/(server)/actions/getContactDemo";
import { ContactDemoDataTableColumns } from "@/components/custom/DataTable/Columns/ContactDemoDataTableColumns";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import { DataTable } from "@/components/ui/data-table";
import React from "react";

export default async function MessagesSlot() {
  const messages = await getContactDemo({});
  if (messages.error) {
    return <ErrorFallbackCard error={messages.error} />;
  }
  return (
    <DataTable data={messages.data} columns={ContactDemoDataTableColumns} />
  );
}
