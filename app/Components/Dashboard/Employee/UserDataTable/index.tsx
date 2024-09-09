import { NetworkedDataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import React from "react";

export default function UserDataTable({ company_id }: { company_id: number }) {
  return (
    <NetworkedDataTable
      src={`/api/company/employee/${company_id}`}
      columns={columns}
    />
  );
}
