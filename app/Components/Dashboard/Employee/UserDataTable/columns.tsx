"use client";
import { SortableHeader } from "@/components/ui/data-table";
import { ICompanyUser, IUser } from "@/schema/UserSchema";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<ICompanyUser>[] = [
  {
    accessorKey: "user_id",
    header: ({ column }) => <SortableHeader column={column} name="ID" />,
  },
  {
    id: "first_name",
    header: ({ column }) => (
      <SortableHeader column={column} name="First name" />
    ),
    cell: ({ row }) => row.original.users.first_name,
  },
  {
    id: "middle_name",
    header: ({ column }) => <SortableHeader column={column} name="Last name" />,
    cell: ({ row }) => row.original.users.middle_name,
  },
  {
    id: "last_name",
    header: ({ column }) => <SortableHeader column={column} name="Last name" />,
    cell: ({ row }) => row.original.users.last_name,
  },
  {
    id: "email",
    header: ({ column }) => <SortableHeader column={column} name="Status" />,
    cell: ({ row }) => row.original.users.email,
  },
  {
    id: "role",
    header: ({ column }) => <SortableHeader column={column} name="Role" />,
    cell: ({ row }) => row.original.roles.role_name,
  },
];
