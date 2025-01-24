"use client";
import { Button } from "@/components/ui/button";
import { SortableHeader } from "@/components/ui/data-table";
import Icons from "@/components/ui/icons";
import { ICompanyDoc } from "@/schema/CompanySchema";
import { ButtonBase } from "@/styles/button.tailwind";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import CompanyDocumentEditDialog from "../../../Dialog/Company/CompanyEditDialog/CompanyDocumentEditDialog";
import CompanyDocumentDeleteAlertDialog from "@/components/custom/AlertDialog/CompanyDocumentDeleteAlertDialog";

export const CompanyDocumentDataTableColumns: ColumnDef<ICompanyDoc>[] = [
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
    id: "action-view",
    header: ({ column }) => "View",
    cell: ({ row }) =>
      row.original.doc_link ? (
        <Link passHref href={row.original.doc_link} target="_blank">
          <Button variant={"ghost"} className={ButtonBase} size={"icon"}>
            <Icons.visible />
          </Button>
        </Link>
      ) : (
        <Button variant={"ghost"} className={ButtonBase} size={"icon"} disabled>
          <Icons.visible />
        </Button>
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
  {
    id: "delete",
    cell: ({ row }) => (
      <CompanyDocumentDeleteAlertDialog document_id={row.original.doc_id} />
    ),
  },
];
