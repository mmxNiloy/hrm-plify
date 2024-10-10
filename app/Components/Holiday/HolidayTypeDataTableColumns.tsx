"use client";

import { Button } from "@/components/ui/button";
import { SortableHeader } from "@/components/ui/data-table";
import Icons from "@/components/ui/icons";
import { ICompany } from "@/schema/CompanySchema";
import { IHolidayType } from "@/schema/HolidaySchema";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import HolidayTypeEditPopover from "./EditDialog/HolidayTypeEditPopover";

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
