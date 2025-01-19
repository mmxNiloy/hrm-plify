"use client";

import { SortableHeader } from "@/components/ui/data-table";
import { IHolidayType } from "@/schema/HolidaySchema";
import { ColumnDef } from "@tanstack/react-table";
import HolidayTypeEditPopover from "../../../Popover/HolidayTypeEditPopover";
import HolidayTypeToggleEditDialog from "@/components/custom/AlertDialog/HolidayTypeToggleAlertDialog";

interface Props extends IHolidayType {
  updateAccess?: boolean;
}

export const HolidayTypeDataTableColumns: ColumnDef<Props>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <SortableHeader name="ID" column={column} />,
  },
  {
    accessorKey: "holiday_type_name",
    header: ({ column }) => (
      <SortableHeader name={"Holiday Type"} column={column} />
    ),
  },
  {
    id: "edit-action",
    header: "Edit Action",
    cell: ({ row }) =>
      !row.original.updateAccess ? null : (
        <HolidayTypeEditPopover
          asIcon
          data={row.original}
          company_id={row.original.company_id}
        />
      ),
  },
  {
    id: "toggle-action",
    header: "Toggle Action",
    cell: ({ row }) =>
      !row.original.updateAccess ? null : (
        <HolidayTypeToggleEditDialog data={row.original} />
      ),
  },
];
