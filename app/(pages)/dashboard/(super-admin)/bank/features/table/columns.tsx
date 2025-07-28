"use client";

import SortableHeader from "@/components/ui/data-table/sortable-header";
import { IBank } from "@/schema/form/bank.schema";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";
import CellActions from "./cell-actions";

interface ColumnType extends IBank {
  updateAccess?: boolean;
}

export const columns: ColumnDef<ColumnType>[] = [
  {
    id: "ID",
    accessorKey: "id",
    header: ({ column }) => <SortableHeader column={column} name={"Bank ID"} />,
  },
  {
    id: "Name",
    accessorKey: "name",
    header: ({ column }) => (
      <SortableHeader column={column} name={"Bank Name"} />
    ),
  },
  {
    id: "Sort Code",
    accessorKey: "sortcode",
    header: ({ column }) => (
      <SortableHeader column={column} name={"Sort Code"} />
    ),
  },
  {
    id: "Accounts",
    accessorKey: "accounts",
    header: ({ column }) => (
      <SortableHeader column={column} name="Total Accounts" />
    ),
    cell: ({ row }) => <span>{row.original._count.accounts}</span>,
  },
  {
    id: "Last modified",
    accessorKey: "updated_at",
    header: ({ column }) => (
      <SortableHeader column={column} name={"Last Modified"} />
    ),
    cell: ({ row }) =>
      formatDate(new Date(row.original.updated_at), "dd-MM-yyyy"),
  },
  {
    id: "Actions",
    header: "Actions",
    cell: ({ row }) => <CellActions bankId={row.original.id} />,
  },
];
