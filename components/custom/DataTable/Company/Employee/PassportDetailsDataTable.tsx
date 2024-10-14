import { DataTable } from "@/components/ui/data-table";
import { IEmployeePassportDetail } from "@/schema/EmployeeSchema";
import React from "react";
import { PassportDetailsDataTableColumns } from "../../Columns/Company/Employee/PassportDetailsDataTableColumns";

export default function PassportDetailsDataTable({
  data,
}: {
  data: IEmployeePassportDetail[];
}) {
  return (
    <DataTable
      key={`passport-info-table-length-${data.length}`}
      data={data}
      columns={PassportDetailsDataTableColumns}
    />
  );
}
