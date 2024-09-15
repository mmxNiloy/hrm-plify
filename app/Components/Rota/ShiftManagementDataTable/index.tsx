import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { columns } from "./columns";

export default function ShiftManagementDataTable({
  showOptions,
}: {
  showOptions?: boolean;
}) {
  return <DataTable columns={columns} data={[]} showOptions={!showOptions} />;
}
