"use client";

import { SortableHeader } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { ISalaryStructure } from "@/schema/Payroll";
import { getFullNameOfEmployee } from "@/utils/Misc";
import SalaryStructureEditDialog from "@/components/custom/Dialog/Payroll/SalaryStructureEditDialog";
import { IEmployeeWithUserMetadata } from "@/schema/EmployeeSchema";

interface Props extends ISalaryStructure {
  companyEmployees: IEmployeeWithUserMetadata[];
}

export const SalaryStructureDataTableColumns: ColumnDef<Props>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <SortableHeader column={column} name="ID" />,
  },
  {
    id: "employee_name",
    header: ({ column }) => <SortableHeader column={column} name="Employee" />,
    cell: ({ row }) =>
      row.original.employees
        ? getFullNameOfEmployee(row.original.employees)
        : "Unknown",
  },
  {
    accessorKey: "basic_salary",
    header: ({ column }) => (
      <SortableHeader column={column} name="Basic Salary" />
    ),
  },
  {
    accessorKey: "house_allowance",
    header: ({ column }) => (
      <SortableHeader column={column} name="House Allowance" />
    ),
  },
  {
    accessorKey: "medical_allowance",
    header: ({ column }) => (
      <SortableHeader column={column} name="Medical Allowance" />
    ),
  },
  {
    accessorKey: "transport_allowance",
    header: ({ column }) => (
      <SortableHeader column={column} name="Transport Allowance" />
    ),
  },
  {
    id: "edit-action",
    cell: ({ row }) => (
      <SalaryStructureEditDialog
        data={row.original}
        employees={row.original.companyEmployees}
        company_id={0} /// TODO: Replace with company id from the current row here
        asIcon
        asEditable
      />
    ),
  },
];
