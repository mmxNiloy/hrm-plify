"use client";

import { SortableHeader } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { IBank } from "@/schema/BankSchema";
import BankEditPopover from "@/components/custom/Popover/Company/BankEditPopover";

export const CompanyBankDataTableColumns: ColumnDef<IBank>[] = [
  {
    accessorKey: "bank_id",
    header: ({ column }) => <SortableHeader column={column} name="ID" />,
  },
  {
    accessorKey: "bank_name",
    header: ({ column }) => <SortableHeader column={column} name="Bank" />,
  },
  {
    accessorKey: "bank_shortcode",
    header: ({ column }) => <SortableHeader column={column} name="Bank" />,
  },
  {
    id: "action-edit",
    cell: ({ row }) => (
      <BankEditPopover
        data={row.original}
        company_id={row.original.company_id}
        asIcon
      />
    ),
  },
];
