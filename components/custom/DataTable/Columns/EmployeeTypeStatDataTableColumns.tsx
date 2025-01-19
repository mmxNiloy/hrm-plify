"use client";
import { SortableHeader } from "@/components/ui/data-table";
import { IEmploymentType } from "@/schema/EmploymentTypeSchema";
import { ColumnDef } from "@tanstack/react-table";
import TextCapsule from "../../TextCapsule";
import { cn } from "@/lib/utils";
import EmploymentTypeToggleEditDialog from "../../AlertDialog/EmploymentTypeToggleAlertDialog";
import EmploymentTypeEditPopover from "../../Popover/Company/EmploymentTypeEditPopover";
import { IEmployeeTypeCount } from "@/schema/StatsSchema";

export const EmploymentTypeStatDataTableColumns: ColumnDef<IEmployeeTypeCount>[] =
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
      accessorKey: "total_employees",
      header: ({ column }) => (
        <SortableHeader name="Total Employees" column={column} />
      ),
    },
  ];
