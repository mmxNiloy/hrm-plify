"use client";

import { SortableHeader } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { IEmploymentType } from "@/schema/EmploymentTypeSchema";
import TextCapsule from "@/components/custom/TextCapsule";
import { cn } from "@/lib/utils";

export const CompanyEmploymentTypeDataTableColumns: ColumnDef<IEmploymentType>[] =
  [
    {
      accessorKey: "emp_type_id",
      header: ({ column }) => <SortableHeader name="ID" column={column} />,
    },
    {
      accessorKey: "employment_type",
      header: ({ column }) => (
        <SortableHeader name="Employment Type" column={column} />
      ),
    },
    {
      accessorKey: "isActive",
      header: ({ column }) => <SortableHeader name="Status" column={column} />,
      cell: ({ row }) => (
        <TextCapsule
          className={cn(
            row.original.isActive ? "bg-green-500" : "bg-muted-foreground"
          )}
        >
          {row.original.isActive ? "Active" : "Inactive"}
        </TextCapsule>
      ), // Formatting the date
    },
  ];
