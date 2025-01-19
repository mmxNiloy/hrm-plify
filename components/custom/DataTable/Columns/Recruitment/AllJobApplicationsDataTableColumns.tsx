"use client";

import ShortlistingAlertDialog from "@/components/custom/AlertDialog/ShortlistingAlertDialog";
import JobListingEditDialog from "@/components/custom/Dialog/Recruitment/JobListingEditDialog";
import TextCapsule from "@/components/custom/TextCapsule";
import { Button } from "@/components/ui/button";
import { SortableHeader } from "@/components/ui/data-table";
import Icons from "@/components/ui/icons";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { ICompanyExtraData } from "@/schema/CompanySchema";
import { IDesignation } from "@/schema/DesignationSchema";
import { IJobApplicant, IJobListing } from "@/schema/JobSchema";
import { ToastSuccess } from "@/styles/toast.tailwind";
import { toCapCase } from "@/utils/Misc";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback } from "react";

interface Props extends IJobApplicant {
  updateAccess?: boolean;
}

export const AllJobApplicationsDataTableColumns: ColumnDef<Props>[] = [
  {
    id: "job-code",
    header: ({ column }) => <SortableHeader column={column} name="Job Code" />,
    cell: ({ row }) => row.original.job?.jobCode,
  },
  {
    id: "job-title",
    header: ({ column }) => <SortableHeader column={column} name="Job Title" />,
    cell: ({ row }) => row.original.job?.title,
  },
  {
    id: "job-department",
    header: ({ column }) => (
      <SortableHeader column={column} name="Department" />
    ),
    cell: ({ row }) => row.original.job?.department?.dpt_name,
  },
  {
    id: "job-designation",
    header: ({ column }) => (
      <SortableHeader column={column} name="Designation" />
    ),
    cell: ({ row }) => row.original.job?.designation?.designation_name,
  },
  {
    id: "applicant-name",
    header: ({ column }) => (
      <SortableHeader column={column} name="Name of Applicant" />
    ),
    cell: ({ row }) => {
      const nameParts = [
        row.original.first_name,
        row.original.middle_name,
        row.original.last_name,
      ];
      return (
        <p className="w-48">
          {nameParts.filter((item) => Boolean(item)).join(" ")}
        </p>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => <SortableHeader column={column} name="Email" />,
  },
  {
    accessorKey: "cv_url",
    header: ({ column }) => (
      <SortableHeader column={column} name="Résumé / CV" />
    ),
    cell: ({ row }) => (
      <Link href={row.original.cv_url} target="_blank" passHref>
        <Button variant={"link"} className="gap-2">
          <Icons.externalLink /> View Résumé / CV
        </Button>
      </Link>
    ),
  },
  {
    accessorKey: "cover_letter_url",
    header: ({ column }) => (
      <SortableHeader column={column} name="Cover Letter" />
    ),
    cell: ({ row }) =>
      row.original.cover_letter_url ? (
        <Link href={row.original.cover_letter_url} target="_blank" passHref>
          <Button variant={"link"} className="gap-2">
            <Icons.externalLink /> Cover Letter
          </Button>
        </Link>
      ) : (
        "N/A"
      ),
  },
  {
    id: "status",
    header: ({ column }) => <SortableHeader column={column} name="Status" />,
    cell: ({ row }) => (
      <div className="flex flex-row gap-2 items-center">
        <TextCapsule
          className={
            row.original.job_status === "shortlisted"
              ? "bg-blue-500"
              : row.original.job_status === "onboarded"
              ? "bg-green-500"
              : "bg-amber-500"
          }
        >
          {toCapCase(row.original.job_status ?? "Pending")}
        </TextCapsule>
      </div>
    ),
  },
  {
    id: "action-shortlist",
    header: ({ column }) => (
      <SortableHeader column={column} name="Shortlist?" />
    ),
    cell: ({ row }) =>
      row.original.job_status !== "pending" ||
      !row.original.updateAccess ? null : (
        <ShortlistingAlertDialog
          applicationId={row.original.id}
          jobId={row.original.job?.id ?? 0}
        />
      ),
  },
];
