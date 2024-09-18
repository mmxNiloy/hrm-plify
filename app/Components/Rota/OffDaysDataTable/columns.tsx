"use client";

import { Button } from "@/components/ui/button";
import { SortableHeader } from "@/components/ui/data-table";
import Icons from "@/components/ui/icons";
import { IOffDays } from "@/schema/RotaSchema";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<IOffDays>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <SortableHeader name="ID" column={column} />,
  },
  {
    id: "department-column",
    header: ({ column }) => (
      <SortableHeader name="Department" column={column} />
    ),
    cell: ({ row }) => row.original.department.dpt_name,
  },
  {
    id: "designation-column",
    header: ({ column }) => (
      <SortableHeader name="Designation" column={column} />
    ),
    cell: ({ row }) => row.original.designation.designation_name,
  },
  {
    id: "shift-name-column",
    header: ({ column }) => (
      <SortableHeader name="Shift Name" column={column} />
    ),
    cell: ({ row }) => row.original.shift.shift_name,
  },
  {
    id: "shift-day-monday",
    header: ({ column }) => <SortableHeader name="Monday" column={column} />,
    cell: ({ row }) => row.original.days[0],
  },
  {
    id: "shift-day-tuesday",
    header: ({ column }) => <SortableHeader name="Tuesday" column={column} />,
    cell: ({ row }) => row.original.days[1],
  },
  {
    id: "shift-day-wednesday",
    header: ({ column }) => <SortableHeader name="Wednesday" column={column} />,
    cell: ({ row }) => row.original.days[2],
  },
  {
    id: "shift-day-thursday",
    header: ({ column }) => <SortableHeader name="Thursday" column={column} />,
    cell: ({ row }) => row.original.days[3],
  },
  {
    id: "shift-day-friday",
    header: ({ column }) => <SortableHeader name="Friday" column={column} />,
    cell: ({ row }) => row.original.days[4],
  },
  {
    id: "shift-day-saturday",
    header: ({ column }) => <SortableHeader name="Saturday" column={column} />,
    cell: ({ row }) => row.original.days[5],
  },
  {
    id: "shift-day-sunday",
    header: ({ column }) => <SortableHeader name="Sunday" column={column} />,
    cell: ({ row }) => row.original.days[6],
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
