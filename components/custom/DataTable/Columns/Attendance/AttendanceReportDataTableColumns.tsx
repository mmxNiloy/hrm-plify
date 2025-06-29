"use client";

import { SortableHeader } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { getFullNameOfUser } from "@/utils/Misc";
import { IAttendanceReport } from "@/schema/AttendanceSchema";
import { cn } from "@/lib/utils";
import AttendanceUpdateDropdown from "@/components/custom/Dashboard/Employee/AttendanceUpdateDropdown";
import { format } from "date-fns";

interface Props extends IAttendanceReport {
  updateAccess?: boolean;
  company_id: number;
}

export const AttendanceReportDataTableColumns: ColumnDef<Props>[] = [
  {
    accessorKey: "record_id",
    header: ({ column }) => <SortableHeader column={column} name="ID" />,
  },
  {
    id: "employee-name",
    header: ({ column }) => <SortableHeader column={column} name="Employee" />,
    cell: ({ row }) =>
      row.original.employees
        ? getFullNameOfUser(row.original.employees.user)
        : "Data Not Found",
  },
  {
    accessorKey: "attendance_date",
    header: ({ column }) => <SortableHeader column={column} name="Date" />,
    cell: ({ row }) =>
      new Date(row.original.attendance_date).toLocaleDateString("en-GB"),
  },
  {
    accessorKey: "check_in_time",
    header: ({ column }) => <SortableHeader column={column} name="Clock In" />,
    cell: ({ row }) =>
      row.original.check_in_time
        ? format(new Date(row.original.check_in_time), "hh:mm:ss a")
        : "N/A",
  },
  {
    accessorKey: "check_out_time",
    header: ({ column }) => <SortableHeader column={column} name="Clock Out" />,
    cell: ({ row }) =>
      row.original.check_out_time
        ? format(new Date(row.original.check_out_time), "hh:mm:ss a")
        : "N/A",
  },
  {
    accessorKey: "is_present",
    header: ({ column }) => <SortableHeader column={column} name="Status" />,
    cell: ({ row }) =>
      row.original.updateAccess ? (
        <AttendanceUpdateDropdown
          companyID={row.original.company_id}
          data={row.original}
        />
      ) : (
        <p
          className={cn(
            "w-fit rounded-full px-2 py-1 text-white",
            row.original.is_present == 0
              ? "bg-red-500"
              : row.original.is_present == 1
              ? "bg-green-500"
              : "bg-blue-500"
          )}
        >
          {row.original.is_present == 0
            ? "Absent"
            : row.original.is_present == 1
            ? "Present"
            : row.original.is_present == 2
            ? "Day Off"
            : "Holiday"}
        </p>
      ),
  },
];
