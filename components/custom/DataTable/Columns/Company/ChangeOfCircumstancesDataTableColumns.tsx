"use client";
import { SortableHeader } from "@/components/ui/data-table";
import { IChangeOfCircumstances } from "@/schema/EmployeeSchema";
import { ColumnDef } from "@tanstack/react-table";
import ChangeOfCircumstancesEditDialog from "../../../Dialog/Company/CahangeOfCircumstacesEditDialog";

export const ChangeOfCircumstancesDataTableColumns: ColumnDef<IChangeOfCircumstances>[] =
  [
    {
      accessorKey: "updated_date",
      header: ({ column }) => (
        <SortableHeader name="Updated Date" column={column} />
      ),
      cell: ({ row }) => (
        <>{row.original.updated_date.toLocaleDateString("en-GB")}</>
      ),
    },
    {
      accessorKey: "employment_type",
      header: ({ column }) => (
        <SortableHeader name="Employment Type" column={column} />
      ),
    },
    {
      accessorKey: "employee_id",
      header: ({ column }) => (
        <SortableHeader name="Employee ID" column={column} />
      ),
    },
    {
      accessorKey: "employee_name",
      header: ({ column }) => (
        <SortableHeader name={"Employee Name"} column={column} />
      ),
    },
    {
      accessorKey: "job_title",
      header: ({ column }) => (
        <SortableHeader name="Job Title" column={column} />
      ),
      cell: ({ row }) => <p className="min-w-32">{row.original.job_title}</p>,
    },
    {
      accessorKey: "address",
      header: ({ column }) => <SortableHeader name="Address" column={column} />,
      cell: ({ row }) => <p className="min-w-32">{row.original.address}</p>,
    },
    {
      accessorKey: "contact",
      header: ({ column }) => <SortableHeader name="contact" column={column} />,
    },
    {
      accessorKey: "nationality",
      header: ({ column }) => (
        <SortableHeader name="Nationality" column={column} />
      ),
    },
    {
      accessorKey: "brp",
      header: ({ column }) => (
        <SortableHeader name="BRP Number" column={column} />
      ),
    },
    {
      accessorKey: "visa_expired",
      header: ({ column }) => (
        <SortableHeader name="Visa Expired" column={column} />
      ),
      cell: ({ row }) => (
        <>{row.original.visa_expired.toLocaleDateString("en-GB")}</>
      ),
    },
    {
      accessorKey: "remarks",
      header: ({ column }) => (
        <SortableHeader name="Remarks/Restriction to work" column={column} />
      ),
    },
    {
      accessorKey: "passport_number",
      header: ({ column }) => (
        <SortableHeader name="Passport No." column={column} />
      ),
    },
    {
      accessorKey: "euss_details",
      header: ({ column }) => (
        <SortableHeader name="EUSS Details" column={column} />
      ),
    },
    {
      accessorKey: "dbs_details",
      header: ({ column }) => (
        <SortableHeader name="DBS Details" column={column} />
      ),
    },
    {
      accessorKey: "national_id_details",
      header: ({ column }) => (
        <SortableHeader name="National ID Details" column={column} />
      ),
    },
    {
      accessorKey: "other_documents",
      header: ({ column }) => (
        <SortableHeader name="Other Documents" column={column} />
      ),
    },
    {
      accessorKey: "is_informed",
      header: ({ column }) => (
        <SortableHeader
          title="Are Sponsored migrants aware that they must inform HR/line manager promptly of changes in contact Details?"
          name="Conform to change reports?"
          column={column}
          hasOverflow
        />
      ),
    },
    {
      accessorKey: "is_cooperative",
      header: ({ column }) => (
        <SortableHeader
          title="Are Sponsored migrants aware that they need to cooperate Home Office interview by presenting original passports during the Interview (In applicable cases)?"
          name="Compliance with cooperation?"
          column={column}
          hasOverflow
        />
      ),
    },
    {
      id: "action",
      cell: ({ row }) => {
        return <ChangeOfCircumstancesEditDialog data={row.original} />;
      },
    },
  ];
