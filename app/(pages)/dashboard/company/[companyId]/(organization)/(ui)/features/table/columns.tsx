"use client";
import { Button } from "@/components/ui/button";
import { SortableHeader } from "@/components/ui/data-table";
import Icons from "@/components/ui/icons";
import { ICompanyDoc } from "@/schema/CompanySchema";
import { ButtonBase } from "@/styles/button.tailwind";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import CellActions from "./cell-actions";

interface Props extends ICompanyDoc {
  updateAccess?: boolean;
}

export const CompanyDocumentDataTableColumns: ColumnDef<Props>[] = [
  {
    accessorKey: "doc_id",
    header: ({ column }) => (
      <SortableHeader column={column} name={"Document ID"} />
    ),
  },
  {
    accessorKey: "doc_name",
    header: ({ column }) => (
      <SortableHeader column={column} name={"Document Name"} />
    ),
  },
  {
    accessorKey: "doc_type",
    header: ({ column }) => (
      <SortableHeader column={column} name={"Document Type"} />
    ),
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => (
      <SortableHeader column={column} name={"Date Modified"} />
    ),
    cell: ({ row }) =>
      row.original.updated_at
        ? new Date(row.original.updated_at).toLocaleDateString("en-GB")
        : "-",
  },
  {
    id: "Actions",
    header: "Actions",
    cell: ({ row }) => <CellActions data={row.original} />,
  },
];
