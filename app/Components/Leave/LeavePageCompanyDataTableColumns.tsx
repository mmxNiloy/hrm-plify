"use client";

import { Button } from "@/components/ui/button";
import { SortableHeader } from "@/components/ui/data-table";
import Icons from "@/components/ui/icons";
import { ICompany } from "@/schema/CompanySchema";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const LeavePageCompanyDataTableColumns: ColumnDef<ICompany>[] = [
  {
    accessorKey: "company_id",
    header: ({ column }) => <SortableHeader name="ID" column={column} />,
  },
  {
    accessorKey: "company_name",
    header: ({ column }) => <SortableHeader name={"Company"} column={column} />,
  },
  {
    accessorKey: "industry",
    header: ({ column }) => <SortableHeader name="Industry" column={column} />,
  },
  {
    accessorKey: "headquarters",
    header: ({ column }) => <SortableHeader name="HQ" column={column} />,
  },
  {
    accessorKey: "founded_year",
    header: ({ column }) => <SortableHeader name="ESTD." column={column} />,
  },
  {
    accessorKey: "website",
    header: ({ column }) => <SortableHeader name="Website" column={column} />,
    cell: ({ row }) => {
      const website = row.original.website;

      if (!website) return <>N/A</>;

      const url = website.trim();
      return (
        <Link
          href={!/^https?:\/\//i.test(url) ? `https://${url}` : url}
          target="_blank"
          passHref
        >
          <Button className="text-xs gap-1" variant={"link"} size={"sm"}>
            <Icons.link className="size-4" /> {row.original.company_name}
          </Button>
        </Link>
      );
    },
  },
  {
    accessorKey: "contact_number",
    header: ({ column }) => <SortableHeader name="Contact" column={column} />,
  },
  {
    accessorKey: "is_active",
    header: ({ column }) => <SortableHeader name="Status" column={column} />,
    cell: ({ row }) => (
      <>{row.original.is_active == 0 ? "Inactive" : "Active"}</>
    ),
  },

  {
    id: "action",
    cell: ({ row }) => {
      // const employee = row.original;
      return (
        <Link
          href={`/dashboard/company/${row.original.company_id}/leave`}
          passHref
          title="View"
        >
          <Button size={"icon"} variant={"ghost"}>
            <Icons.visible />
          </Button>
        </Link>
      );
    },
  },
];
