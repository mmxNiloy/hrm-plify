"use client";
import { Button } from "@/components/ui/button";
import { SortableHeader } from "@/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Icons from "@/components/ui/icons";
import { IContractAgreement, IEmployee } from "@/schema/EmployeeSchema";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<IContractAgreement>[] = [
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
    accessorKey: "dob",
    header: ({ column }) => <SortableHeader name="DoB" column={column} />,
    cell: ({ row }) => row.original.dob.toLocaleDateString("en-GB"),
  },
  {
    accessorKey: "mobile",
    header: ({ column }) => <SortableHeader name="Mobile" column={column} />,
  },
  {
    accessorKey: "nationality",
    header: ({ column }) => (
      <SortableHeader name="Nationality" column={column} />
    ),
  },
  {
    accessorKey: "ni_number",
    header: ({ column }) => <SortableHeader name="NI Number" column={column} />,
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
    accessorKey: "passport_number",
    header: ({ column }) => (
      <SortableHeader name="Passport Number" column={column} />
    ),
  },
  {
    accessorKey: "address",
    header: ({ column }) => <SortableHeader name="Address" column={column} />,
  },
  {
    id: "action",
    header: "Agreement",
    cell: ({ row }) => {
      return (
        <div className="flex felx-row gap-2">
          <Button
            title="Download as PDF"
            variant={"ghost"}
            size={"icon"}
            className="rounded-full size-5"
          >
            <Icons.pdf className="size-4" />
          </Button>
          <Button
            title="Download as Word"
            variant={"ghost"}
            size={"icon"}
            className="rounded-full size-5"
          >
            <Icons.word className="size-4" />
          </Button>
        </div>
      );
    },
  },
];
