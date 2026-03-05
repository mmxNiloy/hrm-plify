"use client";
import TextCapsule from "@/components/custom/TextCapsule";
import { SortableHeader } from "@/components/ui/data-table";
import { IEmployeeWithUserMetadata } from "@/schema/EmployeeSchema";
import { getFullNameOfEmployee, toCapCase } from "@/utils/Misc";
import { ColumnDef } from "@tanstack/react-table";
import CellActions from "./cell-actions";
import { cn } from "@/lib/utils";
import { AvatarPicker } from "@/components/ui/avatar-picker";
import { User2 } from "lucide-react";

interface Props extends IEmployeeWithUserMetadata {
  updateAccess?: boolean;
}

export const columns: ColumnDef<Props>[] = [
  {
    id: "Row Actions",
    header: "Actions",
    cell: ({ row }) => (
      <CellActions
        updateAccess={row.original.updateAccess}
        data={row.original}
      />
    ),
  },
  {
    id: "Avatar",
    accessorKey: "image",
    header: "Avatar",
    cell: ({ row }) => (
      <AvatarPicker
        key={row.original.employee_id}
        readOnly
        className="p-0.5 size-16 ring-blue-500 ring-1"
        src={row.original.image}
        skeleton={<User2 className="size-full" />}
      />
    ),
  },
  {
    id: "Employee Code",
    accessorKey: "employee_code",
    header: ({ column }) => (
      <SortableHeader column={column} name="Employee Code" />
    ),
    cell: ({ row }) => (
      <span className="line-clamp-3 text-ellipsis overflow-hidden w-24">
        {row.original.employee_code}
      </span>
    ),
  },
  {
    id: "Employment type",
    header: ({ column }) => (
      <SortableHeader column={column} name="Employment Type" />
    ),
    cell: ({ row }) => (
      <span className="line-clamp-3 text-ellipsis overflow-hidden w-24">
        {row.original.emp_type?.employment_type ?? "N/A"}
      </span>
    ),
  },
  {
    id: "Name",
    header: ({ column }) => <SortableHeader column={column} name="Name" />,
    cell: ({ row }) => (
      <span className="line-clamp-3 text-ellipsis overflow-hidden w-48">
        {getFullNameOfEmployee(row.original)}
      </span>
    ),
  },
  {
    id: "Email",
    header: ({ column }) => <SortableHeader column={column} name="Email" />,
    cell: ({ row }) => (
      <span className="line-clamp-3 text-ellipsis overflow-hidden break-words w-48">
        {row.original.user.email}
      </span>
    ),
  },
  {
    id: "Role",
    header: ({ column }) => <SortableHeader column={column} name="Role" />,
    cell: ({ row }) => (
      <TextCapsule className="line-clamp-3 text-ellipsis overflow-hidden max-w-32 from-blue-400 to-blue-600 bg-gradient-to-br text-white">
        {row.original.user.user_roles?.roles?.role_name ?? "N/A"}
      </TextCapsule>
    ),
  },
  {
    id: "Employment Origin",
    header: ({ column }) => (
      <SortableHeader column={column} name="Employment Origin" />
    ),
    cell: ({ row }) => (
      <TextCapsule
        className={cn(
          "text-white bg-gradient-to-br",
          row.original.is_foreign
            ? "from-purple-300 to-purple-600"
            : "from-blue-400 to-blue-600",
        )}
      >
        {row.original.is_foreign ? "International Hire" : "Domestic Hire"}
      </TextCapsule>
    ),
  },
  {
    id: "Employment Status",
    header: ({ column }) => (
      <SortableHeader column={column} name="Employment Status" />
    ),
    cell: ({ row }) => (
      <TextCapsule
        className={cn(
          "text-white bg-gradient-to-br",
          row.original.status === "ACTIVE"
            ? "from-lime-500 to-green-600"
            : row.original.status === "LEAVE"
              ? "from-amber-400 to-yellow-600"
              : row.original.status === "TERMINATED"
                ? "from-rose-400 to-red-600"
                : row.original.status === "RESIGNED"
                  ? "from-fuchsia-400 to-purple-600"
                  : "from-sky-400 to-blue-600",
        )}
      >
        {toCapCase(
          row.original.status === "LEAVE"
            ? "On Leave"
            : row.original.status.toLowerCase(),
        )}
      </TextCapsule>
    ),
  },
  {
    id: "Actions",
    header: "Actions",
    cell: ({ row }) => (
      <CellActions
        updateAccess={row.original.updateAccess}
        data={row.original}
      />
    ),
  },
];
