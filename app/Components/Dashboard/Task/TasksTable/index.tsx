import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { columns } from "./columns";

export default function TasksTable({ company_id }: { company_id: number }) {
  console.log("TODO: Hit api and get tasks");
  return <DataTable columns={columns} data={[]} />;
}
