"use client";
import { Input } from "@/components/ui/input";
import { ColumnDef } from "@tanstack/react-table";

interface IEduDetailHeader {
  qualification: string;
  subject: string;
  institution_name: string;
  awarding_body: string;
  year_of_passing: string;
  percentage: number;
  grade: string;
}

//! Unfinished
export const columns: ColumnDef<IEduDetailHeader>[] = [
  {
    accessorKey: "qualification",
    header: "Qualification",
  },
  {
    accessorKey: "subject",
    header: "Subject",
  },
  {
    accessorKey: "institution_name",
    header: "Institution Name",
  },
  {
    accessorKey: "awarding_body",
    header: "Awarding Body / University",
  },
  {
    accessorKey: "year_of_passing",
    header: "Year of Passing",
  },
  {
    accessorKey: "percentage",
    header: "Percentage",
  },
  {
    accessorKey: "grade",
    header: "Grade / Division",
  },
  {
    id: "transcript",
    header: "Transcript Document",
    cell: ({ row }) => (
      <Input
        type="file"
        accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, image/*, text/plain, text/csv, audio/*, video/*, application/zip, application/json"
      />
    ),
  },
  {
    id: "certificate",
    header: "Certificate Document",
    cell: ({ row }) => (
      <Input
        type="file"
        accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, image/*, text/plain, text/csv, audio/*, video/*, application/zip, application/json"
      />
    ),
  },
];
