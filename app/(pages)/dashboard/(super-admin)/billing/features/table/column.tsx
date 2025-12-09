"use client";

import SortableHeader from "@/components/ui/data-table/sortable-header";
import { IBank } from "@/schema/form/bank.schema";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";
import CellActions from "./cell-actions";
import { IBilling } from "@/schema/form/billing.schema";

interface ColumnType extends IBilling {
  updateAccess?: boolean;
}

export const columns: ColumnDef<ColumnType>[] = [
  {
    id: "ID",
    accessorKey: "id",
    header: ({ column }) => <SortableHeader column={column} name={"Bill ID"} />,
  },
  {
    id: "Name",
    accessorKey: "bank",
    header: ({ column }) => (
      <SortableHeader column={column} name={"Bank Name"} />
    ),
    cell: ({ row }) => row.original.account?.bank?.name,
  },
  {
    id: "Company",
    accessorKey: "company",
    header: ({ column }) => <SortableHeader column={column} name={"Company"} />,
    cell: ({ row }) => row.original.company.company_name,
  },
  {
    id: "Address",
    accessorKey: "address",
    header: ({ column }) => <SortableHeader column={column} name={"Address"} />,
  },
  {
    id: "Recipient",
    accessorKey: "recipient",
    header: ({ column }) => (
      <SortableHeader column={column} name={"Recipient"} />
    ),
  },
  {
    id: "Status",
    accessorKey: "status",
    header: ({ column }) => <SortableHeader column={column} name={"Status"} />,
  },
  {
    id: "Items",
    accessorKey: "items",
    header: ({ column }) => (
      <SortableHeader column={column} name="Total Items" />
    ),
    cell: ({ row }) => <span>{row.original.items.length}</span>,
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
  // {
  //   id: "Actions",
  //   header: "Actions",
  //   cell: ({ row }) => <CellActions bankId={row.original.id} />,
  // },
];
