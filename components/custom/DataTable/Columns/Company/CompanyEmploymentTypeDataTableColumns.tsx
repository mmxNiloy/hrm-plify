"use client";

import { SortableHeader } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { IEmploymentType } from "@/schema/EmploymentTypeSchema";
import EmploymentTypeEditPopover from "../../../Popover/Company/EmploymentTypeEditPopover";

export const CompanyEmploymentTypeDataTableColumns: ColumnDef<IEmploymentType>[] =
  [
    {
      accessorKey: "employment_type_id",
      header: ({ column }) => <SortableHeader column={column} name="ID" />,
    },
    {
      accessorKey: "employment_type_name",
      header: ({ column }) => (
        <SortableHeader column={column} name="Employment Type" />
      ),
    },
    {
      id: "action-edit",
      cell: ({ row }) => (
        <EmploymentTypeEditPopover
          data={row.original}
          company_id={row.original.company_id}
          asIcon
        />
      ),
    },
  ];
