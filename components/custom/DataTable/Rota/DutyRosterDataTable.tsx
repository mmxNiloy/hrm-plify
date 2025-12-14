import { DataTable } from "@/components/ui/data-table/data-table";
import React from "react";
import { DutyRosterDataTableColumns } from "../Columns/Rota/DutyRosterDataTableColumns";
import { IDutyRosterWithEditData } from "@/schema/RotaSchema";

export default function DutyRosterDataTable({
  showOptions,
  data = [],
}: {
  showOptions?: boolean;
  data?: IDutyRosterWithEditData[];
}) {
  return (
    <DataTable
      columns={DutyRosterDataTableColumns}
      data={data}
      showOptions={showOptions}
    />
  );
}
