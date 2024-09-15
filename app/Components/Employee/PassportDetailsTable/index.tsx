import { DataTable } from "@/components/ui/data-table";
import {
  IEmployeeEducationalDetail,
  IEmployeePassportDetail,
} from "@/schema/EmployeeSchema";
import React from "react";
import { columns } from "./columns";

export default function PassportDetailsTable({
  data,
}: {
  data: IEmployeePassportDetail[];
}) {
  return (
    <DataTable
      key={`passport-info-table-length-${data.length}`}
      data={data}
      columns={columns}
    />
  );
}
