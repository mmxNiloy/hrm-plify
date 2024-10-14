import { StaticDataTable } from "@/components/ui/data-table";
import React from "react";
import { ShiftsDataTableColumns } from "../Columns/Rota/ShiftsDataTableColumns";
import { IShift } from "@/schema/RotaSchema";

export default function ShiftManagementDataTable({
  showOptions,
  data = [],
}: {
  showOptions?: boolean;
  data?: IShift[];
}) {
  return (
    <StaticDataTable
      columns={ShiftsDataTableColumns}
      data={data}
      showOptions={!showOptions}
    />
  );
}
