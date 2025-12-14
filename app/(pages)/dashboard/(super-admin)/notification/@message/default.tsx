"use server";

import { getContactDemo } from "@/app/(server)/actions/getContactDemo";
import { ContactDemoDataTableColumns } from "@/components/custom/DataTable/Columns/ContactDemoDataTableColumns";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import { DataTable } from "@/components/ui/data-table/data-table";
import DataTableSkeleton from "@/components/ui/data-table/data-table-skeleton";
import React, { Suspense } from "react";
import MessageListTable from "./features/message-list-table";
import { searchParamsCache, serialize } from "@/utils/searchParamsParsers";
import { SearchParams } from "nuqs";

export default async function MessagesSlot({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sParams = await searchParams;
  searchParamsCache.parse(sParams);
  const key = serialize(sParams);

  return (
    <Suspense key={key} fallback={<DataTableSkeleton rows={10} columns={8} />}>
      <MessageListTable />
    </Suspense>
  );
}
