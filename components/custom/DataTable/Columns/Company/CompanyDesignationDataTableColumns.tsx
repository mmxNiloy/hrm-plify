"use client";

import { SortableHeader } from "@/components/ui/data-table";
import { IDesignation } from "@/schema/DesignationSchema";
import { ColumnDef } from "@tanstack/react-table";
import DesignationEditPopover from "../../../Popover/Company/DesignationEditPopover";

interface Props extends IDesignation {
  updateAccess?: boolean;
}

export const CompanyDesignationDataTableColumns: ColumnDef<Props>[] = [
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
    cell: ({ row }) =>
      !row.original.updateAccess ? null : (
        <DesignationEditPopover
          data={row.original}
          company_id={row.original.company_id}
          asIcon
        />
      ),
  },
];
