"use client";

import { SortableHeader } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { IFingerprintDevice } from "@/app/(server)/actions/fingerprint/figerprint-device.schema";
import FingerprintDeviceDeleteAlertDialog from "@/app/(pages)/dashboard/company/[companyId]/attendance/device/fingerprint-device-delete-alert-dialog";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import Link from "next/link";

interface Props extends IFingerprintDevice {
  updateAccess?: boolean;
}

export const FingerprintDeviceDataTableColumns: ColumnDef<Props>[] = [
  {
    id: "Serial Num",
    accessorKey: "serialNum",
    header: ({ column }) => (
      <SortableHeader column={column} name="Serial Number" />
    ),
  },
  {
    id: "Last Modified",
    accessorKey: "updated_at",
    header: ({ column }) => (
      <SortableHeader column={column} name="Last Modified" />
    ),
    cell: ({ row }) =>
      row.original.updated_at
        ? new Date(row.original.updated_at).toLocaleDateString("en-GB")
        : "N/A",
  },
  {
    id: "Actions",
    accessorKey: "actions",
    header: ({ column }) => <SortableHeader column={column} name="Actions" />,
    cell: ({ row }) => (
      <div className="flex gap-2 items-center">
        <Link passHref href={`./device/${row.original.serialNum}`}>
          <Button variant={"ghost"}>
            <Icons.externalLink /> View Users
          </Button>
        </Link>

        {row.original.updateAccess ? (
          <FingerprintDeviceDeleteAlertDialog
            serialNum={row.original.serialNum}
          />
        ) : (
          <Button variant={"ghost"} className="text-red-500">
            <Icons.trash />
            Delete
          </Button>
        )}
      </div>
    ),
  },
];
