"use client";

import { SortableHeader } from "@/components/ui/data-table";
import { ICompanyUser } from "@/schema/UserSchema";
import { getFullNameOfUser } from "@/utils/Misc";
import { ColumnDef } from "@tanstack/react-table";
import CompanyAdminEditDialog from "../../../Dialog/Company/CompanyAdminEditDialog";

interface Props extends ICompanyUser {
  updateAccess?: boolean;
}

export const CompanyAdminListDataTableColumns: ColumnDef<Props>[] = [
  {
    accessorKey: "user_id",
    header: ({ column }) => <SortableHeader column={column} name="ID" />,
  },
  {
    id: "user-name",
    header: ({ column }) => <SortableHeader column={column} name="Full Name" />,
    cell: ({ row }) => getFullNameOfUser(row.original.users),
  },
  {
    id: "email",
    header: ({ column }) => <SortableHeader column={column} name="Email" />,
    cell: ({ row }) => row.original.users.email,
  },
  {
    id: "edit-action",
    cell: ({ row }) =>
      !row.original.updateAccess ? null : (
        <CompanyAdminEditDialog
          data={row.original}
          companyId={row.original.company_id}
          asIcon
          asEdit
        />
      ),
  },
];
