"use client";

import { SortableHeader } from "@/components/ui/data-table";
import { ICompanyTradingHour } from "@/schema/CompanySchema";
import { convertTo12Hour } from "@/utils/Misc";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<ICompanyTradingHour>[] = [
  {
    accessorKey: "day_name",
    header: ({ column }) => <SortableHeader column={column} name="Day" />,
  },
  {
    accessorKey: "trade_status",
    header: ({ column }) => <SortableHeader column={column} name="Status" />,
    cell: ({ row }) =>
      row.original.trade_status == 1 ? (
        <p className="w-fit bg-green-500 px-2 py-1 text-white rounded-full">
          Open
        </p>
      ) : (
        <p className="w-fit bg-red-500 text-white px-2 py-1 rounded-full">
          Closed
        </p>
      ),
  },
  {
    accessorKey: "opening_time",
    header: ({ column }) => (
      <SortableHeader column={column} name="Opening Time" />
    ),
    cell: ({ row }) =>
      row.original.trade_status == 0
        ? null
        : convertTo12Hour(row.original.opening_time ?? "00:00"),
  },
  {
    accessorKey: "closing_time",
    header: ({ column }) => (
      <SortableHeader column={column} name="Closing Time" />
    ),
    cell: ({ row }) =>
      row.original.trade_status == 0
        ? null
        : convertTo12Hour(row.original.closing_time ?? "00:00"),
  },
];
