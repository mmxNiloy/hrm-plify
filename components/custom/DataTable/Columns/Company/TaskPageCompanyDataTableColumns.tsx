"use client";
import { Button } from "@/components/ui/button";
import { SortableHeader } from "@/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Icons from "@/components/ui/icons";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { ICompany } from "@/schema/CompanySchema";
import { IEmployee } from "@/schema/EmployeeSchema";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const TaskPageCompanyDataTableColumns: ColumnDef<ICompany>[] = [
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
          href={`/dashboard/company/${row.original.company_id}/tasks`}
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

export const column_skeletons: ColumnDef<ICompany>[] = [
  {
    id: "company_id",
    header: ({ column }) => <SortableHeader name="ID" column={column} />,
    cell: ({ row }) => (
      <Skeleton
        className={cn("h-8", row.index % 2 != 0 ? "bg-muted-foreground" : "")}
      />
    ),
  },
  {
    id: "company_name",
    header: ({ column }) => <SortableHeader name={"Company"} column={column} />,
    cell: ({ row }) => (
      <Skeleton
        className={cn("h-8", row.index % 2 != 0 ? "bg-muted-foreground" : "")}
      />
    ),
  },
  {
    id: "industry",
    header: ({ column }) => <SortableHeader name="Industry" column={column} />,
    cell: ({ row }) => (
      <Skeleton
        className={cn("h-8", row.index % 2 != 0 ? "bg-muted-foreground" : "")}
      />
    ),
  },
  {
    id: "headquarters",
    header: ({ column }) => <SortableHeader name="HQ" column={column} />,
    cell: ({ row }) => (
      <Skeleton
        className={cn("h-8", row.index % 2 != 0 ? "bg-muted-foreground" : "")}
      />
    ),
  },
  {
    id: "founded_year",
    header: ({ column }) => <SortableHeader name="ESTD." column={column} />,
    cell: ({ row }) => (
      <Skeleton
        className={cn("h-8", row.index % 2 != 0 ? "bg-muted-foreground" : "")}
      />
    ),
  },
  {
    id: "website",
    header: ({ column }) => <SortableHeader name="Website" column={column} />,
    cell: ({ row }) => (
      <Skeleton
        className={cn("h-8", row.index % 2 != 0 ? "bg-muted-foreground" : "")}
      />
    ),
  },
  {
    id: "contact_number",
    header: ({ column }) => <SortableHeader name="Contact" column={column} />,
    cell: ({ row }) => (
      <Skeleton
        className={cn("h-8", row.index % 2 != 0 ? "bg-muted-foreground" : "")}
      />
    ),
  },
  {
    id: "is_active",
    header: ({ column }) => <SortableHeader name="Status" column={column} />,
    cell: ({ row }) => (
      <Skeleton
        className={cn("h-8", row.index % 2 != 0 ? "bg-muted-foreground" : "")}
      />
    ),
  },

  {
    id: "action",
    cell: ({ row }) => {
      return (
        <Button disabled className="rounded-full" variant="ghost" size="icon">
          <Icons.more />
        </Button>
      );
    },
  },
];
