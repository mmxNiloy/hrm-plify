"use client";
import RTWEditDialog from "@/components/custom/Dialog/Company/RTWEditDialog";
import { Button } from "@/components/ui/button";
import { SortableHeader } from "@/components/ui/data-table";
import Icons from "@/components/ui/icons";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { ICompany } from "@/schema/CompanySchema";
import { IRightToWork } from "@/schema/RightToWork";
import { getFullNameOfEmployee } from "@/utils/Misc";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const CompanyRTWDataTableColumns: ColumnDef<IRightToWork>[] = [
  {
    id: "id",
    header: ({ column }) => <SortableHeader name="ID" column={column} />,
    cell: ({ row }) => row.index + 1,
  },
  {
    id: "employee-name",
    header: ({ column }) => <SortableHeader name="Employee" column={column} />,
    cell: ({ row }) =>
      row.original.employee
        ? getFullNameOfEmployee(row.original.employee)
        : "N/A",
  },
  {
    accessorKey: "date_of_check",
    header: ({ column }) => (
      <SortableHeader name="Date of Check" column={column} />
    ),
    cell: ({ row }) =>
      new Date(row.original.date_of_check).toLocaleDateString("en-GB"),
  },
  {
    accessorKey: "type_of_check",
    header: ({ column }) => (
      <SortableHeader name="Type of Check" column={column} />
    ),
  },
  {
    id: "view-action",
    cell: ({ row }) => (
      <RTWEditDialog
        data={row.original}
        employees={row.original.company_employees}
        company_id={row.original.employee!.company_id}
        readOnly
      />
    ),
  },
  {
    id: "download-action",
    cell: ({ row }) => <Icons.download />,
  },
  {
    id: "edit-action",
    cell: ({ row }) => (
      <RTWEditDialog
        data={row.original}
        employees={row.original.company_employees}
        company_id={row.original.employee!.company_id}
        asIcon
        asEditable
      />
    ),
  },
];
