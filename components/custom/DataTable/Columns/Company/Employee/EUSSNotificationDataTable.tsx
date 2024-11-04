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

export const EUSSNotificationDataTableColumns: ColumnDef<IEmployeeDocument>[] =
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
      id: "euss-ref-no",
      header: ({ column }) => (
        <SortableHeader name="DBS Reference No." column={column} />
      ),
      cell: ({ row }) =>
        row.original.emp_euss_dbss_data?.euss_time_linit_ref_num ?? "N/A",
    },
    {
      id: "issue-date",
      header: ({ column }) => (
        <SortableHeader name="EUSS Issue Date" column={column} />
      ),
      cell: ({ row }) =>
        row.original.emp_euss_dbss_data?.euss_issue_date
          ? new Date(
              row.original.emp_euss_dbss_data?.euss_issue_date
            ).toLocaleDateString("en-GB")
          : "N/A",
    },
    {
      id: "euss-expiry-date",
      header: ({ column }) => (
        <SortableHeader name="EUSS Expiry Date" column={column} />
      ),
      cell: ({ row }) =>
        row.original.emp_euss_dbss_data?.euss_expiry_date
          ? new Date(
              row.original.emp_euss_dbss_data?.euss_expiry_date
            ).toLocaleDateString("en-GB")
          : "N/A",
    },
    {
      id: "euss-reminder-90",
      header: ({ column }) => (
        <SortableHeader name="EUSS Reminder - 90 days" column={column} />
      ),
      cell: ({ row }) =>
        row.original.emp_euss_dbss_data?.euss_expiry_date
          ? addDays(
              new Date(row.original.emp_euss_dbss_data?.euss_expiry_date),
              -90
            ).toLocaleDateString("en-GB")
          : "N/A",
    },
    {
      id: "euss-reminder-60",
      header: ({ column }) => (
        <SortableHeader name="EUSS Reminder - 60 days" column={column} />
      ),
      cell: ({ row }) =>
        row.original.emp_euss_dbss_data?.euss_expiry_date
          ? addDays(
              new Date(row.original.emp_euss_dbss_data?.euss_expiry_date),
              -60
            ).toLocaleDateString("en-GB")
          : "N/A",
    },
    {
      id: "euss-reminder-30",
      header: ({ column }) => (
        <SortableHeader name="EUSS Reminder - 30 days" column={column} />
      ),
      cell: ({ row }) =>
        row.original.emp_euss_dbss_data?.euss_expiry_date
          ? addDays(
              new Date(row.original.emp_euss_dbss_data?.euss_expiry_date),
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
