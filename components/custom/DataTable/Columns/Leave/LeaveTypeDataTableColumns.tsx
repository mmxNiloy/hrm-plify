"use client";

import { SortableHeader } from "@/components/ui/data-table";
import { ILeaveType } from "@/schema/LeaveSchema";
import { ColumnDef } from "@tanstack/react-table";
import LeaveTypeEditDialog from "../../../Dialog/Leave/LeaveTypeEditDialog";

interface Props extends ILeaveType {
  updateAccess?: boolean;
}

export const LeaveTypeDataTableColumns: ColumnDef<Props>[] = [
  {
    accessorKey: "leave_type_id",
    header: ({ column }) => <SortableHeader column={column} name="ID" />,
  },
  {
    accessorKey: "leave_type_name",
    header: ({ column }) => (
      <SortableHeader column={column} name="Leave Type" />
    ),
  },
  {
    accessorKey: "leave_short_code",
    header: ({ column }) => <SortableHeader column={column} name="Shortcode" />,
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <SortableHeader column={column} name="Description" />
    ),
  },
  {
    id: "edit-action",
    cell: ({ row }) =>
      !row.original.updateAccess ? null : (
        <LeaveTypeEditDialog
          data={row.original}
          company_id={row.original.company_id}
          asIcon
        />
      ),
  },
];
