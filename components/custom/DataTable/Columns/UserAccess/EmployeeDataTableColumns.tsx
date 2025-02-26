"use client";

import { SortableHeader } from "@/components/ui/data-table";
import { IPermission, IUser, TRole } from "@/schema/UserSchema";
import { ColumnDef } from "@tanstack/react-table";
import { getFullNameOfUser } from "@/utils/Misc";
import TextCapsule from "@/components/custom/TextCapsule";
import UserEditDialog from "@/components/custom/Dialog/UserAccess/UserEditDialog";
import { IEmployeeWithUserMetadata } from "@/schema/EmployeeSchema";

interface Props {
  permission:
    | {
        permission: IPermission;
        user_id: number;
        id: number;
        permission_id: number;
      }[];
  permissions: IPermission[];
  updateAccess?: boolean;
  data: IEmployeeWithUserMetadata;
}

export const EmployeeDataTableColumns: ColumnDef<Props>[] = [
  {
    id: "emp_id",
    header: ({ column }) => (
      <SortableHeader name="Employee ID" column={column} />
    ),
    cell: ({ row }) => row.original.data.employee_id,
  },
  {
    id: "user_full_name",
    header: ({ column }) => (
      <SortableHeader name={"Full Name"} column={column} />
    ),
    cell: ({ row }) => getFullNameOfUser(row.original.data.user),
  },
  {
    id: "dept",
    header: ({ column }) => (
      <SortableHeader name="Department" column={column} />
    ),
    cell: ({ row }) => row.original.data.departments?.dpt_name,
  },
  {
    id: "desg",
    header: ({ column }) => (
      <SortableHeader name="Designation" column={column} />
    ),
    cell: ({ row }) => row.original.data.designations?.designation_name,
  },
  {
    id: "read-perms-count",
    header: ({ column }) => (
      <SortableHeader name="Read Permissions" column={column} />
    ),
    cell: ({ row }) => (
      <p>
        {
          row.original.permission.filter((item) =>
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
          row.original.permission.filter((item) =>
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
          row.original.permission.filter((item) =>
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
    id: "edit-action",
    cell: ({ row }) =>
      !row.original.updateAccess ? null : (
        <UserEditDialog
          permissions={row.original.permissions}
          asIcon
          data={{
            ...row.original.data.user,
            access_permissions: row.original.permission,
          }}
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
