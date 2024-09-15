import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { columns } from "./columns";

export default function OffDaysDataTable({
  showOptions,
}: {
  showOptions?: boolean;
}) {
  return <DataTable showOptions={showOptions} data={[]} columns={columns} />;
}
