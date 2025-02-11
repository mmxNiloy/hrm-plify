"use client";

import { SortableHeader } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { getFullNameOfUser } from "@/utils/Misc";
import { IAttendanceReport } from "@/schema/AttendanceSchema";
import { cn } from "@/lib/utils";
import AttendanceUpdateDropdown from "@/components/custom/Dashboard/Employee/AttendanceUpdateDropdown";

interface Props extends IAttendanceReport {
  updateAccess?: boolean;
  company_id: number;
}

export const AttendanceReportDataTableColumns: ColumnDef<Props>[] = [
  {
    id: "sl-no",
    header: ({ column }) => <SortableHeader column={column} name="SL No" />,
    cell: ({ row }) => row.index + 1,
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
