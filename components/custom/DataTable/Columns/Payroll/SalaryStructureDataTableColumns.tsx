"use client";

import { SortableHeader } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import {
  IEmployeeWithSalaryStructure,
  ISalaryStructure,
} from "@/schema/Payroll";
import { getFullNameOfEmployee } from "@/utils/Misc";
import SalaryStructureEditDialog from "@/components/custom/Dialog/Payroll/SalaryStructureEditDialog";
import { IEmployeeWithUserMetadata } from "@/schema/EmployeeSchema";

interface Props extends IEmployeeWithSalaryStructure {
  companyEmployees: IEmployeeWithUserMetadata[];
  updateAccess?: boolean;
}

export const SalaryStructureDataTableColumns: ColumnDef<Props>[] = [
  {
    accessorKey: "employee_id",
    header: ({ column }) => <SortableHeader column={column} name="ID" />,
  },
  {
    id: "employee_name",
    header: ({ column }) => <SortableHeader column={column} name="Employee" />,
    cell: ({ row }) => getFullNameOfEmployee(row.original),
  },
  {
    id: "basic_salary",
    header: ({ column }) => (
      <SortableHeader column={column} name="Basic Salary" />
    ),
    cell: ({ row }) => row.original.salaryStructure?.basic_salary ?? "N/A",
  },
  {
    id: "house_allowance",
    header: ({ column }) => (
      <SortableHeader column={column} name="House Allowance" />
    ),
    cell: ({ row }) => row.original.salaryStructure?.house_allowance ?? "N/A",
  },
  {
    accessorKey: "medical_allowance",
    header: ({ column }) => (
      <SortableHeader column={column} name="Medical Allowance" />
    ),
    cell: ({ row }) => row.original.salaryStructure?.medical_allowance ?? "N/A",
  },
  {
    accessorKey: "transport_allowance",
    header: ({ column }) => (
      <SortableHeader column={column} name="Transport Allowance" />
    ),
    cell: ({ row }) =>
      row.original.salaryStructure?.transport_allowance ?? "N/A",
  },
  {
    id: "edit-action",
    cell: ({ row }) =>
      !row.original.updateAccess ? null : (
        <SalaryStructureEditDialog
          currentEmployee={row.original.employee_id}
          data={row.original.salaryStructure}
          employees={row.original.companyEmployees}
          company_id={row.original.company_id}
          asIcon
          asEditable
        />
      ),
  },
];
