"use client";

import { SortableHeader } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import {
  IOrganogramHeirarchyRecord,
  IOrganogramLevel,
} from "@/schema/OrganogramSchema";
import { getFullNameOfEmployee } from "@/utils/Misc";
import HeirarchyEditDialog from "@/components/custom/Dialog/Organogram/HeirarchyEditDialog";
import { IEmployeeWithUserMetadata } from "@/schema/EmployeeSchema";
import { IDesignation } from "@/schema/DesignationSchema";

interface Props extends IOrganogramHeirarchyRecord {
  company_employees: IEmployeeWithUserMetadata[];
  company_designations: IDesignation[];
  company_levels: IOrganogramLevel[];
}

export const HeirarchyDataTableColumns: ColumnDef<Props>[] = [
  {
    accessorKey: "heirarchy_record_id",
    header: ({ column }) => <SortableHeader column={column} name="ID" />,
  },
  {
    id: "employee-name",
    header: ({ column }) => <SortableHeader column={column} name="Employee" />,
    cell: ({ row }) =>
      row.original.employees
        ? getFullNameOfEmployee(row.original.employees)
        : "Data not found",
  },
  {
    id: "designation-name",
    header: ({ column }) => (
      <SortableHeader column={column} name="Designation" />
    ),
    cell: ({ row }) =>
      row.original.designations
        ? row.original.designations.designation_name
        : "Data not found",
  },
  {
    id: "level-name",
    header: ({ column }) => <SortableHeader column={column} name="Level" />,
    cell: ({ row }) =>
      row.original.levels ? row.original.levels.level_name : "Data not found",
  },
  {
    accessorKey: "reporting_authority_id",
    header: ({ column }) => (
      <SortableHeader column={column} name="Reporting Authority" />
    ),
  },
  {
    accessorKey: "designation_reporting_authority_id",
    header: ({ column }) => (
      <SortableHeader
        column={column}
        name="Designation (Reporting Authority)"
      />
    ),
  },
  {
    accessorKey: "level_reporting_authority_id",
    header: ({ column }) => (
      <SortableHeader column={column} name="Level (Reporting Authority)" />
    ),
  },
  {
    id: "edit-action",
    cell: ({ row }) => (
      <HeirarchyEditDialog
        data={row.original}
        company_id={row.original.company_id}
        asIcon
        employees={row.original.company_employees}
        designations={row.original.company_designations}
        levels={row.original.company_levels}
      />
    ),
  },
];
