"use client";

import { Button } from "@/components/ui/button";
import { SortableHeader } from "@/components/ui/data-table";
import Icons from "@/components/ui/icons";
import { IEmployee } from "@/schema/EmployeeSchema";
import { ColumnDef } from "@tanstack/react-table";

export const StaffReportDataTableColumns: ColumnDef<IEmployee>[] = [
  {
    accessorKey: "employee_id",
    header: ({ column }) => (
      <SortableHeader column={column} name="Employee ID" />
    ),
  },
  {
    accessorKey: "employee_name",
    header: ({ column }) => <SortableHeader column={column} name="Full name" />,
  },
  {
    accessorKey: "designation",
    header: ({ column }) => (
      <SortableHeader column={column} name="Designation" />
    ),
  },
  {
    accessorKey: "address",
    header: ({ column }) => <SortableHeader column={column} name="Address" />,
  },
  {
    id: "view-action",
    cell: ({ row }) => {
      return (
        <Button
          className="text-xs gap-1 rounded-full bg-blue-500 hover:bg-blue-400 text-white"
          size={"icon"}
        >
          <Icons.visible className="size-4" />
        </Button>
      );
    },
  },
  {
    id: "print-action",
    cell: ({ row }) => {
      return (
        <Button
          className="text-xs gap-1 rounded-full bg-amber-500 hover:bg-amber-400 text-white"
          size="icon"
        >
          <Icons.printer className="size-4" />
        </Button>
      );
    },
  },
];

export const column_skeletons: ColumnDef<IEmployee>[] = [
  {
    accessorKey: "employee_id",
    header: ({ column }) => (
      <SortableHeader column={column} name="Employee ID" />
    ),
  },
  {
    accessorKey: "employee_name",
    header: ({ column }) => <SortableHeader column={column} name="Full name" />,
  },
  {
    accessorKey: "designation",
    header: ({ column }) => (
      <SortableHeader column={column} name="Designation" />
    ),
  },
  {
    accessorKey: "address",
    header: ({ column }) => <SortableHeader column={column} name="Address" />,
  },
  {
    id: "view-action",
    cell: ({ row }) => {
      return (
        <Button
          disabled
          className="text-xs gap-1 rounded-full bg-blue-500 hover:bg-blue-400 text-white"
          size={"icon"}
        >
          <Icons.visible className="size-4" />
        </Button>
      );
    },
  },
  {
    id: "print-action",
    cell: ({ row }) => {
      return (
        <Button
          disabled
          className="text-xs gap-1 rounded-full bg-amber-500 hover:bg-amber-400 text-white"
          size="icon"
        >
          <Icons.printer className="size-4" />
        </Button>
      );
    },
  },
];
