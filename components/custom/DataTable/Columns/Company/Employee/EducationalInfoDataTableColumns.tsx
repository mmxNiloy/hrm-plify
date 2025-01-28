"use client";
import { Button } from "@/components/ui/button";
import { SortableHeader } from "@/components/ui/data-table";
import Icons from "@/components/ui/icons";
import { IEmployeeEducationalDetail } from "@/schema/EmployeeSchema";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import EducationalInfoEditDialog from "../../../../Dialog/Employee/EducationalInfoEditDialog";
import TextCapsule from "@/components/custom/TextCapsule";
import EmployeeEducationalInfoToggleAlertDialog from "@/components/custom/AlertDialog/EmployeeEducationalInfoToggleAlertDialog";

interface Props extends IEmployeeEducationalDetail {
  updateAccess?: boolean;
}

export const EducationalInfoDataTableColumns: ColumnDef<Props>[] = [
  {
    accessorKey: "education_id",
    header: ({ column }) => <SortableHeader name="ID" column={column} />,
  },
  {
    accessorKey: "qualification",
    header: ({ column }) => (
      <SortableHeader name="Qualification" column={column} />
    ),
  },
  {
    accessorKey: "subject",
    header: ({ column }) => <SortableHeader name="Subject" column={column} />,
  },
  {
    accessorKey: "institution_name",
    header: ({ column }) => (
      <SortableHeader name="Institution" column={column} />
    ),
  },
  {
    accessorKey: "grade",
    header: ({ column }) => <SortableHeader name="Grade" column={column} />,
  },
  {
    accessorKey: "passing_year",
    header: ({ column }) => (
      <SortableHeader name="Passing Year" column={column} />
    ),
  },
  {
    accessorKey: "transcript_link",
    header: "Transcript",
    cell: ({ row }) =>
      row.original.transcript_link ? (
        <Link
          target="_blank"
          href={row.original.transcript_link ?? "#"}
          passHref
        >
          <Button size={"icon"} variant={"ghost"} className="rounuded-full">
            <Icons.externalLink />
          </Button>
        </Link>
      ) : (
        <Button
          disabled
          size={"icon"}
          variant={"ghost"}
          className="rounuded-full"
        >
          <Icons.externalLink />
        </Button>
      ),
  },
  {
    accessorKey: "certificate_link",
    header: "Certificate",
    cell: ({ row }) =>
      row.original.certificate_link ? (
        <Link target="_blank" href={row.original.certificate_link} passHref>
          <Button size={"icon"} variant={"ghost"} className="rounuded-full">
            <Icons.externalLink />
          </Button>
        </Link>
      ) : (
        <Button
          disabled
          size={"icon"}
          variant={"ghost"}
          className="rounuded-full"
        >
          <Icons.externalLink />
        </Button>
      ),
  },
  {
    id: "action-edit",
    cell: ({ row }) =>
      !row.original.updateAccess ? null : (
        <EducationalInfoEditDialog
          asIcon
          data={row.original}
          employee_id={row.original.employee_id}
        />
      ),
  },
  {
    id: "action-delete",
    cell: ({ row }) =>
      !row.original.updateAccess ? null : (
        <EmployeeEducationalInfoToggleAlertDialog data={row.original} />
      ),
  },
];
