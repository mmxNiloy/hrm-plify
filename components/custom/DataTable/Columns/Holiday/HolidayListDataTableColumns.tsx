"use client";

import { SortableHeader } from "@/components/ui/data-table";
import { IHolidayWithHolidayTypes } from "@/schema/HolidaySchema";
import { ColumnDef } from "@tanstack/react-table";
import { dateDiffInDays, weekDays } from "@/utils/Misc";
import HolidayEditDialog from "../../../Dialog/HolidayEditDialog";

interface Props extends IHolidayWithHolidayTypes {
  updateAccess?: boolean;
}

export const HolidayListDataTableColumns: ColumnDef<Props>[] = [
  {
    accessorKey: "holiday_id",
    header: ({ column }) => <SortableHeader name="ID" column={column} />,
  },
  {
    accessorKey: "holiday_name",
    header: ({ column }) => (
      <SortableHeader name="Holiday Name" column={column} />
    ),
  },
  {
    accessorKey: "holiday_desc",
    header: ({ column }) => (
      <SortableHeader name="Description" column={column} />
    ),
  },
  {
    id: "holiday-type",
    header: ({ column }) => (
      <SortableHeader name={"Holiday Type"} column={column} />
    ),
    cell: ({ row }) => row.original.type_data?.holiday_type_name,
  },
  {
    id: "start-date",
    header: ({ column }) => (
      <SortableHeader name={"Start Date"} column={column} />
    ),
    cell: ({ row }) =>
      new Date(row.original.start_time).toLocaleDateString("en-GB"),
  },
  {
    id: "end-date",
    header: ({ column }) => (
      <SortableHeader name={"End Date"} column={column} />
    ),
    cell: ({ row }) =>
      new Date(row.original.end_time).toLocaleDateString("en-GB"),
  },
  {
    id: "year",
    header: ({ column }) => <SortableHeader name={"Year"} column={column} />,
    cell: ({ row }) => {
      const endYear = new Date(row.original.end_time).getFullYear();
      const startYear = new Date(row.original.start_time).getFullYear();
      if (startYear == endYear) return `${startYear}`;
      return `${startYear}-${endYear}`;
    },
  },
  {
    id: "day-of-week",
    header: ({ column }) => (
      <SortableHeader name={"Starting Day"} column={column} />
    ),
    cell: ({ row }) => weekDays[new Date(row.original.start_time).getUTCDay()],
  },
  {
    id: "date-diff",
    header: ({ column }) => (
      <SortableHeader name={"No. of Days"} column={column} />
    ),
    cell: ({ row }) =>
      dateDiffInDays(
        new Date(row.original.start_time),
        new Date(row.original.end_time)
      ),
  },
  {
    id: "edit-action",
    cell: ({ row }) =>
      !row.original.updateAccess ? null : (
        <HolidayEditDialog
          asIcon
          data={row.original}
          company_id={row.original.company_id}
          holidayTypes={row.original.company_holiday_types}
        />
      ),
  },
];
