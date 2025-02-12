"use client";

import { SortableHeader } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { getFullNameOfEmployee } from "@/utils/Misc";
import { IAttendanceRecord } from "@/schema/AttendanceSchema";
import { IEmployeeWithUserMetadata } from "@/schema/EmployeeSchema";
import { cn } from "@/lib/utils";

interface IAttendanceRecordWithEmployeeMetadata extends IAttendanceRecord {
  employee?: IEmployeeWithUserMetadata;
}

export const AttendanceGenerationRecordDataTableColumns: ColumnDef<IAttendanceRecordWithEmployeeMetadata>[] =
  [
    {
      accessorKey: "record_id",
      header: ({ column }) => <SortableHeader column={column} name="ID" />,
    },
    {
      accessorKey: "employee_id",
      header: ({ column }) => (
        <SortableHeader column={column} name="Employee" />
      ),
      cell: ({ row }) =>
        row.original.employee
          ? getFullNameOfEmployee(row.original.employee)
          : `Employee ID: ${row.original.employee_id}`,
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
            : row.original.is_present == 2
            ? "Day Off"
            : row.original.is_present == 2
            ? "Day Off"
            : "Holiday"}
        </p>
      ),
    },
  ];
