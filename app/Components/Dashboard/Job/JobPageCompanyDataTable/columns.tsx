"use client";

import { Button } from "@/components/ui/button";
import { SortableHeader } from "@/components/ui/data-table";
import Icons from "@/components/ui/icons";
import { ICompany } from "@/schema/CompanySchema";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

interface ICompanyDetailsWithJobCount extends ICompany {
  job_count: number;
}

export const columns: ColumnDef<ICompanyDetailsWithJobCount>[] = [
  {
    accessorKey: "company_id",
    header: ({ column }) => <SortableHeader column={column} name="ID" />,
  },
  {
    accessorKey: "company_name",
    header: ({ column }) => (
      <SortableHeader column={column} name="Company Name" />
    ),
  },
  {
    accessorKey: "job_count",
    header: ({ column }) => (
      <SortableHeader column={column} name="Total Designations" />
    ),
  },
  {
    id: "action-view",
    cell: ({ row }) => (
      <Link href={`/dashboard/company/${row.original.company_id}/job`} passHref>
        <Button variant={"ghost"} size={"icon"} title="View Designations">
          <Icons.visible />
        </Button>
      </Link>
    ),
  },
];
