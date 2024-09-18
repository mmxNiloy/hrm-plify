"use client";

import { Button } from "@/components/ui/button";
import { SortableHeader } from "@/components/ui/data-table";
import Icons from "@/components/ui/icons";
import { IDutyRoster } from "@/schema/RotaSchema";
import { toYYYYMMDD } from "@/utils/Misc";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<IDutyRoster>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <SortableHeader name="ID" column={column} />,
  },
  {
    id: "department",
    header: ({ column }) => (
      <SortableHeader name="Department" column={column} />
    ),
    cell: ({ row }) => row.original.department.dpt_name,
  },
  {
    id: "designation",
    header: ({ column }) => (
      <SortableHeader name="Designation" column={column} />
    ),
    cell: ({ row }) => row.original.designation.designation_name,
  },
  {
    id: "emp-name",
    header: ({ column }) => (
      <SortableHeader name="Employee Name" column={column} />
    ),
    cell: ({ row }) =>
      `${row.original.employee.users.first_name} ${row.original.employee.users.last_name}`,
  },
  {
    id: "shift_code",
    header: ({ column }) => (
      <SortableHeader name="Shift Code" column={column} />
    ),
    cell: ({ row }) => row.original.shift.shift_code,
  },
  {
    id: "work_in_time",
    header: ({ column }) => (
      <SortableHeader name="Work In Time" column={column} />
    ),
    cell: ({ row }) => row.original.shift.start_time,
  },
  {
    id: "work_out_time",
    header: ({ column }) => (
      <SortableHeader name="Work Out Time" column={column} />
    ),
    cell: ({ row }) => row.original.shift.end_time,
  },
  {
    id: "break_time_start",
    header: ({ column }) => (
      <SortableHeader name="Break Time From" column={column} />
    ),
    cell: ({ row }) => row.original.shift.break_start,
  },
  {
    id: "break_time_end",
    header: ({ column }) => (
      <SortableHeader name="Break Time To" column={column} />
    ),
    cell: ({ row }) => row.original.shift.break_end,
  },
  {
    id: "from_date",
    header: ({ column }) => <SortableHeader name="From Date" column={column} />,
    cell: ({ row }) =>
      row.original.from_date
        ? toYYYYMMDD(new Date(row.original.from_date))
        : "",
  },
  {
    id: "to_date",
    header: ({ column }) => <SortableHeader name="To Date" column={column} />,
    cell: ({ row }) =>
      row.original.to_date ? toYYYYMMDD(new Date(row.original.to_date)) : "",
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
