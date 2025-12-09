"use client";

import DepartmentEditPopover from "@/components/custom/Popover/Department/DepartmentEditPopover";
import SortableHeader from "@/components/ui/data-table/sortable-header";
import { IDepartment } from "@/schema/CompanySchema";
import { ColumnDef } from "@tanstack/react-table";
import RowActions from "../actions/row-actions";
import TextCapsule from "@/components/custom/TextCapsule";
import { cn } from "@/lib/utils";

interface Props extends IDepartment {
  updateAccess?: boolean;
}

export const columns: ColumnDef<Props>[] = [
  {
    id: "Department ID",
    accessorKey: "department_id",
    header: ({ column }) => <SortableHeader column={column} name="ID" />,
  },
  {
    id: "Department Name",
    accessorKey: "dpt_name",
    header: ({ column }) => (
      <SortableHeader column={column} name="Department Name" />
    ),
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
      <RowActions
        updateAccess={row.original.updateAccess}
        data={row.original}
      />
    ),
  },
];
