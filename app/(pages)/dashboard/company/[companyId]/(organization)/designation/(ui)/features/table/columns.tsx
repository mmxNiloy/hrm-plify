"use client";

import SortableHeader from "@/components/ui/data-table/sortable-header";
import { ColumnDef } from "@tanstack/react-table";
import TextCapsule from "@/components/custom/TextCapsule";
import { cn } from "@/lib/utils";
import { IDesignation } from "@/schema/DesignationSchema";
import CellActions from "./cell-actions";

interface Props extends IDesignation {
  updateAccess?: boolean;
}

export const columns: ColumnDef<Props>[] = [
  {
    id: "Designation ID",
    accessorKey: "designation_id",
    header: ({ column }) => <SortableHeader column={column} name="ID" />,
  },
  {
    id: "Designation",
    accessorKey: "designation_name",
    header: ({ column }) => (
      <SortableHeader column={column} name="Designation" />
    ),
  },
  {
    id: "Department",
    header: ({ column }) => (
      <SortableHeader column={column} name="Department" />
    ),
    cell: ({ row }) => row.original.department.dpt_name,
  },
  {
    id: "Status",
    accessorKey: "is_active",
    header: "Status",
    cell: ({ row }) => (
      <TextCapsule
        className={cn(row.original.is_active ? "bg-green-500" : "bg-red-500")}
      >
        {row.original.is_active ? "Active" : "Inactive"}
      </TextCapsule>
    ),
  },
  {
    id: "Last Modified",
    accessorKey: "updated_at",
    header: ({ column }) => (
      <SortableHeader column={column} name="Last Modified" />
    ),
    cell: ({ row }) => (
      <>
        {new Date(row.original.updated_at ?? new Date()).toLocaleDateString(
          "en-GB"
        )}
      </>
    ),
  },
  {
    id: "Actions",
    header: "Actions",
    cell: ({ row }) => (
      <CellActions
        updateAccess={row.original.updateAccess}
        data={row.original}
      />
    ),
  },
];
