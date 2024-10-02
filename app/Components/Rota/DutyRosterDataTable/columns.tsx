"use client";

import { Button } from "@/components/ui/button";
import { SortableHeader } from "@/components/ui/data-table";
import Icons from "@/components/ui/icons";
import { IDutyRoster, IDutyRosterWithEditData } from "@/schema/RotaSchema";
import { convertTo12Hour, toYYYYMMDD } from "@/utils/Misc";
import { ColumnDef } from "@tanstack/react-table";
import DutyRosterEditDialog from "../EditDialog/DutyRosterEditDialog";

export const DutyRosterDataTableColumns: ColumnDef<IDutyRosterWithEditData>[] =
  [
    {
      accessorKey: "roaster_id",
      header: ({ column }) => <SortableHeader name="ID" column={column} />,
    },
    {
      id: "department",
      header: ({ column }) => (
        <SortableHeader name="Department" column={column} />
      ),
      cell: ({ row }) => row.original.departments.dpt_name,
    },
    // {
    //   id: "designation",
    //   header: ({ column }) => (
    //     <SortableHeader name="Designation" column={column} />
    //   ),
    //   cell: ({ row }) => row.original.designations.designation_name,
    // },
    {
      id: "emp-name",
      header: ({ column }) => (
        <SortableHeader name="Employee Name" column={column} />
      ),
      cell: ({ row }) =>
        `${row.original.employees.user.first_name}${
          row.original.employees.user.middle_name.length > 0
            ? ` ${row.original.employees.user.middle_name}`
            : ""
        } ${row.original.employees.user.last_name}`,
    },
    {
      id: "shift_name",
      header: ({ column }) => (
        <SortableHeader name="Shift Name" column={column} />
      ),
      cell: ({ row }) => row.original.shift_db.shift_name,
    },
    {
      id: "start_time",
      header: ({ column }) => (
        <SortableHeader name="Shift Start" column={column} />
      ),
      cell: ({ row }) => convertTo12Hour(row.original.shift_db.start_time),
    },
    {
      id: "end_time",
      header: ({ column }) => (
        <SortableHeader name="Shift End" column={column} />
      ),
      cell: ({ row }) => convertTo12Hour(row.original.shift_db.end_time),
    },
    {
      id: "break_time_start",
      header: ({ column }) => (
        <SortableHeader name="Break Time Start" column={column} />
      ),
      cell: ({ row }) => convertTo12Hour(row.original.shift_db.break_start),
    },
    {
      id: "break_time_end",
      header: ({ column }) => (
        <SortableHeader name="Break Time End" column={column} />
      ),
      cell: ({ row }) => convertTo12Hour(row.original.shift_db.break_end),
    },
    {
      id: "from_date",
      header: ({ column }) => (
        <SortableHeader name="Duty Start Date" column={column} />
      ),
      cell: ({ row }) => toYYYYMMDD(new Date(row.original.from_date)),
    },
    {
      id: "to_date",
      header: ({ column }) => (
        <SortableHeader name="Duty End Date" column={column} />
      ),
      cell: ({ row }) => toYYYYMMDD(new Date(row.original.end_date)),
    },
    {
      id: "edit-action",
      cell: ({ row }) => (
        <DutyRosterEditDialog
          company_id={row.original.company_id}
          data={row.original}
          departments={row.original.company_departments}
          shifts={row.original.company_shifts}
          employees={row.original.company_employees}
          asIcon
          type="employee"
        />
      ),
    },
  ];
