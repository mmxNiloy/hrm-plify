"use client";

import { Button } from "@/components/ui/button";
import { SortableHeader } from "@/components/ui/data-table";
import Icons from "@/components/ui/icons";
import { IDesignation } from "@/schema/DesignationSchema";
import { ColumnDef } from "@tanstack/react-table";
import DesignationEditPopover from "./DesignationEditPopover";

export const CompanyDesignationDataTableColumns: ColumnDef<IDesignation>[] = [
  {
    accessorKey: "designation_id",
    header: ({ column }) => <SortableHeader column={column} name="ID" />,
  },
  {
    accessorKey: "designation_name",
    header: ({ column }) => (
      <SortableHeader column={column} name="Designation" />
    ),
  },
  {
    id: "action-edit",
    cell: ({ row }) => (
      <DesignationEditPopover
        data={row.original}
        company_id={row.original.company_id}
        asIcon
      />
    ),
  },
];
