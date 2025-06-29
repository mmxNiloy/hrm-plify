"use client";

import { SortableHeader } from "@/components/ui/data-table";
import { IDesignation } from "@/schema/DesignationSchema";
import { ColumnDef } from "@tanstack/react-table";
import DesignationEditPopover from "../../../Popover/Company/DesignationEditPopover";
import { IDepartment } from "@/schema/CompanySchema";
import TextCapsule from "@/components/custom/TextCapsule";
import Icons from "@/components/ui/icons";

interface Props extends IDesignation {
  updateAccess?: boolean;
  department: IDepartment[];
}

export const CompanyDesignationDataTableColumns: ColumnDef<Props>[] = [
  {
    accessorKey: "designation_id",
    header: ({ column }) => <SortableHeader column={column} name="ID" />,
  },
  {
    id: "dept_name",
    header: ({ column }) => (
      <SortableHeader column={column} name="Department" />
    ),
    cell: ({ row }) =>
      row.original.department.find(
        (item) => item.department_id === row.original.dept_id
      )?.dpt_name ?? (
        <TextCapsule className="bg-amber-500">
          <Icons.warn /> Unassigned
        </TextCapsule>
      ),
  },
  {
    accessorKey: "designation_name",
    header: ({ column }) => (
      <SortableHeader column={column} name="Designation" />
    ),
  },
  {
    id: "action-edit",
    cell: ({ row }) =>
      !row.original.updateAccess ? null : (
        <DesignationEditPopover
          data={row.original}
          company_id={row.original.company_id}
          asIcon
          departments={row.original.department}
        />
      ),
  },
];
