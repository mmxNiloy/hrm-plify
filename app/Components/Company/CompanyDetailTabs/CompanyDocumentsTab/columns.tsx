"use client";
import { Button } from "@/components/ui/button";
import { SortableHeader } from "@/components/ui/data-table";
import Icons from "@/components/ui/icons";
import { ICompanyDoc } from "@/schema/CompanySchema";
import { ButtonBase } from "@/styles/button.tailwind";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import CompanyDocumentEditDialog from "../../CompanyEditDialog/CompanyDocumentEditDialog";

export const columns: ColumnDef<ICompanyDoc>[] = [
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
    accessorKey: "doc_type_id",
    header: ({ column }) => (
      <SortableHeader column={column} name={"Document Type ID"} />
    ),
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => (
      <SortableHeader column={column} name={"Date Modified"} />
    ),
    cell: ({ row }) =>
      new Date(row.original.updated_at).toLocaleDateString("en-GB"),
  },
  {
    id: "action",
    cell: ({ row }) => (
      <Link passHref href={row.original.doc_link ?? "#"}>
        <Button variant={"ghost"} className={ButtonBase} size={"icon"}>
          <Icons.visible />
        </Button>
      </Link>
    ),
  },
  {
    id: "edit",
    cell: ({ row }) => (
      <CompanyDocumentEditDialog
        company_id={row.original.company_id}
        asIcon
        data={row.original}
      />
    ),
  },
];
