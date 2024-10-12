import { DataTable, StaticDataTable } from "@/components/ui/data-table";
import React from "react";
import { OffDaysDataTableColumns } from "../Columns/Rota/OffDaysDataTableColumns";
import { IOffDays, IOffDaysWithShifts, IShift } from "@/schema/RotaSchema";

export default function OffDaysDataTable({
  showOptions,
  data = [],
}: {
  showOptions?: boolean;
  data?: IOffDaysWithShifts[];
}) {
  return (
    <StaticDataTable
      showOptions={showOptions}
      data={data}
      columns={OffDaysDataTableColumns}
    />
  );
}
