"use client";

import { IBankAccount } from "@/schema/form/bank.schema";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import EditAccountDialog from "../../components/edit-account-dialog";
import DeleteAccountAlertDialog from "../../components/delete-account-alert-dialog";

export const columns: ColumnDef<IBankAccount>[] = [
  {
    accessorKey: "account_number",
    id: "Account Number",
    header: "Account Number",
    cell: ({ row }) => row.original.account_number,
  },
  {
    accessorKey: "account_type",
    id: "Account Type",
    header: "Account Type",
    cell: ({ row }) => row.original.account_type,
  },
  {
    accessorKey: "tag",
    id: "Tag",
    header: "Tag",
    cell: ({ row }) => row.original.tag,
  },
  {
    accessorKey: "currency",
    id: "Currency",
    header: "Currency",
    cell: ({ row }) => row.original.currency,
  },
  {
    accessorKey: "created_at",
    id: "Created At",
    header: "Created At",
    cell: ({ row }) => format(new Date(row.original.created_at), "dd-MM-yyyy"),
  },
  {
    accessorKey: "updated_at",
    id: "Updated At",
    header: "Updated At",
    cell: ({ row }) => format(new Date(row.original.updated_at), "dd-MM-yyyy"),
  },
  // Actions
  {
    accessorKey: "edit",
    id: "Edit",
    header: "Edit",
    cell: ({ row }) => <EditAccountDialog data={row.original} />,
  },
  {
    accessorKey: "delete",
    id: "Delete",
    header: "Delete",
    cell: ({ row }) => <DeleteAccountAlertDialog accountId={row.original.id} />,
  },
];
