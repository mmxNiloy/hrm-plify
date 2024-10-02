"use client";

import { SortableHeader } from "@/components/ui/data-table";
import { ILeaveBalance } from "@/schema/LeaveSchema";
import { ColumnDef } from "@tanstack/react-table";

export const LeaveBalanceDataTableColumns: ColumnDef<ILeaveBalance>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <SortableHeader column={column} name="ID" />,
  },
  {
    accessorKey: "employee_code",
    header: ({ column }) => (
      <SortableHeader column={column} name="Employee Code" />
    ),
  },
  {
    accessorKey: "employee_name",
    header: ({ column }) => <SortableHeader column={column} name="Employee" />,
  },
  {
    accessorKey: "leave_type",
    header: ({ column }) => (
      <SortableHeader column={column} name="Leave Type" />
    ),
  },
  {
    accessorKey: "leave_balance",
    header: ({ column }) => (
      <SortableHeader column={column} name="Leave Balance" />
    ),
  },
];
