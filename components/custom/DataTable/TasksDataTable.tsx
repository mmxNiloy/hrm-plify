import { DataTable } from "@/components/ui/data-table/data-table";
import React from "react";
import { TasksDataTableColumns } from "./Columns/TasksDataTableColumns";

export default function TasksDataTable({ company_id }: { company_id: number }) {
  console.log("TODO: Hit api and get tasks");
  return <DataTable columns={TasksDataTableColumns} data={[]} />;
}
