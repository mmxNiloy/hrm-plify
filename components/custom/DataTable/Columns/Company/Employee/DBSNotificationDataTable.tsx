"use client";
import { Button } from "@/components/ui/button";
import { SortableHeader } from "@/components/ui/data-table";
import Icons from "@/components/ui/icons";
import { IEmployeeDocument } from "@/schema/EmployeeSchema";
import { ColumnDef } from "@tanstack/react-table";
import { getFullNameOfEmployee } from "@/utils/Misc";
import { addDays } from "date-fns";
import DBSNotificationReportGenerator from "@/components/custom/PDF/DBSNotificationReportGenerator";

export const DBSNotificationDataTableColumns: ColumnDef<IEmployeeDocument>[] = [
  {
    id: "employee-code",
    header: ({ column }) => (
      <SortableHeader name="Employee Code" column={column} />
    ),
    cell: ({ row }) => row.original.employee_code,
  },
  {
    id: "employee",
    header: ({ column }) => <SortableHeader name="Employee" column={column} />,
    cell: ({ row }) => getFullNameOfEmployee(row.original),
  },
  {
    id: "dbs-type",
    header: ({ column }) => <SortableHeader name="DBS Type" column={column} />,
    cell: ({ row }) => row.original.emp_euss_dbss_data?.dbs_type ?? "N/A",
  },
  {
    id: "dbs-ref-no",
    header: ({ column }) => (
      <SortableHeader name="DBS Reference No." column={column} />
    ),
    cell: ({ row }) => row.original.emp_euss_dbss_data?.dbs_ref_no ?? "N/A",
  },
  {
    id: "issue-date",
    header: ({ column }) => (
      <SortableHeader name="DBS Issue Date" column={column} />
    ),
    cell: ({ row }) =>
      row.original.emp_euss_dbss_data?.dbs_issue_date
        ? new Date(
            row.original.emp_euss_dbss_data?.dbs_issue_date
          ).toLocaleDateString("en-GB")
        : "N/A",
  },
  {
    id: "dbs-expiry-date",
    header: ({ column }) => (
      <SortableHeader name="DBS Expiry Date" column={column} />
    ),
    cell: ({ row }) =>
      row.original.emp_euss_dbss_data?.dbs_expiry_date
        ? new Date(
            row.original.emp_euss_dbss_data?.dbs_expiry_date
          ).toLocaleDateString("en-GB")
        : "N/A",
  },
  {
    id: "dbs-reminder-90",
    header: ({ column }) => (
      <SortableHeader name="DBS Reminder - 90 days" column={column} />
    ),
    cell: ({ row }) =>
      row.original.emp_euss_dbss_data?.dbs_expiry_date
        ? addDays(
            new Date(row.original.emp_euss_dbss_data?.dbs_expiry_date),
            -90
          ).toLocaleDateString("en-GB")
        : "N/A",
  },
  {
    id: "dbs-reminder-60",
    header: ({ column }) => (
      <SortableHeader name="DBS Reminder - 60 days" column={column} />
    ),
    cell: ({ row }) =>
      row.original.emp_euss_dbss_data?.dbs_expiry_date
        ? addDays(
            new Date(row.original.emp_euss_dbss_data?.dbs_expiry_date),
            -60
          ).toLocaleDateString("en-GB")
        : "N/A",
  },
  {
    id: "dbs-reminder-30",
    header: ({ column }) => (
      <SortableHeader name="DBS Reminder - 30 days" column={column} />
    ),
    cell: ({ row }) =>
      row.original.emp_euss_dbss_data?.dbs_expiry_date
        ? addDays(
            new Date(row.original.emp_euss_dbss_data?.dbs_expiry_date),
            -30
          ).toLocaleDateString("en-GB")
        : "N/A",
  },
  {
    id: "action-view",
    header: "View",
    cell: ({ row }) => (
      <DBSNotificationReportGenerator
        data={row.original}
        company={row.original.user.usercompany?.companies!}
      />
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
