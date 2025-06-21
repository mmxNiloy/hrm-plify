"use server";
import { DataTable } from "@/components/ui/data-table/data-table";
import React from "react";
import { columns } from "./columns";
import { searchParamsCache } from "@/utils/searchParamsParsers";
import { DataTableError } from "@/components/ui/data-table/data-table-error";
import { getDemoContacts } from "@/app/(server)/actions/demo-contact/get-demo-contacts.controller";

export default async function MessageListTable() {
  const page = searchParamsCache.get("page");
  const limit = searchParamsCache.get("limit");
  const demoOnly = searchParamsCache.get("demoOnly");

  const messages = await getDemoContacts({
    page,
    limit,
    demoOnly: demoOnly < 0 ? undefined : demoOnly,
  });

  if (messages.error) {
    console.error(messages);
    return <DataTableError errorMessage="Failed to fetch messages." />;
  }

  const data = messages.payload;
  const meta = messages.meta!;

  return (
    <DataTable
      columns={columns}
      data={data}
      pageCount={meta.pageCount}
      totalItems={meta.total}
    />
  );
}
