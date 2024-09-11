import { DataTable } from "@/components/ui/data-table";
import { IEmployeeEducationalDetail } from "@/schema/EmployeeSchema";
import React from "react";
import { columns } from "./columns";

export default function EducationalInfoTable({
  data,
}: {
  data: IEmployeeEducationalDetail[];
}) {
  console.log("EducationalInfoTable > Data found", data);

  return (
    <DataTable
      key={`educational-info-table-length-${data.length}`}
      data={data}
      columns={columns}
    />
  );
}
