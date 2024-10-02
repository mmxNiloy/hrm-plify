"use client";

import { Button } from "@/components/ui/button";
import { SortableHeader } from "@/components/ui/data-table";
import Icons from "@/components/ui/icons";
import { ICompany } from "@/schema/CompanySchema";
import {
  IHoliday,
  IHolidayType,
  IHolidayWithHolidayTypes,
} from "@/schema/HolidaySchema";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import HolidayTypeEditPopover from "./EditDialog/HolidayTypeEditPopover";
import { dateDiffInDays, weekDays } from "@/utils/Misc";
import HolidayEditDialog from "./EditDialog/HolidayEditDialog";

export const HolidayListDataTableColumns: ColumnDef<IHolidayWithHolidayTypes>[] =
  [
    {
      accessorKey: "holiday_id",
      header: ({ column }) => <SortableHeader name="ID" column={column} />,
    },
    {
      id: "holiday-type",
      header: ({ column }) => (
        <SortableHeader name={"Holiday Type"} column={column} />
      ),
      cell: ({ row }) => row.original.holiday_types?.holiday_type_name,
    },
    {
      id: "start-date",
      header: ({ column }) => (
        <SortableHeader name={"Start Date"} column={column} />
      ),
      cell: ({ row }) =>
        new Date(row.original.start_date).toLocaleDateString("en-GB"),
    },
    {
      id: "end-date",
      header: ({ column }) => (
        <SortableHeader name={"End Date"} column={column} />
      ),
      cell: ({ row }) =>
        new Date(row.original.end_date).toLocaleDateString("en-GB"),
    },
    {
      id: "year",
      header: ({ column }) => <SortableHeader name={"Year"} column={column} />,
      cell: ({ row }) => {
        const endYear = new Date(row.original.end_date).getFullYear();
        const startYear = new Date(row.original.start_date).getFullYear();
        if (startYear == endYear) return `${startYear}`;
        return `${startYear}-${endYear}`;
      },
    },
    {
      id: "day-of-week",
      header: ({ column }) => (
        <SortableHeader name={"Starting Day"} column={column} />
      ),
      cell: ({ row }) =>
        weekDays[new Date(row.original.start_date).getUTCDay()],
    },
    {
      id: "date-diff",
      header: ({ column }) => (
        <SortableHeader name={"No. of Days"} column={column} />
      ),
      cell: ({ row }) =>
        dateDiffInDays(
          new Date(row.original.start_date),
          new Date(row.original.end_date)
        ),
    },
    {
      id: "edit-action",
      cell: ({ row }) => {
        // const employee = row.original;
        return (
          <HolidayEditDialog
            data={row.original}
            company_id={row.original.company_id}
            holidayTypes={row.original.company_holiday_types}
          />
        );
      },
    },
  ];
