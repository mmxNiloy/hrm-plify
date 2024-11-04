"use client";
import { Button } from "@/components/ui/button";
import { SortableHeader } from "@/components/ui/data-table";
import Icons from "@/components/ui/icons";
import {
  IEmployeePassportDetail,
  IEmployeeDocument,
  IEmployeeWithVisaDetails,
} from "@/schema/EmployeeSchema";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import PassportDetailsEditDialog from "../../../../Dialog/Employee/PassportDetailsEditDialog";
import { getFullNameOfEmployee } from "@/utils/Misc";
import { addDays } from "date-fns";

export const VisaNotificationDataTableColumns: ColumnDef<IEmployeeDocument>[] =
  [
    {
      id: "employee-code",
      header: ({ column }) => (
        <SortableHeader name="Employee Code" column={column} />
      ),
      cell: ({ row }) => row.original.employee_code,
    },
    {
      id: "employee",
      header: ({ column }) => (
        <SortableHeader name="Employee" column={column} />
      ),
      cell: ({ row }) => getFullNameOfEmployee(row.original),
    },
    {
      id: "passport-no",
      header: ({ column }) => (
        <SortableHeader name="Passport No." column={column} />
      ),
      cell: ({ row }) => row.original.emp_passport?.passport_number ?? "N/A",
    },
    {
      id: "visa_brp_number",
      header: ({ column }) => <SortableHeader name="BRP No." column={column} />,
      cell: ({ row }) => row.original.visa_brp?.visa_brp_number ?? "N/A",
    },
    {
      id: "issue-date",
      header: ({ column }) => (
        <SortableHeader name="VISA Issue Date" column={column} />
      ),
      cell: ({ row }) =>
        row.original.visa_brp?.issue_date
          ? new Date(row.original.visa_brp?.issue_date).toLocaleDateString(
              "en-GB"
            )
          : "N/A",
    },
    {
      id: "visa-expiry-date",
      header: ({ column }) => (
        <SortableHeader name="Visa Expiry Date" column={column} />
      ),
      cell: ({ row }) =>
        row.original.visa_brp?.expiry_date
          ? new Date(row.original.visa_brp?.expiry_date).toLocaleDateString(
              "en-GB"
            )
          : "N/A",
    },
    {
      id: "visa-reminder-90",
      header: ({ column }) => (
        <SortableHeader name="Visa Reminder - 90 days" column={column} />
      ),
      cell: ({ row }) =>
        row.original.visa_brp?.expiry_date
          ? addDays(
              new Date(row.original.visa_brp?.expiry_date),
              -90
            ).toLocaleDateString("en-GB")
          : "N/A",
    },
    {
      id: "visa-reminder-60",
      header: ({ column }) => (
        <SortableHeader name="Visa Reminder - 60 days" column={column} />
      ),
      cell: ({ row }) =>
        row.original.visa_brp?.expiry_date
          ? addDays(
              new Date(row.original.visa_brp?.expiry_date),
              -60
            ).toLocaleDateString("en-GB")
          : "N/A",
    },
    {
      id: "visa-reminder-30",
      header: ({ column }) => (
        <SortableHeader name="Visa Reminder - 30 days" column={column} />
      ),
      cell: ({ row }) =>
        row.original.visa_brp?.expiry_date
          ? addDays(
              new Date(row.original.visa_brp?.expiry_date),
              -30
            ).toLocaleDateString("en-GB")
          : "N/A",
    },
    {
      id: "action-view",
      header: "View",
      cell: ({ row }) => (
        <Button variant={"ghost"} size="icon">
          <Icons.visible />
        </Button>
      ),
    },
    {
      id: "action-email",
      header: "Send Email",
      cell: ({ row }) => (
        <Button variant={"ghost"} size="icon">
          <Icons.send />
        </Button>
      ),
    },
  ];
