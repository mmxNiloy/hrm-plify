"use client";

import { SortableHeader } from "@/components/ui/data-table";
import { ILeaveType } from "@/schema/LeaveSchema";
import { ColumnDef } from "@tanstack/react-table";
import LeaveTypeEditDialog from "../../../Dialog/Leave/LeaveTypeEditDialog";
import { IOrganogramLevel } from "@/schema/OrganogramSchema";
import LevelEditPopover from "@/components/custom/Popover/Organogram/LevelEditPopover";

export const LevelDataTableColumns: ColumnDef<IOrganogramLevel>[] = [
  {
    accessorKey: "level_id",
    header: ({ column }) => <SortableHeader column={column} name="ID" />,
  },
  {
    accessorKey: "level_name",
    header: ({ column }) => <SortableHeader column={column} name="Level" />,
  },
  {
    id: "edit-action",
    cell: ({ row }) => (
      <LevelEditPopover
        data={row.original}
        company_id={row.original.company_id}
        asIcon
      />
    ),
  },
];
