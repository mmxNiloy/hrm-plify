import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { ShiftsDataTableColumns } from "./columns";
import { IShift } from "@/schema/RotaSchema";

export default function ShiftManagementDataTable({
  showOptions,
  data = [],
}: {
  showOptions?: boolean;
  data?: IShift[];
}) {
  return (
    <DataTable
      columns={ShiftsDataTableColumns}
      data={data}
      showOptions={!showOptions}
    />
  );
}
