import { DataTableSkeleton } from "@/components/ui/data-table";
import React from "react";
import { columns } from "./columns";

export default function ContractAgreementDataTableSkeleton() {
  return <DataTableSkeleton columns={columns} showOptions />;
}
