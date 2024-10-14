import { NetworkedDataTable } from "@/components/ui/data-table";
import React from "react";
import { RotaPageCompanyDataTableColumns } from "../Columns/Company/RotaPageCompanyDataTableColumns";

export default function RotaCompanyDataTable() {
  return (
    <NetworkedDataTable
      src={"/api/company"}
      columns={RotaPageCompanyDataTableColumns}
    />
  );
}
