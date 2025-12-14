import { DataTable } from "@/components/ui/data-table/data-table";
import { IEmployeeEducationalDetail } from "@/schema/EmployeeSchema";
import React from "react";
import { EducationalInfoDataTableColumns } from "../../Columns/Company/Employee/EducationalInfoDataTableColumns";

export default function EducationalInfoDataTable({
  data,
}: {
  data: IEmployeeEducationalDetail[];
}) {
  // console.log("EducationalInfoTable > Data found", data);

  return (
    <DataTable
      key={`educational-info-table-length-${data.length}`}
      data={data}
      columns={EducationalInfoDataTableColumns}
    />
  );
}
