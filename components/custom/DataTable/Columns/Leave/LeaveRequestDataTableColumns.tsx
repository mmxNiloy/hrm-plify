"use client";

import { SortableHeader } from "@/components/ui/data-table";
import {
  ILeaveApprover,
  ILeaveApproverWithAllEmployees,
  ILeaveRequest,
  ILeaveRequestWithCurrentEmployee,
  ILeaveType,
} from "@/schema/LeaveSchema";
import { ColumnDef } from "@tanstack/react-table";
import LeaveTypeEditDialog from "../../../Dialog/Leave/LeaveTypeEditDialog";
import { getFullNameOfEmployee, getFullNameOfUser } from "@/utils/Misc";
import LeaveApproverEditDialog from "../../../Dialog/Leave/LeaveApproverEditDialog";
import { cn } from "@/lib/utils";
import LeaveRequestEditDialog from "../../../Dialog/Leave/LeaveRequestEditDialog";
import Icons from "@/components/ui/icons";

interface Props extends ILeaveRequestWithCurrentEmployee {
  company_leave_types?: ILeaveType[];
  can_edit?: boolean;
}

export const LeaveRequestDataTableColumns: ColumnDef<Props>[] = [
  {
    accessorKey: "leave_request_id",
    header: ({ column }) => <SortableHeader column={column} name="ID" />,
  },
  {
    id: "employee-name",
    header: ({ column }) => (
      <SortableHeader column={column} name="Employee Name" />
    ),
    cell: ({ row }) =>
      row.original.employees
        ? getFullNameOfEmployee(row.original.employees)
        : row.original.currentEmployee
        ? getFullNameOfEmployee(row.original.currentEmployee)
        : "Employee data not found",
  },
  {
    id: "leave-type",
    header: ({ column }) => (
      <SortableHeader column={column} name="Leave Type" />
    ),
    cell: ({ row }) => row.original.leave_types?.leave_type_name,
  },
  {
    accessorKey: "reason",
    header: "Reason",
  },
  {
    accessorKey: "start_date",
    header: ({ column }) => (
      <SortableHeader column={column} name="Start Date" />
    ),
    cell: ({ row }) =>
      new Date(row.original.start_date).toLocaleDateString("en-GB"),
  },
  {
    accessorKey: "end_date",
    header: ({ column }) => <SortableHeader column={column} name="End Date" />,
    cell: ({ row }) =>
      new Date(row.original.end_date).toLocaleDateString("en-GB"),
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => (
      <SortableHeader column={column} name="Date of Application" />
    ),
    cell: ({ row }) =>
      new Date(row.original.updated_at ?? new Date()).toLocaleDateString(
        "en-GB"
      ),
  },
  {
    id: "approver-status",
    header: ({ column }) => <SortableHeader column={column} name="Status" />,
    cell: ({ row }) => (
      <div
        className={cn(
          "px-4 py-2 text-white rounded-full w-fit",
          row.original.status === "Approved"
            ? "bg-green-500"
            : row.original.status === "Pending"
            ? "bg-amber-500"
            : "bg-red-500"
        )}
      >
        {row.original.status}
      </div>
    ),
  },
  {
    id: "edit-action",
    cell: ({ row }) =>
      row.original.can_edit && (
        <LeaveRequestEditDialog
          employee_id={row.original.employee_id}
          company_id={row.original.company_id}
          data={row.original}
          leaveTypes={row.original.company_leave_types ?? []}
          asIcon
        />
      ),
  },
  {
    id: "cancel-action",
    cell: ({ row }) => <Icons.trash className="text-red-500" />,
  },
];
