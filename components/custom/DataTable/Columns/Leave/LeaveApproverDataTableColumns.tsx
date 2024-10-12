"use client";

import { SortableHeader } from "@/components/ui/data-table";
import {
  ILeaveApprover,
  ILeaveApproverWithAllEmployees,
  ILeaveType,
} from "@/schema/LeaveSchema";
import { ColumnDef } from "@tanstack/react-table";
import LeaveTypeEditDialog from "../../../Dialog/Leave/LeaveTypeEditDialog";
import { getFullNameOfEmployee, getFullNameOfUser } from "@/utils/Misc";
import LeaveApproverEditDialog from "../../../Dialog/Leave/LeaveApproverEditDialog";

export const LeaveApproverDataTableColumns: ColumnDef<ILeaveApprover>[] = [
  {
    accessorKey: "approver_id",
    header: ({ column }) => <SortableHeader column={column} name="ID" />,
  },
  {
    id: "employee-name",
    header: ({ column }) => (
      <SortableHeader column={column} name="Employee Name" />
    ),
    cell: ({ row }) => getFullNameOfEmployee(row.original.employees!),
  },
  {
    id: "approver-status",
    header: ({ column }) => <SortableHeader column={column} name="Status" />,
    cell: ({ row }) => {
      if (row.original.is_active == 1)
        return (
          <div className="px-4 py-2 bg-green-500 text-white rounded-full w-fit">
            Active
          </div>
        );
      return (
        <div className="px-4 py-2 bg-muted text-muted-foreground rounded-full w-fit">
          Inactive
        </div>
      );
    },
  },
  {
    id: "edit-action",
    cell: ({ row }) => (
      <LeaveApproverEditDialog
        data={row.original}
        employees={[
          { ...row.original.employees!, employee_id: row.original.employee_id },
        ]}
        company_id={row.original.company_id}
        asIcon
      />
    ),
  },
];
