"use client";
import { SortableHeader } from "@/components/ui/data-table";
import { IUser } from "@/schema/UserSchema";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<IUser>[] = [
  {
    accessorKey: "user_id",
    header: ({ column }) => <SortableHeader column={column} name="ID" />,
  },
  {
    accessorKey: "first_name",
    header: ({ column }) => (
      <SortableHeader column={column} name="First name" />
    ),
  },
  {
    accessorKey: "last_name",
    header: ({ column }) => <SortableHeader column={column} name="Last name" />,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <SortableHeader column={column} name="Status" />,
  },
  {
    accessorKey: "user_roles",
    header: ({ column }) => <SortableHeader column={column} name="Role" />,
    cell: ({ row }) => row.original.user_roles.roles.role_name,
  },
];
