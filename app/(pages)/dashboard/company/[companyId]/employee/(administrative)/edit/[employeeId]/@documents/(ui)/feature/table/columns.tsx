"use client";
import { Button } from "@/components/ui/button";
import { SortableHeader } from "@/components/ui/data-table";
import Icons from "@/components/ui/icons";
import { ICompanyDoc, IEmployeeDoc } from "@/schema/CompanySchema";
import { ButtonBase } from "@/styles/button.tailwind";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import CellActions from "./cell-actions";

interface Props extends IEmployeeDoc {
  updateAccess?: boolean;
}

export const EmployeeDocumentDataTableColumns: ColumnDef<Props>[] = [
  {
    id: "ID",
    accessorKey: "doc_id",
    header: ({ column }) => (
      <SortableHeader column={column} name={"Document ID"} />
    ),
  },
  {
    id: "Name",
    accessorKey: "doc_name",
    header: ({ column }) => (
      <SortableHeader column={column} name={"Document Name"} />
    ),
  },
  {
    id: "Type",
    accessorKey: "doc_type",
    header: ({ column }) => (
      <SortableHeader column={column} name={"Document Type"} />
    ),
    cell: ({ row }) => (
      <span className="w-64 line-clamp-3 text-ellipsis">
        {row.original.doc_type}
      </span>
    ),
  },
  {
    id: "Updated At",
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
