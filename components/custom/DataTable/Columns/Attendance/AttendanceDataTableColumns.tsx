"use client";

import { SortableHeader } from "@/components/ui/data-table";
import { ILeaveApprover } from "@/schema/LeaveSchema";
import { ColumnDef } from "@tanstack/react-table";
import {
  convertTo12Hour,
  getFullNameOfEmployee,
  timeDifference,
} from "@/utils/Misc";
import LeaveApproverEditDialog from "../../../Dialog/Leave/LeaveApproverEditDialog";
import { IAttendance } from "@/schema/AttendanceSchema";

export const AttendanceDataTableColumns: ColumnDef<IAttendance>[] = [
  {
    accessorKey: "attendance_id",
    header: ({ column }) => <SortableHeader column={column} name="ID" />,
  },
  {
    id: "department",
    header: ({ column }) => (
      <SortableHeader column={column} name="Department" />
    ),
    cell: ({ row }) => row.original.departments?.dpt_name,
  },
  {
    id: "designation",
    header: ({ column }) => (
      <SortableHeader column={column} name="Designation" />
    ),
    cell: ({ row }) => row.original.designations?.designation_name,
  },
  {
    id: "employee",
    header: ({ column }) => <SortableHeader column={column} name="Employee" />,
    cell: ({ row }) => getFullNameOfEmployee(row.original.emlployees!),
  },
  {
    accessorKey: "date",
    header: ({ column }) => <SortableHeader column={column} name="Employee" />,
    cell: ({ row }) => new Date(row.original.date).toLocaleDateString("en-GB"),
  },
  {
    accessorKey: "clock_in",
    header: ({ column }) => <SortableHeader column={column} name="Clock In" />,
    cell: ({ row }) => convertTo12Hour(row.original.clock_in),
  },
  {
    accessorKey: "clock_in_location",
    header: ({ column }) => (
      <SortableHeader column={column} name="Clock In Location" />
    ),
  },
  {
    accessorKey: "clock_out",
    header: ({ column }) => <SortableHeader column={column} name="Clock Out" />,
    cell: ({ row }) => convertTo12Hour(row.original.clock_out),
  },
  {
    accessorKey: "clock_out_location",
    header: ({ column }) => (
      <SortableHeader column={column} name="Clock Out Location" />
    ),
  },
  {
    id: "duty-hours",
    header: ({ column }) => (
      <SortableHeader column={column} name="Duty Hours" />
    ),
    cell: ({ row }) =>
      timeDifference(row.original.clock_in, row.original.clock_out),
  },
  // {
  //   id: "edit-action",
  //   cell: ({ row }) => (
  //     <LeaveApproverEditDialog
  //       data={row.original}
  //       employees={[
  //         { ...row.original.employees!, employee_id: row.original.employee_id },
  //       ]}
  //       company_id={row.original.company_id}
  //       asIcon
  //     />
  //   ),
  // },
];
