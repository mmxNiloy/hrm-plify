"use client";

import { SortableHeader } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { IBank } from "@/schema/BankSchema";
import BankEditPopover from "@/components/custom/Popover/Company/BankEditPopover";
import { ITax } from "@/schema/TaxSchema";
import TaxEditPopover from "@/components/custom/Popover/Company/TaxEditPopover";

export const CompanyTaxDataTableColumns: ColumnDef<ITax>[] = [
  {
    accessorKey: "tax_id",
    header: ({ column }) => <SortableHeader column={column} name="ID" />,
  },
  {
    accessorKey: "tax_code",
    header: ({ column }) => <SortableHeader column={column} name="Tax Code" />,
  },
  {
    accessorKey: "percentage",
    header: ({ column }) => (
      <SortableHeader column={column} name="Tax Percentage (%)" />
    ),
  },
  {
    accessorKey: "tax_reference",
    header: ({ column }) => (
      <SortableHeader column={column} name="Tax Reference" />
    ),
  },
  {
    id: "action-edit",
    cell: ({ row }) => (
      <TaxEditPopover
        data={row.original}
        company_id={row.original.company_id}
        asIcon
      />
    ),
  },
];
