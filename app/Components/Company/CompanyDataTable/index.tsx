import { NetworkedDataTable } from "@/components/ui/data-table";
import React from "react";
import { CompanyDataTableColumns } from "./columns";

export default function CompanyDataTable() {
  return (
    <NetworkedDataTable
      src={"/api/company"}
      columns={CompanyDataTableColumns}
    />
  );
}
