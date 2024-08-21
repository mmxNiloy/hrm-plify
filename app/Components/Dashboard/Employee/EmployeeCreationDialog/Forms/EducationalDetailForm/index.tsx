import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";

//! Unfinished
export default function EducationalDetailForm() {
  return (
    <div className="border rounded-md p-4">
      <DataTable columns={columns} data={[]} />
    </div>
  );
}
