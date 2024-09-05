"use client";

import { SortableHeader } from "@/components/ui/data-table";
import { ICompanyTradingHour } from "@/schema/CompanySchema";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<ICompanyTradingHour>[] = [
  {
    accessorKey: "day_name",
    header: ({ column }) => <SortableHeader column={column} name="Day" />,
  },
  {
    accessorKey: "trade_status",
    header: ({ column }) => <SortableHeader column={column} name="Status" />,
  },
  {
    accessorKey: "opening_time",
    header: ({ column }) => (
      <SortableHeader column={column} name="Opening Time" />
    ),
  },
  {
    accessorKey: "closing_time",
    header: ({ column }) => (
      <SortableHeader column={column} name="Closing Time" />
    ),
  },
];
