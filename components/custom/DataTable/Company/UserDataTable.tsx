import {
  DataTableSkeleton,
  NetworkedDataTable,
} from "@/components/ui/data-table";
import { CompanyUserDataTableColumns } from "../Columns/Company/CompanyUserDataTableColumns";
import React from "react";

export default function UserDataTable({ company_id }: { company_id: number }) {
  return (
    <NetworkedDataTable
      src={`/api/company/employee/${company_id}`}
      columns={CompanyUserDataTableColumns}
    />
  );
}
