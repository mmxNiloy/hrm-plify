"use client";

import { SortableHeader } from "@/components/ui/data-table";
import { ICompanyUser } from "@/schema/UserSchema";
import { getFullNameOfUser } from "@/utils/Misc";
import { ColumnDef } from "@tanstack/react-table";
import CellActions from "./cell-actions";

interface Props extends ICompanyUser {
  updateAccess?: boolean;
}

export const columns: ColumnDef<Props>[] = [
  {
    id: "ID",
    accessorKey: "user_id",
    header: ({ column }) => <SortableHeader column={column} name="ID" />,
  },
  {
    id: "Full Name",
    header: ({ column }) => <SortableHeader column={column} name="Full Name" />,
    cell: ({ row }) => getFullNameOfUser(row.original.users),
  },
  {
    id: "Email",
    header: ({ column }) => <SortableHeader column={column} name="Email" />,
    cell: ({ row }) => row.original.users.email,
  },
  {
    id: "Actions",
    cell: ({ row }) =>
      !row.original.updateAccess ? null : (
        <CellActions
          data={row.original}
          updateAccess={row.original.updateAccess}
        />
      ),
  },
];
