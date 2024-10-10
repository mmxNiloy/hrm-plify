"use client";

import { SortableHeader } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { IAnnualPay, IPayGroup } from "@/schema/PayGroupSchema";
import { cn } from "@/lib/utils";
import AnnualPayEditPopover from "./AnnualPayEditPopover";

interface IAnnualPayWithPayGroups extends IAnnualPay {
  payGroups: IPayGroup[];
}

export const CompanyAnnualPayDataTableColumns: ColumnDef<IAnnualPayWithPayGroups>[] =
  [
    {
      accessorKey: "annual_pay_id",
      header: ({ column }) => <SortableHeader column={column} name="ID" />,
    },
    {
      id: "pay_group_name",
      header: ({ column }) => (
        <SortableHeader column={column} name="Pay Group" />
      ),
      cell: ({ row }) => row.original.pay_groups?.pay_group_name,
    },
    {
      accessorKey: "annual_pay_amount",
      header: ({ column }) => (
        <SortableHeader column={column} name="Annual Pay" />
      ),
      cell: ({ row }) => row.original.pay_groups?.pay_group_name,
    },
    {
      id: "is_active",
      header: ({ column }) => <SortableHeader column={column} name="Status" />,
      cell: ({ row }) => (
        <div
          className={cn(
            "w-fit px-2 py-1 text-center self-center justify-self-center text-white",
            row.original.pay_groups?.is_active ? "bg-green-500" : "bg-red-500"
          )}
        >
          {row.original.pay_groups?.is_active ? "Active" : "Inactive"}
        </div>
      ),
    },
    {
      id: "action-edit",
      cell: ({ row }) => (
        <AnnualPayEditPopover
          data={row.original}
          payGroups={row.original.payGroups}
          company_id={row.original.company_id}
          asIcon
        />
      ),
    },
  ];
