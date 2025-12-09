"use client";
import TextCapsule from "@/components/custom/TextCapsule";
import { Button } from "@/components/ui/button";
import { SortableHeader } from "@/components/ui/data-table";
import Icons from "@/components/ui/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ICompany } from "@/schema/CompanySchema";
import { ColumnDef } from "@tanstack/react-table";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<ICompany>[] = [
  {
    id: "Company ID",
    accessorKey: "company_id",
    header: ({ column }) => <SortableHeader name="ID" column={column} />,
  },
  {
    id: "Company Name",
    accessorKey: "company_name",
    header: ({ column }) => <SortableHeader name={"Company"} column={column} />,
    cell: ({ row }) => (
      <span className="line-clamp-2 text-ellipsis w-64">
        {row.original.company_name}
      </span>
    ),
  },
  {
    id: "Industry",
    accessorKey: "industry",
    header: ({ column }) => <SortableHeader name="Industry" column={column} />,
    cell: ({ row }) => (
      <span className="line-clamp-2 text-ellipsis w-60">
        {row.original.industry}
      </span>
    ),
  },
  {
    id: "HQ",
    accessorKey: "headquarters",
    header: ({ column }) => <SortableHeader name="HQ" column={column} />,
    cell: ({ row }) => (
      <span className="line-clamp-2 text-ellipsis w-60">
        {row.original.headquarters}
      </span>
    ),
  },
  {
    id: "Estd.",
    accessorKey: "founded_year",
    header: ({ column }) => <SortableHeader name="ESTD." column={column} />,
  },
  {
    id: "Email",
    accessorKey: "email",
    header: ({ column }) => <SortableHeader name="Email" column={column} />,
    cell: ({ row }) => {
      const email = row.original.email;

      if (!email) return <>N/A</>;

      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href={`mailto:${email}`} target="_blank" passHref>
                <Button className="text-xs gap-1" variant={"link"} size={"sm"}>
                  <Icons.mail className="size-4" /> Send Email
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>{row.original.email}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    id: "Website",
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
    id: "Contact",
    accessorKey: "contact_number",
    header: ({ column }) => <SortableHeader name="Contact" column={column} />,
  },
  {
    id: "Status",
    accessorKey: "is_active",
    header: ({ column }) => <SortableHeader name="Status" column={column} />,
    cell: ({ row }) => (
      <TextCapsule
        className={cn(
          !row.original.is_active ? "bg-muted-foreground" : "bg-green-500"
        )}
      >
        {!row.original.is_active ? "Inactive" : "Active"}
      </TextCapsule>
    ),
  },

  {
    id: "Action",
    header: "Action",
    cell: ({ row }) => {
      // const employee = row.original;
      return (
        <Link href={`/dashboard/company/${row.original.company_id}`} passHref>
          <Button
            size={"sm"}
            className="gap-1 [&_svg]:size-4"
            variant={"ghost"}
          >
            <ExternalLink />
            View
          </Button>
        </Link>
      );
    },
  },
];
