"use client";

import { SortableHeader } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import {
  IEmployeeWithSalaryStructure,
  IPayroll,
  ISalaryStructure,
} from "@/schema/Payroll";
import { getFullNameOfEmployee } from "@/utils/Misc";
import SalaryStructureEditDialog from "@/components/custom/Dialog/Payroll/SalaryStructureEditDialog";
import { IEmployeeWithUserMetadata } from "@/schema/EmployeeSchema";
import Icons from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { ButtonBlue } from "@/styles/button.tailwind";
import TextCapsule from "@/components/custom/TextCapsule";

export const PayrollDataTableColumns: ColumnDef<IPayroll>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <SortableHeader column={column} name="ID" />,
  },
  {
    id: "employee_name",
    header: ({ column }) => <SortableHeader column={column} name="Employee" />,
    cell: ({ row }) =>
      row.original.employee
        ? getFullNameOfEmployee(row.original.employee)
        : "Unknown",
  },
  {
    accessorKey: "status",
    header: ({ column }) => <SortableHeader column={column} name="Status" />,
    cell: ({ row }) =>
      row.original.status === "Pending" ? (
        <TextCapsule className="bg-amber-500 text-white">Pending</TextCapsule>
      ) : row.original.status === "Processed" ? (
        <TextCapsule className="bg-green-500 text-white">Processed</TextCapsule>
      ) : (
        <TextCapsule className="bg-red-500 text-white">Failed</TextCapsule>
      ),
  },
  {
    accessorKey: "pay_period",
    header: ({ column }) => (
      <SortableHeader column={column} name="Pay Period" />
    ),
    cell: ({ row }) =>
      new Date(row.original.pay_period).toLocaleDateString("en-GB"),
  },
  {
    accessorKey: "gross_salary",
    header: ({ column }) => (
      <SortableHeader column={column} name="Gross Salary" />
    ),
  },
  {
    accessorKey: "net_salary",
    header: ({ column }) => (
      <SortableHeader column={column} name="Net Salary" />
    ),
  },
  {
    id: "basic-salary",
    header: ({ column }) => (
      <SortableHeader column={column} name="Basic Salary" />
    ),
    cell: ({ row }) =>
      row.original.employee?.salaryStructure?.basic_salary ?? 0,
  },
  {
    id: "house-allowance",
    header: ({ column }) => (
      <SortableHeader column={column} name="House Allowance" />
    ),
    cell: ({ row }) =>
      row.original.employee?.salaryStructure?.house_allowance ?? 0,
  },
  {
    id: "transport-allowance",
    header: ({ column }) => (
      <SortableHeader column={column} name="Transport Allowance" />
    ),
    cell: ({ row }) =>
      row.original.employee?.salaryStructure?.transport_allowance ?? 0,
  },
  {
    id: "medical-allowance",
    header: ({ column }) => (
      <SortableHeader column={column} name="Medical Allowance" />
    ),
    cell: ({ row }) =>
      row.original.employee?.salaryStructure?.medical_allowance ?? 0,
  },
  {
    accessorKey: "tax_deduction",
    header: ({ column }) => (
      <SortableHeader column={column} name="Tax Deduction" />
    ),
  },
  {
    accessorKey: "overtime_pay",
    header: ({ column }) => (
      <SortableHeader column={column} name="Overtime Pay" />
    ),
  },
  {
    id: "bonus",
    header: ({ column }) => <SortableHeader column={column} name="Bonus" />,
    cell: ({ row }) => row.original.bonuse?.bonus_amount ?? 0,
  },
  {
    id: "bonus-reason",
    header: ({ column }) => (
      <SortableHeader column={column} name="Bonus Reason" />
    ),
    cell: ({ row }) => row.original.bonuse?.reason ?? "",
  },
  {
    id: "deduction",
    header: ({ column }) => <SortableHeader column={column} name="Deduction" />,
    cell: ({ row }) => row.original.deduction?.amount ?? 0,
  },
  {
    id: "deduction-reason",
    header: ({ column }) => (
      <SortableHeader column={column} name="Deduction Reason" />
    ),
    cell: ({ row }) => row.original.deduction?.deduction_reason ?? "",
  },
];
