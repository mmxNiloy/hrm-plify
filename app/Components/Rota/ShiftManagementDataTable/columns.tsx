"use client";

import { Button } from "@/components/ui/button";
import { SortableHeader } from "@/components/ui/data-table";
import Icons from "@/components/ui/icons";
import { IShift } from "@/schema/RotaSchema";
import { convertTo12Hour } from "@/utils/Misc";
import { ColumnDef } from "@tanstack/react-table";
import ShiftManagementEditDialog from "../EditDialog/ShiftManagementEditDialog";

export const ShiftsDataTableColumns: ColumnDef<IShift>[] = [
  {
    accessorKey: "shift_id",
    header: ({ column }) => <SortableHeader name="ID" column={column} />,
  },
  {
    accessorKey: "shift_name",
    header: ({ column }) => (
      <SortableHeader name="Shift Name" column={column} />
    ),
  },
  {
    accessorKey: "shift_time",
    header: ({ column }) => (
      <SortableHeader name="Shift Start" column={column} />
    ),
    cell: ({ row }) => convertTo12Hour(row.original.start_time ?? "00:00"),
  },
  {
    accessorKey: "end_time",
    header: ({ column }) => <SortableHeader name="Shift End" column={column} />,
    cell: ({ row }) => convertTo12Hour(row.original.end_time ?? "00:00"),
  },
  {
    accessorKey: "break_start",
    header: ({ column }) => (
      <SortableHeader name="Break Time Start" column={column} />
    ),
    cell: ({ row }) => convertTo12Hour(row.original.break_start ?? "00:00"),
  },
  {
    accessorKey: "break_end",
    header: ({ column }) => (
      <SortableHeader name="Break Time End" column={column} />
    ),
    cell: ({ row }) => convertTo12Hour(row.original.break_end ?? "00:00"),
  },
  {
    id: "edit-action",
    cell: ({ row }) => (
      <ShiftManagementEditDialog
        company_id={row.original.company_id}
        asIcon
        data={row.original}
      />
    ),
  },
];
