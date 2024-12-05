"use client";

import JobListingEditDialog from "@/components/custom/Dialog/Recruitment/JobListingEditDialog";
import TextCapsule from "@/components/custom/TextCapsule";
import { Button } from "@/components/ui/button";
import { SortableHeader } from "@/components/ui/data-table";
import Icons from "@/components/ui/icons";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { ICompanyExtraData } from "@/schema/CompanySchema";
import { IDesignation } from "@/schema/DesignationSchema";
import { IJobListing } from "@/schema/JobSchema";
import { ToastSuccess } from "@/styles/toast.tailwind";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback } from "react";

interface Props extends IJobListing {
  companyData: ICompanyExtraData;
}

export const JobListingDataTableColumns: ColumnDef<Props>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <SortableHeader column={column} name="ID" />,
  },
  {
    accessorKey: "title",
    header: ({ column }) => <SortableHeader column={column} name="Job Title" />,
  },
  {
    accessorKey: "desc",
    header: ({ column }) => (
      <SortableHeader column={column} name="Job Description" />
    ),
    cell: ({ row }) => (
      <p className="max-w-72 text-ellipsis line-clamp-3">{row.original.desc}</p>
    ),
  },
  {
    id: "job-link",
    header: ({ column }) => <SortableHeader column={column} name="Job Link" />,
    cell: ({ row }) => <JobLink jobId={row.original.id} />,
  },
  {
    accessorKey: "jobCode",
    header: ({ column }) => <SortableHeader column={column} name="Job Code" />,
  },
  {
    id: "status",
    header: ({ column }) => <SortableHeader column={column} name="Status" />,
    cell: ({ row }) => (
      <div className="flex flex-row gap-2 items-center">
        <TextCapsule
          className={cn(
            "text-white",
            row.original.isPublished ? "bg-green-500" : "bg-amber-500"
          )}
        >
          {row.original.isPublished ? "Published" : "Not Published"}
        </TextCapsule>

        <TextCapsule
          className={cn(
            "text-white",
            row.original.status ? "bg-green-500" : "bg-red-500"
          )}
        >
          {row.original.status ? "Active" : "Inactive"}
        </TextCapsule>
      </div>
    ),
  },
  {
    id: "action-edit",
    cell: ({ row }) => (
      <JobListingEditDialog
        asIcon
        employeeId={row.original.employee_id}
        data={row.original}
        companyData={row.original.companyData}
        company_id={row.original.company_id}
      />
    ),
  },
];

function JobLink({ jobId }: { jobId: number }) {
  const { toast } = useToast();
  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(
      `${window.location.origin}/job/${jobId}`.replace("http:", "https:")
    );

    toast({
      title: "Link Copied!",
      className: ToastSuccess,
    });
  }, [jobId, toast]);

  return (
    <div className="flex gap-2 items-center justify-between">
      <Link href={`/job/${jobId}`} target="_blank">
        <Button variant={"link"} className="gap-2 text-blue-500">
          <Icons.link className="size-5" /> Visit
        </Button>
      </Link>

      <Button onClick={copyToClipboard} variant={"ghost"} size={"icon"}>
        <Icons.copy className="size-5" />
      </Button>
    </div>
  );
}
