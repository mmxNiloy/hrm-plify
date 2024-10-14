"use client";

import { SortableHeader } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { getFullNameOfEmployee, getFullNameOfUser } from "@/utils/Misc";
import {
  IAttendanceRecord,
  IAttendanceReport,
} from "@/schema/AttendanceSchema";
import { IEmployeeWithUserMetadata } from "@/schema/EmployeeSchema";
import { cn } from "@/lib/utils";

interface IAttendanceRecordWithEmployeeMetadata extends IAttendanceRecord {
  employee?: IEmployeeWithUserMetadata;
}

export const AttendanceReportDataTableColumns: ColumnDef<IAttendanceReport>[] =
  [
    {
      id: "sl-no",
      header: ({ column }) => <SortableHeader column={column} name="SL No" />,
      cell: ({ row }) => row.index + 1,
    },
    // TODO: Need to get employee id from the server
    // {
    //   accessorKey: "employee_id",
    //   header: ({ column }) => (
    //     <SortableHeader column={column} name="Employee" />
    //   ),
    //   cell: ({ row }) =>
    //     row.original.employee
    //       ? getFullNameOfEmployee(row.original.employee)
    //       : `Employee ID: ${row.original.employee_id}`,
    // },
    {
      id: "employee-name",
      header: ({ column }) => (
        <SortableHeader column={column} name="Employee" />
      ),
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
      cell: ({ row }) => (
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
            : "Holiday"}
        </p>
      ),
    },
  ];
