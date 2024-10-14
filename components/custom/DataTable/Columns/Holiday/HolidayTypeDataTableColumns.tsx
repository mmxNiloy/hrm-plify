"use client";

import { SortableHeader } from "@/components/ui/data-table";
import { IHolidayType } from "@/schema/HolidaySchema";
import { ColumnDef } from "@tanstack/react-table";
import HolidayTypeEditPopover from "../../../Popover/HolidayTypeEditPopover";

export const HolidayTypeDataTableColumns: ColumnDef<IHolidayType>[] = [
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
    cell: ({ row }) => {
      // const employee = row.original;
      return (
        <HolidayTypeEditPopover
          asIcon
          data={row.original}
          company_id={row.original.company_id}
        />
      );
    },
  },
];
