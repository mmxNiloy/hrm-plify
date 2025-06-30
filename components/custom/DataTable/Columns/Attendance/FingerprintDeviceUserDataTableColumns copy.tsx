"use client";

import { SortableHeader } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import {
  IFingerprintDevice,
  IFingerprintDeviceEmployee,
} from "@/app/(server)/actions/fingerprint/figerprint-device.schema";
import FingerprintDeviceDeleteAlertDialog from "@/app/(pages)/dashboard/company/[companyId]/attendance/device/fingerprint-device-delete-alert-dialog";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { getFullNameOfEmployee } from "@/utils/Misc";
import UserDeleteAlertDialog from "@/app/(pages)/dashboard/company/[companyId]/attendance/device/[serialNum]/user-delete-alert-dialog";

interface Props extends IFingerprintDeviceEmployee {
  updateAccess?: boolean;
}

export const FingerprintDeviceUserDataTableColumns: ColumnDef<Props>[] = [
  {
    id: "Serial Num",
    accessorKey: "serialNum",
    header: ({ column }) => (
      <SortableHeader column={column} name="Device Serial Number" />
    ),
  },
  {
    id: "Device User ID",
    accessorKey: "internalId",
    header: ({ column }) => (
      <SortableHeader column={column} name="Device User ID" />
    ),
  },
  {
    id: "Employee",
    header: ({ column }) => <SortableHeader column={column} name="Employee" />,
    cell: ({ row }) => getFullNameOfEmployee(row.original.employee),
  },
  {
    id: "Actions",
    accessorKey: "actions",
    header: ({ column }) => <SortableHeader column={column} name="Actions" />,
    cell: ({ row }) =>
      row.original.updateAccess ? (
        <UserDeleteAlertDialog
          serialNum={row.original.serialNum}
          internalId={row.original.internalId}
          employee_id={row.original.employee_id}
        />
      ) : (
        <Button variant={"ghost"} className="text-red-500">
          <Icons.trash />
          Delete
        </Button>
      ),
  },
];
