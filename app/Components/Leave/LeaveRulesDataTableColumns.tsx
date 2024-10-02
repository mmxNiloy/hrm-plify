"use client";

import { SortableHeader } from "@/components/ui/data-table";
import { ILeaveRule, ILeaveType } from "@/schema/LeaveSchema";
import { ColumnDef } from "@tanstack/react-table";
import LeaveTypeEditDialog from "./Edit/LeaveTypeEditDialog";
import LeaveRuleEditDialog from "./Edit/LeaveRuleEditDialog";

export const LeaveRulesDataTableColumns: ColumnDef<ILeaveRule>[] = [
  {
    accessorKey: "leave_rule_id",
    header: ({ column }) => <SortableHeader column={column} name="ID" />,
  },
  {
    accessorKey: "employee_type",
    header: ({ column }) => (
      <SortableHeader column={column} name="Employee Type" />
    ),
  },
  {
    id: "leave-type",
    header: ({ column }) => (
      <SortableHeader column={column} name="Leave Type" />
    ),
    cell: ({ row }) => row.original.leave_types?.leave_type_name,
  },
  {
    accessorKey: "max_number",
    header: ({ column }) => (
      <SortableHeader column={column} name="Max Number" />
    ),
  },
  {
    accessorKey: "effective_from",
    header: ({ column }) => (
      <SortableHeader column={column} name="Effective From" />
    ),
    cell: ({ row }) =>
      new Date(row.original.effective_from ?? new Date()).toLocaleDateString(
        "en-GB"
      ),
  },
  {
    accessorKey: "effective_to",
    header: ({ column }) => (
      <SortableHeader column={column} name="Effective To" />
    ),
    cell: ({ row }) =>
      new Date(row.original.effective_to ?? new Date()).toLocaleDateString(
        "en-GB"
      ),
  },
  {
    id: "edit-action",
    cell: ({ row }) => (
      <LeaveRuleEditDialog
        data={row.original}
        company_id={row.original.company_id}
        asIcon
      />
    ),
  },
];
