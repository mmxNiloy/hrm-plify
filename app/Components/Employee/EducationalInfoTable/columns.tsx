"use client";
import { Button } from "@/components/ui/button";
import { SortableHeader } from "@/components/ui/data-table";
import Icons from "@/components/ui/icons";
import { IEmployeeEducationalDetail } from "@/schema/EmployeeSchema";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import EducationalInfoEditDialog from "../EditDialog/EducationalInfoEditDialog";

export const columns: ColumnDef<IEmployeeEducationalDetail>[] = [
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
    cell: ({ row }) => (
      <Link target="_blank" href={row.original.transcript_link ?? "#"} passHref>
        <Button size={"icon"} variant={"ghost"} className="rounuded-full">
          <Icons.pdf />
        </Button>
      </Link>
    ),
  },
  {
    accessorKey: "certificate_link",
    header: "Certificate",
    cell: ({ row }) => (
      <Link
        target="_blank"
        href={row.original.certificate_link ?? "#"}
        passHref
      >
        <Button size={"icon"} variant={"ghost"} className="rounuded-full">
          <Icons.document />
        </Button>
      </Link>
    ),
  },
  {
    id: "action-edit",
    cell: ({ row }) => (
      <EducationalInfoEditDialog
        asIcon
        data={row.original}
        employee_id={row.original.employee_id}
      />
    ),
  },
];
