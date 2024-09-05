"use client";
import { Button } from "@/components/ui/button";
import { SortableHeader } from "@/components/ui/data-table";
import Icons from "@/components/ui/icons";
import { ILeaveType } from "@/schema/LeaveSchema";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<ILeaveType>[] = [
  {
    accessorKey: "leave_type_id",
    header: ({ column }) => <SortableHeader column={column} name="ID" />,
  },
  {
    accessorKey: "leave_type",
    header: ({ column }) => (
      <SortableHeader column={column} name="Leave Type" />
    ),
  },
  {
    accessorKey: "leave_short_code",
    header: ({ column }) => <SortableHeader column={column} name="Shortcode" />,
  },
  {
    accessorKey: "remarks",
    header: ({ column }) => <SortableHeader column={column} name="Remarks" />,
  },
  {
    id: "action",
    cell: ({ row }) => (
      <Button variant={"ghost"} size={"icon"} className="size-4 rounded-full">
        <Icons.edit />
      </Button>
    ),
  },
];
