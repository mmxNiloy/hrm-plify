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
import { IEmployee } from "@/schema/EmployeeSchema";
import { ColumnDef } from "@tanstack/react-table";

export const CompanyEmployeeDataTableColumns: ColumnDef<IEmployee>[] = [
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
  },
  {
    accessorKey: "mobile",
    header: ({ column }) => <SortableHeader name="Mobile" column={column} />,
  },
  {
    accessorKey: "email",
    header: ({ column }) => <SortableHeader name="Email" column={column} />,
  },
  {
    accessorKey: "designation",
    header: ({ column }) => (
      <SortableHeader name="Designation" column={column} />
    ),
  },
  {
    accessorKey: "nationaility",
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
  },
  {
    accessorKey: "passport_number",
    header: ({ column }) => (
      <SortableHeader name="Passport No." column={column} />
    ),
  },
  {
    accessorKey: "address",
    header: ({ column }) => <SortableHeader name="Address" column={column} />,
  },
  {
    id: "action",
    cell: ({ row }) => {
      const employee = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="rounded-full" variant="ghost" size="icon">
              <Icons.more />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="*:gap-2">
            <DropdownMenuItem>
              <Icons.edit /> Edit
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Icons.pdf /> Download PDF
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Icons.excel /> Download Excel
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const column_skeletons: ColumnDef<IEmployee>[] = [
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
  },
  {
    accessorKey: "mobile",
    header: ({ column }) => <SortableHeader name="Mobile" column={column} />,
  },
  {
    accessorKey: "email",
    header: ({ column }) => <SortableHeader name="Email" column={column} />,
  },
  {
    accessorKey: "designation",
    header: ({ column }) => (
      <SortableHeader name="Designation" column={column} />
    ),
  },
  {
    accessorKey: "nationaility",
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
  },
  {
    accessorKey: "passport_number",
    header: ({ column }) => (
      <SortableHeader name="Passport No." column={column} />
    ),
  },
  {
    accessorKey: "address",
    header: ({ column }) => <SortableHeader name="Address" column={column} />,
  },
  {
    id: "action",
    cell: ({ row }) => {
      const employee = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="rounded-full" variant="ghost" size="icon">
              <Icons.more />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="*:gap-2">
            <DropdownMenuItem>
              <Icons.edit /> Edit
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Icons.pdf /> Download PDF
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Icons.excel /> Download Excel
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
