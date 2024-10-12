"use client";
import { Button } from "@/components/ui/button";
import { SortableHeader } from "@/components/ui/data-table";
import Icons from "@/components/ui/icons";
import { IEmployeePassportDetail } from "@/schema/EmployeeSchema";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import PassportDetailsEditDialog from "../../../../Dialog/Employee/PassportDetailsEditDialog";

export const PassportDetailsDataTableColumns: ColumnDef<IEmployeePassportDetail>[] =
  [
    {
      accessorKey: "passport_number",
      header: ({ column }) => (
        <SortableHeader name="Passport Number" column={column} />
      ),
    },
    {
      accessorKey: "issue_date",
      header: ({ column }) => (
        <SortableHeader name="Issue Date" column={column} />
      ),
      cell: ({ row }) => new Date(row.original.issue_date).toLocaleDateString(),
    },
    {
      accessorKey: "expiry_date",
      header: ({ column }) => (
        <SortableHeader name="Expiry Date" column={column} />
      ),
      cell: ({ row }) =>
        new Date(row.original.expiry_date).toLocaleDateString(),
    },
    {
      accessorKey: "place_of_birth",
      header: ({ column }) => (
        <SortableHeader name="Place of Birth" column={column} />
      ),
    },
    {
      accessorKey: "document",
      header: "Passport Document",
      cell: ({ row }) => (
        <Link target="_blank" href={row.original.document ?? "#"} passHref>
          <Button size={"icon"} variant={"ghost"} className="rounuded-full">
            <Icons.pdf />
          </Button>
        </Link>
      ),
    },
    {
      accessorKey: "remark",
      header: ({ column }) => <SortableHeader name="Remark" column={column} />,
    },
    {
      id: "action-edit",
      cell: ({ row }) => (
        <PassportDetailsEditDialog
          asIcon
          data={row.original}
          employee_id={row.original.employee_id}
        />
      ),
    },
  ];
