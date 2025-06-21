"use client";

import { SortableHeader } from "@/components/ui/data-table";
import { IPermission, IUser, TRole } from "@/schema/UserSchema";
import { ColumnDef } from "@tanstack/react-table";
import { getFullNameOfUser } from "@/utils/Misc";
import TextCapsule from "@/components/custom/TextCapsule";
import UserEditDialog from "@/components/custom/Dialog/UserAccess/UserEditDialog";
import PermissionPopover from "../components/permission-popover";
import { ChevronDown } from "lucide-react";
import CellActions from "./cell-actions";
import { cn } from "@/lib/utils";

interface Props extends IUser {
  permissions: IPermission[];
  updateAccess?: boolean;
}

export const columns: ColumnDef<Props>[] = [
  {
    id: "ID",
    accessorKey: "user_id",
    header: ({ column }) => <SortableHeader name="ID" column={column} />,
  },
  {
    id: "Full Name",
    header: ({ column }) => (
      <SortableHeader name={"Full Name"} column={column} />
    ),
    cell: ({ row }) => getFullNameOfUser(row.original),
  },
  {
    id: "Email",
    accessorKey: "email",
    header: ({ column }) => <SortableHeader name="Email" column={column} />,
  },
  {
    id: "Status",
    accessorKey: "status",
    header: ({ column }) => <SortableHeader name="Status" column={column} />,
    cell: ({ row }) => (
      <TextCapsule
        className={
          row.original.status === "active" ? "bg-green-500" : "bg-red-500"
        }
      >
        {row.original.status === "active" ? "Active" : "Inactive"}
      </TextCapsule>
    ),
  },
  {
    id: "Read Permissions",
    header: ({ column }) => (
      <SortableHeader name="Read Permissions" column={column} />
    ),
    cell: ({ row }) => (
      <PermissionPopover
        variant={"ghost"}
        className="min-w-36 [&_svg]:size-4"
        data={row.original.access_permissions
          .filter((item) => item.permission.permission_name.endsWith("read"))
          .map((item) => item.permission)}
      >
        {
          row.original.access_permissions.filter((item) =>
            item.permission.permission_name.endsWith("read")
          ).length
        }
        /
        {
          row.original.permissions.filter((item) =>
            item.permission_name.endsWith("read")
          ).length
        }
        <ChevronDown />
      </PermissionPopover>
    ),
  },
  {
    id: "Write Permissions",
    header: ({ column }) => (
      <SortableHeader name="Write Permissions" column={column} />
    ),
    cell: ({ row }) => (
      <PermissionPopover
        variant={"ghost"}
        className="min-w-36 [&_svg]:size-4"
        data={row.original.access_permissions
          .filter((item) => item.permission.permission_name.endsWith("create"))
          .map((item) => item.permission)}
      >
        {
          row.original.access_permissions.filter((item) =>
            item.permission.permission_name.endsWith("create")
          ).length
        }
        /
        {
          row.original.permissions.filter((item) =>
            item.permission_name.endsWith("create")
          ).length
        }
        <ChevronDown />
      </PermissionPopover>
    ),
  },
  {
    id: "Update Permissions",
    header: ({ column }) => (
      <SortableHeader name="Update Permissions" column={column} />
    ),
    cell: ({ row }) => (
      <PermissionPopover
        variant={"ghost"}
        className="min-w-36 [&_svg]:size-4"
        data={row.original.access_permissions
          .filter((item) => item.permission.permission_name.endsWith("update"))
          .map((item) => item.permission)}
      >
        {
          row.original.access_permissions.filter((item) =>
            item.permission.permission_name.endsWith("update")
          ).length
        }
        /
        {
          row.original.permissions.filter((item) =>
            item.permission_name.endsWith("update")
          ).length
        }
        <ChevronDown />
      </PermissionPopover>
    ),
  },
  {
    id: "Role",
    header: ({ column }) => <SortableHeader name="Role" column={column} />,
    cell: ({ row }) => (
      <TextCapsule
        className={cn(
          getRoleCapsuleColor(row.original.user_roles?.roles?.role_name),
          "text-nowrap"
        )}
      >
        {row.original.user_roles?.roles?.role_name ?? "N/A"}
      </TextCapsule>
    ),
  },
  {
    id: "Actions",
    cell: ({ row }) => (
      <CellActions
        data={row.original}
        permissions={row.original.permissions}
        updateAccess={row.original.updateAccess}
      />
    ),
  },
];

const getRoleCapsuleColor = (role?: TRole): string => {
  switch (role) {
    case "Super Admin":
      return "bg-purple-500";
    case "Admin":
      return "bg-blue-500";
    case "Company Admin":
      return "bg-orange-500";
    case "Employee":
      return "bg-lime-500";
    default:
      return "";
  }
};
