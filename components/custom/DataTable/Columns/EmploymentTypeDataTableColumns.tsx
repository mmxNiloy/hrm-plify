"use client";
import { SortableHeader } from "@/components/ui/data-table";
import { IEmploymentType } from "@/schema/EmploymentTypeSchema";
import { ColumnDef } from "@tanstack/react-table";
import TextCapsule from "../../TextCapsule";
import { cn } from "@/lib/utils";
import EmploymentTypeToggleEditDialog from "../../AlertDialog/EmploymentTypeToggleAlertDialog";
import EmploymentTypeEditPopover from "../../Popover/Company/EmploymentTypeEditPopover";

export const EmploymentTypeDataTableColumns: ColumnDef<IEmploymentType>[] = [
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
  {
    id: "edit-action",
    header: "Edit Action",
    cell: ({ row }) => <EmploymentTypeEditPopover data={row.original} asIcon />,
  },
  {
    id: "toggle-action",
    header: "Toggle Action",
    cell: ({ row }) => <EmploymentTypeToggleEditDialog data={row.original} />,
  },
];
