"use client";

import { SortableHeader } from "@/components/ui/data-table";
import Icons from "@/components/ui/icons";
import { IOffDaysWithShifts } from "@/schema/RotaSchema";
import { ColumnDef } from "@tanstack/react-table";
import OffDaysEditDialog from "../../../Dialog/Rota/OffDaysEditDialog";

interface Props extends IOffDaysWithShifts {
  updateAccess?: boolean;
}

export const OffDaysDataTableColumns: ColumnDef<Props>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <SortableHeader name="ID" column={column} />,
  },
  {
    id: "shift-name-column",
    header: ({ column }) => (
      <SortableHeader name="Shift Name" column={column} />
    ),
    cell: ({ row }) => row.original.shift.shift_name,
  },
  {
    id: "shift-day-sunday",
    header: ({ column }) => <SortableHeader name="Sunday" column={column} />,
    cell: ({ row }) =>
      row.original.sunday == 0 ? (
        <Icons.cross className="text-red-500" />
      ) : (
        <Icons.check className="text-green-500" />
      ),
  },
  {
    id: "shift-day-monday",
    header: ({ column }) => <SortableHeader name="Monday" column={column} />,
    cell: ({ row }) =>
      row.original.monday == 0 ? (
        <Icons.cross className="text-red-500" />
      ) : (
        <Icons.check className="text-green-500" />
      ),
  },
  {
    id: "shift-day-tuesday",
    header: ({ column }) => <SortableHeader name="Tuesday" column={column} />,
    cell: ({ row }) =>
      row.original.tuesday == 0 ? (
        <Icons.cross className="text-red-500" />
      ) : (
        <Icons.check className="text-green-500" />
      ),
  },
  {
    id: "shift-day-wednesday",
    header: ({ column }) => <SortableHeader name="Wednesday" column={column} />,
    cell: ({ row }) =>
      row.original.wednesday == 0 ? (
        <Icons.cross className="text-red-500" />
      ) : (
        <Icons.check className="text-green-500" />
      ),
  },
  {
    id: "shift-day-thursday",
    header: ({ column }) => <SortableHeader name="Thursday" column={column} />,
    cell: ({ row }) =>
      row.original.thursday == 0 ? (
        <Icons.cross className="text-red-500" />
      ) : (
        <Icons.check className="text-green-500" />
      ),
  },
  {
    id: "shift-day-friday",
    header: ({ column }) => <SortableHeader name="Friday" column={column} />,
    cell: ({ row }) =>
      row.original.friday == 0 ? (
        <Icons.cross className="text-red-500" />
      ) : (
        <Icons.check className="text-green-500" />
      ),
  },
  {
    id: "shift-day-saturday",
    header: ({ column }) => <SortableHeader name="Saturday" column={column} />,
    cell: ({ row }) =>
      row.original.saturday == 0 ? (
        <Icons.cross className="text-red-500" />
      ) : (
        <Icons.check className="text-green-500" />
      ),
  },
  {
    id: "edit-action",
    cell: ({ row }) =>
      !row.original.updateAccess ? null : (
        <OffDaysEditDialog
          shifts={row.original.shifts}
          company_id={row.original.company_id}
          asIcon
          data={row.original}
        />
      ),
  },
];
