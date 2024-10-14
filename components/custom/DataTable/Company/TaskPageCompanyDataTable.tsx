import { NetworkedDataTable } from "@/components/ui/data-table";
import React from "react";
import { TaskPageCompanyDataTableColumns } from "../Columns/Company/TaskPageCompanyDataTableColumns";

export default function TaskPageCompanyDataTable() {
  return (
    <NetworkedDataTable
      src={"/api/company"}
      columns={TaskPageCompanyDataTableColumns}
    />
  );
}
