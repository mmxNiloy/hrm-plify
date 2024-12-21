"use client";
import { SortableHeader } from "@/components/ui/data-table";
import { IEmployeeWithUserMetadata } from "@/schema/EmployeeSchema";
import { ColumnDef } from "@tanstack/react-table";
import { getFullNameOfUser } from "@/utils/Misc";

export const StaffReportDataTableColumns: ColumnDef<IEmployeeWithUserMetadata>[] =
  [
    {
      accessorKey: "employee_code",
      header: ({ column }) => (
        <SortableHeader name="Employee Code" column={column} />
      ),
    },
    {
      id: "employee",
      header: ({ column }) => (
        <SortableHeader name="Employee" column={column} />
      ),
      cell: ({ row }) => getFullNameOfUser(row.original.user),
    },
    {
      accessorKey: "designations",
      header: ({ column }) => (
        <SortableHeader name="Designation" column={column} />
      ),
      cell: ({ row }) => row.original.designations?.designation_name,
    },
    {
      accessorKey: "contact_information",
      header: ({ column }) => <SortableHeader name="Address" column={column} />,
      cell: ({ row }) =>
        [
          row.original.contact_information?.address_line,
          row.original.contact_information?.additional_address_1,
          row.original.contact_information?.additional_address_2,
        ]
          .filter((item) => item !== null && item !== undefined)
          .join(","),
    },
    {
      accessorKey: "date_of_birth",
      header: ({ column }) => (
        <SortableHeader name="Date of Birth" column={column} />
      ),
      cell: ({ row }) =>
        row.original.date_of_birth
          ? new Date(row.original.date_of_birth).toLocaleDateString("en-GB")
          : "N/A",
    },
    {
      accessorKey: "date_of_joining",
      header: ({ column }) => (
        <SortableHeader name="Joining Date" column={column} />
      ),
      cell: ({ row }) =>
        row.original.date_of_joining
          ? new Date(row.original.date_of_joining).toLocaleDateString("en-GB")
          : "N/A",
    },
    {
      accessorKey: "contact_number",
      header: ({ column }) => (
        <SortableHeader name="Contact Number" column={column} />
      ),
      cell: ({ row }) => row.original.contact_number,
    },
    {
      accessorKey: "nationality",
      header: ({ column }) => (
        <SortableHeader name="Nationality" column={column} />
      ),
      cell: ({ row }) => row.original.nationality,
    },
    {
      accessorKey: "ni_num",
      header: ({ column }) => (
        <SortableHeader name="NI Number" column={column} />
      ),
      cell: ({ row }) => row.original.ni_num,
    },
    {
      accessorKey: "emp_passport",
      header: ({ column }) => (
        <SortableHeader name="Passport Number" column={column} />
      ),
      cell: ({ row }) => row.original.emp_passport?.passport_number,
    },
    {
      accessorKey: "visa_brp",
      header: ({ column }) => (
        <SortableHeader name="VISA/BRP Number" column={column} />
      ),
      cell: ({ row }) => row.original.visa_brp?.visa_brp_number,
    },
    {
      id: "visa_brp-issue-date",
      header: ({ column }) => (
        <SortableHeader name="VISA/BRP Issued" column={column} />
      ),
      cell: ({ row }) =>
        row.original.visa_brp?.issue_date
          ? new Date(row.original.visa_brp.issue_date).toLocaleDateString(
              "en-GB"
            )
          : "N/A",
    },
    {
      id: "visa_brp-expiry-date",
      header: ({ column }) => (
        <SortableHeader name="VISA/BRP Expires" column={column} />
      ),
      cell: ({ row }) =>
        row.original.visa_brp?.expiry_date
          ? new Date(row.original.visa_brp.expiry_date).toLocaleDateString(
              "en-GB"
            )
          : "N/A",
    },
  ];
