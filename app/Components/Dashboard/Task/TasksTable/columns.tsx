"use client";
import { Button } from "@/components/ui/button";
import { SortableHeader } from "@/components/ui/data-table";
import Icons from "@/components/ui/icons";
import { ITask } from "@/schema/TaskSchema"; // assuming the schema is defined in this path
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<ITask>[] = [
  {
    accessorKey: "task_id",
    header: ({ column }) => <SortableHeader name="ID" column={column} />,
  },
  {
    accessorKey: "employee_name",
    header: ({ column }) => (
      <SortableHeader name="Employee Name" column={column} />
    ),
  },
  {
    accessorKey: "date",
    header: ({ column }) => <SortableHeader name="Date" column={column} />,
    cell: ({ row }) => new Date(row.original.date).toLocaleDateString(), // Formatting the date
  },
  {
    accessorKey: "from_time",
    header: ({ column }) => <SortableHeader name="From Time" column={column} />,
  },
  {
    accessorKey: "to_time",
    header: ({ column }) => <SortableHeader name="To Time" column={column} />,
  },
  {
    accessorKey: "time",
    header: ({ column }) => <SortableHeader name="Time" column={column} />,
  },
  {
    accessorKey: "key_responsibility",
    header: ({ column }) => (
      <SortableHeader name="Key Responsibility" column={column} />
    ),
  },
  {
    accessorKey: "task_performed",
    header: ({ column }) => (
      <SortableHeader name="Task Performed" column={column} />
    ),
  },
  {
    accessorKey: "work_update",
    header: ({ column }) => (
      <SortableHeader name="Work Update" column={column} />
    ),
  },
  {
    accessorKey: "uploaded_file_link",
    header: "Uploaded File",
    cell: ({ row }) => (
      <Link
        target="_blank"
        href={row.original.uploaded_file_link ?? "#"}
        passHref
      >
        <Button size={"icon"} variant={"ghost"} className="rounuded-full">
          <Icons.document />
        </Button>
      </Link>
    ),
  },
  {
    id: "edit-action",
    cell: ({ row }) => (
      <Button size={"icon"} variant={"ghost"} className="rounded-full">
        <Icons.edit />
      </Button>
    ),
  },
];
