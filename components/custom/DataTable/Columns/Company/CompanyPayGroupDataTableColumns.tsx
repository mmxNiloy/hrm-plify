"use client";

import { SortableHeader } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { IPayGroup } from "@/schema/PayGroupSchema";
import { cn } from "@/lib/utils";
import PayGroupEditPopover from "../../../Popover/Company/PayGroupEditPopover";

export const CompanyPayGroupDataTableColumns: ColumnDef<IPayGroup>[] = [
  {
    accessorKey: "pay_group_id",
    header: ({ column }) => <SortableHeader column={column} name="ID" />,
  },
  {
    accessorKey: "pay_group_name",
    header: ({ column }) => <SortableHeader column={column} name="Pay Group" />,
  },
  {
    accessorKey: "is_active",
    header: ({ column }) => <SortableHeader column={column} name="Status" />,
    cell: ({ row }) => (
      <div
        className={cn(
          "w-fit px-2 py-1 text-center self-center justify-self-center text-white",
          row.original.is_active ? "bg-green-500" : "bg-red-500"
        )}
      >
        {row.original.is_active ? "Active" : "Inactive"}
      </div>
    ),
  },
  {
    id: "action-edit",
    cell: ({ row }) => (
      <PayGroupEditPopover
        data={row.original}
        company_id={row.original.company_id}
        asIcon
      />
    ),
  },
];
