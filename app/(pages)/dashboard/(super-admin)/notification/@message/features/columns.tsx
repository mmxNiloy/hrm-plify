"use client";
import { SortableHeader } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { IContactDemo } from "@/schema/IContactDemoSchema";
import CellActions from "./cell-actions";

export const columns: ColumnDef<IContactDemo>[] = [
  {
    id: "ID",
    accessorKey: "id",
    header: ({ column }) => <SortableHeader name="ID" column={column} />,
  },
  {
    id: "First Name",
    accessorKey: "first_name",
    header: ({ column }) => (
      <SortableHeader name="First Name" column={column} />
    ),
  },
  {
    id: "Last Name",
    accessorKey: "last_name",
    header: ({ column }) => <SortableHeader name="Last Name" column={column} />,
  },
  {
    id: "Email",
    accessorKey: "email",
    header: ({ column }) => <SortableHeader name="Email" column={column} />,
  },
  {
    id: "Contact",
    accessorKey: "contact_num",
    header: ({ column }) => (
      <SortableHeader name="Contact Number" column={column} />
    ),
  },
  {
    id: "Message",
    accessorKey: "message",
    header: ({ column }) => <SortableHeader name="Message" column={column} />,
    cell: ({ row }) => (
      <p className="w-48 line-clamp-3 text-ellipsis overflow-clip">
        {row.original.message}
      </p>
    ),
  },
  {
    id: "Creted At",
    accessorKey: "created_at",
    header: ({ column }) => <SortableHeader name="Date" column={column} />,
    cell: ({ row }) =>
      new Date(row.original.created_at ?? new Date()).toLocaleDateString(
        "en-GB"
      ),
  },
  {
    id: "Action",
    header: "Action",
    cell: ({ row }) => <CellActions data={row.original} />,
  },
];
