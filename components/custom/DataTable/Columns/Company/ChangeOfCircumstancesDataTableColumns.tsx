"use client";
import { SortableHeader } from "@/components/ui/data-table";
import { IChangeOfCircumstances } from "@/schema/EmployeeSchema";
import { ColumnDef } from "@tanstack/react-table";
import ChangeOfCircumstancesEditDialog from "../../../Dialog/Company/CahangeOfCircumstacesEditDialog";
import { getFullNameOfUser } from "@/utils/Misc";

export const ChangeOfCircumstancesDataTableColumns: ColumnDef<IChangeOfCircumstances>[] =
  [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "field",
      header: ({ column }) => <SortableHeader name="Field" column={column} />,
      cell: ({ row }) => <>{row.original.changeType}</>,
    },
    {
      accessorKey: "oldValue",
      header: ({ column }) => (
        <SortableHeader name="Old Value" column={column} />
      ),
    },
    {
      accessorKey: "newValue",
      header: ({ column }) => (
        <SortableHeader name="New Value" column={column} />
      ),
    },
    {
      accessorKey: "changedBy",
      header: ({ column }) => (
        <SortableHeader name={"Changed by"} column={column} />
      ),
      cell: ({ row }) => getFullNameOfUser(row.original.changedUser),
    },
    {
      accessorKey: "updated_date",
      header: ({ column }) => <SortableHeader name="Date" column={column} />,
      cell: ({ row }) => (
        <>{new Date(row.original.created_at).toLocaleDateString("en_GB")}</>
      ),
    },
  ];
