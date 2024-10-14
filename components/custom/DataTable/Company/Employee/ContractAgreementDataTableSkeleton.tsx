import { DataTableSkeleton } from "@/components/ui/data-table";
import React from "react";
import { CompanyContractAgreementDataTableColumns } from "../../Columns/Company/CompanyContractAgreementDataTableColumns";

export default function ContractAgreementDataTableSkeleton() {
  return (
    <DataTableSkeleton
      columns={CompanyContractAgreementDataTableColumns}
      showOptions
    />
  );
}
