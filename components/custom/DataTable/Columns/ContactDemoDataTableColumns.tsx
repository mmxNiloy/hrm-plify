"use client";
import { SortableHeader } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { IContactDemo } from "@/schema/IContactDemoSchema";
import ContactDemoDeleteAlertDialog from "../../AlertDialog/ContactDemoDeleteAlertDialog";

export const ContactDemoDataTableColumns: ColumnDef<IContactDemo>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <SortableHeader name="ID" column={column} />,
  },
  {
    accessorKey: "first_name",
    header: ({ column }) => (
      <SortableHeader name="First Name" column={column} />
    ),
  },
  {
    accessorKey: "last_name",
    header: ({ column }) => <SortableHeader name="Last Name" column={column} />,
  },
  {
    accessorKey: "email",
    header: ({ column }) => <SortableHeader name="Email" column={column} />,
  },
  {
    accessorKey: "contact_num",
    header: ({ column }) => (
      <SortableHeader name="Contact Number" column={column} />
    ),
  },
  {
    accessorKey: "message",
    header: ({ column }) => <SortableHeader name="Message" column={column} />,
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => <SortableHeader name="Date" column={column} />,
    cell: ({ row }) =>
      new Date(row.original.created_at ?? new Date()).toLocaleDateString(
        "en-GB"
      ),
  },
  {
    id: "action-delete",
    header: "Delete Action",
    cell: ({ row }) => (
      <ContactDemoDeleteAlertDialog asIcon id={row.original.id} />
    ),
  },
];
