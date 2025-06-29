"use client";
import { SortableHeader } from "@/components/ui/data-table";
import { IEmploymentType } from "@/schema/EmploymentTypeSchema";
import { ColumnDef } from "@tanstack/react-table";
import TextCapsule from "@/components/custom/TextCapsule";
import { cn } from "@/lib/utils";

export const columns: ColumnDef<IEmploymentType>[] = [
  {
    id: "ID",
    accessorKey: "emp_type_id",
    header: ({ column }) => <SortableHeader name="ID" column={column} />,
  },
  {
    id: "Employment Type",
    accessorKey: "employment_type",
    header: ({ column }) => (
      <SortableHeader name="Employment Type" column={column} />
    ),
  },
  {
    id: "Status",
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => (
      <TextCapsule
        className={cn(
          row.original.isActive ? "bg-green-500" : "bg-muted-foreground"
        )}
      >
        {row.original.isActive ? "Active" : "Inactive"}
      </TextCapsule>
    ),
  },
];
