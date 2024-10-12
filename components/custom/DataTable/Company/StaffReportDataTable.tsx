import { NetworkedDataTable } from "@/components/ui/data-table";
import React from "react";
import { StaffReportDataTableColumns } from "../Columns/Company/StaffReportDataTableColumns";

export default function StaffReportDataTable({
  companyId,
}: {
  companyId: number;
}) {
  return (
    <NetworkedDataTable
      columns={StaffReportDataTableColumns}
      src={`/api/company/employee/${companyId}`}
    />
  );
}
