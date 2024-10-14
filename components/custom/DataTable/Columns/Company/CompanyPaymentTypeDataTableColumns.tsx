"use client";

import { SortableHeader } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import TaxEditPopover from "@/components/custom/Popover/Company/TaxEditPopover";
import { IPaymentType } from "@/schema/PaymentTypeSchema";
import PaymentTypeEditPopover from "@/components/custom/Popover/Company/PaymentTypeEditPopover";

export const CompanyPaymentTypeDataTableColumns: ColumnDef<IPaymentType>[] = [
  {
    accessorKey: "payment_type_id",
    header: ({ column }) => <SortableHeader column={column} name="ID" />,
  },
  {
    accessorKey: "payment_type_name",
    header: ({ column }) => (
      <SortableHeader column={column} name="Payment Type" />
    ),
  },
  {
    accessorKey: "min_hours",
    header: ({ column }) => (
      <SortableHeader column={column} name="Minimum Working Hours" />
    ),
  },
  {
    accessorKey: "rate",
    header: ({ column }) => <SortableHeader column={column} name="Rate" />,
  },
  {
    id: "action-edit",
    cell: ({ row }) => (
      <PaymentTypeEditPopover
        data={row.original}
        company_id={row.original.company_id}
        asIcon
      />
    ),
  },
];
