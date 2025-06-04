"use client";

import DepartmentEditPopover from "@/components/custom/Popover/Department/DepartmentEditPopover";
import SortableHeader from "@/components/ui/data-table/sortable-header";
import { IDepartment } from "@/schema/CompanySchema";
import { ColumnDef } from "@tanstack/react-table";
import RowActions from "../actions/row-actions";

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
    id: "Edit Action",
    header: "Actions",
    cell: ({ row }) =>
      !row.original.updateAccess ? null : <RowActions data={row.original} />,
  },
];
