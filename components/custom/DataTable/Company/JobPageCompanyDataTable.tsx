import { NetworkedDataTable } from "@/components/ui/data-table";
import React from "react";
import { JobPageCompanyDataTableColumns } from "../Columns/Company/JobPageCompanyDataTableColumns";

export default function JobPageCompanyDataTable() {
  return (
    <NetworkedDataTable
      src={"/api/job"}
      columns={JobPageCompanyDataTableColumns}
    />
  );
}
