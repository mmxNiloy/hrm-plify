"use client";

import { SortableHeader } from "@/components/ui/data-table";
import { IPermission, IUser, TRole } from "@/schema/UserSchema";
import { ColumnDef } from "@tanstack/react-table";
import { getFullNameOfUser } from "@/utils/Misc";
import TextCapsule from "@/components/custom/TextCapsule";
import UserEditDialog from "@/components/custom/Dialog/UserAccess/UserEditDialog";

interface Props extends IUser {
  permissions: IPermission[];
  updateAccess?: boolean;
}

export const UserDataTableColumns: ColumnDef<Props>[] = [
  {
    accessorKey: "user_id",
    header: ({ column }) => <SortableHeader name="ID" column={column} />,
  },
  {
    id: "user_full_name",
    header: ({ column }) => (
      <SortableHeader name={"Full Name"} column={column} />
    ),
    cell: ({ row }) => getFullNameOfUser(row.original),
  },
  {
    accessorKey: "email",
    header: ({ column }) => <SortableHeader name="Email" column={column} />,
  },
  {
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
    id: "read-perms-count",
    header: ({ column }) => (
      <SortableHeader name="Read Permissions" column={column} />
    ),
    cell: ({ row }) => (
      <p>
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
      </p>
    ),
  },
  {
    id: "write-perms-count",
    header: ({ column }) => (
      <SortableHeader name="Write Permissions" column={column} />
    ),
    cell: ({ row }) => (
      <p>
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
      </p>
    ),
  },
  {
    id: "update-perms-count",
    header: ({ column }) => (
      <SortableHeader name="Update Permissions" column={column} />
    ),
    cell: ({ row }) => (
      <p>
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
      </p>
    ),
  },
  {
    id: "role",
    header: ({ column }) => <SortableHeader name="Role" column={column} />,
    cell: ({ row }) => (
      <TextCapsule
        className={getRoleCapsuleColor(
          row.original.user_roles?.roles?.role_name
        )}
      >
        {row.original.user_roles?.roles?.role_name ?? "N/A"}
      </TextCapsule>
    ),
  },
  {
    id: "edit-action",
    cell: ({ row }) =>
      !row.original.updateAccess ? null : (
        <UserEditDialog
          permissions={row.original.permissions}
          asIcon
          data={row.original}
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
