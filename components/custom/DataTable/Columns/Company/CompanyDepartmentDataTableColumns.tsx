"use client";

import DepartmentEditPopover from "@/components/custom/Popover/Department/DepartmentEditPopover";
import { SortableHeader } from "@/components/ui/data-table";
import { IDepartment } from "@/schema/CompanySchema";
import { ColumnDef } from "@tanstack/react-table";

export const CompanyDepartmentDataTableColumns: ColumnDef<IDepartment>[] = [
  {
    accessorKey: "department_id",
    header: ({ column }) => <SortableHeader column={column} name="ID" />,
  },
  {
    accessorKey: "dpt_name",
    header: ({ column }) => (
      <SortableHeader column={column} name="Department Name" />
    ),
  },
  {
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
    id: "edit-action",
    cell: ({ row }) => <DepartmentEditPopover data={row.original} />,
  },
];
