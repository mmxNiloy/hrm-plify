"use client";

import { Button } from "@/components/ui/button";
import { SortableHeader } from "@/components/ui/data-table";
import Icons from "@/components/ui/icons";
import { ICompany } from "@/schema/CompanySchema";
import { IEmployeeUserRole, IUserConfig } from "@/schema/UserSchema";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import UserConfigEditDialog from "./EditDialog/UserConfigEditDialog";
import EmployeeUserRoleEditDialog from "./EditDialog/UserRoleEditDialog";

export const EmployeeUserRoleDataTableColumns: ColumnDef<IEmployeeUserRole>[] =
  [
    {
      accessorKey: "employee_id",
      header: ({ column }) => <SortableHeader name="ID" column={column} />,
    },
    {
      id: "employee_name",
      header: ({ column }) => (
        <SortableHeader name={"Employee Name"} column={column} />
      ),
      cell: ({ row }) =>
        `${row.original.employees?.user.first_name} ${row.original.employees?.user.last_name}`,
    },
    {
      accessorKey: "module_name",
      header: ({ column }) => <SortableHeader name="Module" column={column} />,
    },
    {
      accessorKey: "access",
      header: ({ column }) => <SortableHeader name="Access" column={column} />,
    },
    {
      accessorKey: "permissions",
      header: ({ column }) => (
        <SortableHeader name="Permissions" column={column} />
      ),
    },
    {
      id: "edit-action",
      cell: ({ row }) => {
        // const employee = row.original;
        return (
          <EmployeeUserRoleEditDialog
            asIcon
            data={row.original}
            company_id={row.original.company_id}
          />
        );
      },
    },
  ];
