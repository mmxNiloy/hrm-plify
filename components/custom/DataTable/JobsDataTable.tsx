"use server";
import { DataTable } from "@/components/ui/data-table/data-table";
import React from "react";
import { JobsDataTableColumns } from "./Columns/JobsDataTableColumns";
import { IDesignation } from "@/schema/DesignationSchema";
import { cookies } from "next/headers";
import { getDesignations } from "@/app/(server)/actions/getDesignations";

export default async function JobsDataTable({
  company_id,
}: {
  company_id: number;
}) {
  const designations = await getDesignations({
    company_id,
    page: 1,
    limit: -1,
  });
  return (
    <DataTable columns={JobsDataTableColumns} data={designations.data ?? []} />
  );
}
