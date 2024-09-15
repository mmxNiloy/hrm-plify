"use client";

import { Button } from "@/components/ui/button";
import { SortableHeader } from "@/components/ui/data-table";
import Icons from "@/components/ui/icons";
import { IShift } from "@/schema/RotaSchema";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<IShift>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <SortableHeader name="ID" column={column} />,
  },
  {
    accessorKey: "shift_code",
    header: ({ column }) => (
      <SortableHeader name="Shift Code" column={column} />
    ),
  },
  {
    accessorKey: "shift_description",
    header: ({ column }) => (
      <SortableHeader name="Shift Description" column={column} />
    ),
  },
  {
    accessorKey: "work_in_time",
    header: ({ column }) => (
      <SortableHeader name="Work In Time" column={column} />
    ),
  },
  {
    accessorKey: "work_out_time",
    header: ({ column }) => (
      <SortableHeader name="Work Out Time" column={column} />
    ),
  },
  {
    accessorKey: "break_time_start",
    header: ({ column }) => (
      <SortableHeader name="Break Time From" column={column} />
    ),
  },
  {
    accessorKey: "break_time_end",
    header: ({ column }) => (
      <SortableHeader name="Break Time To" column={column} />
    ),
  },
  {
    id: "edit-action",
    cell: ({ row }) => (
      <Button variant={"ghost"} size="icon">
        <Icons.edit />
      </Button>
    ),
  },
];
