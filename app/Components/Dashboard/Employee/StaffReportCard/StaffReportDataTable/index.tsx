import { NetworkedDataTable } from "@/components/ui/data-table";
import React from "react";
import { columns } from "./columns";

export default function StaffReportDataTable({
  companyId,
}: {
  companyId: number;
}) {
  return (
    <NetworkedDataTable
      columns={columns}
      src={`/api/company/employee/${companyId}`}
    />
  );
}
