"use client";
import { Button } from "@/components/ui/button";
import { SortableHeader } from "@/components/ui/data-table";
import Icons from "@/components/ui/icons";
import { ICompanyUser } from "@/schema/UserSchema";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const CompanyUserDataTableColumns: ColumnDef<ICompanyUser>[] = [
  {
    id: "employee_code",
    header: ({ column }) => (
      <SortableHeader column={column} name="Employee Code" />
    ),
    cell: ({ row }) => row.original.users.employee_data?.employee_code ?? "N/A",
  },
  {
    id: "first_name",
    header: ({ column }) => (
      <SortableHeader column={column} name="First name" />
    ),
    cell: ({ row }) => row.original.users.first_name,
  },
  {
    id: "middle_name",
    header: ({ column }) => <SortableHeader column={column} name="Last name" />,
    cell: ({ row }) => row.original.users.middle_name,
  },
  {
    id: "last_name",
    header: ({ column }) => <SortableHeader column={column} name="Last name" />,
    cell: ({ row }) => row.original.users.last_name,
  },
  {
    id: "email",
    header: ({ column }) => <SortableHeader column={column} name="Status" />,
    cell: ({ row }) => row.original.users.email,
  },
  {
    id: "role",
    header: ({ column }) => <SortableHeader column={column} name="Role" />,
    cell: ({ row }) => row.original.roles.role_name,
  },
  {
    id: "edit-employee",
    cell: ({ row }) =>
      row.original.users.employee_data && (
        <Link
          href={`/dashboard/company/${row.original.company_id}/employee/edit/${row.original.users.employee_data.employee_id}/`}
          passHref
        >
          <Button
            variant={"ghost"}
            size={"icon"}
            className="rounded-full"
            name="Edit Info"
          >
            <Icons.edit />
          </Button>
        </Link>
      ),
  },
];
