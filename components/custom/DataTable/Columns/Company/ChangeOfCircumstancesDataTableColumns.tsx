"use client";
import { SortableHeader } from "@/components/ui/data-table";
import { IChangeOfCircumstances } from "@/schema/EmployeeSchema";
import { ColumnDef } from "@tanstack/react-table";
import { getFullNameOfUser, makeVarNameHumanReadable } from "@/utils/Misc";

export const ChangeOfCircumstancesDataTableColumns: ColumnDef<IChangeOfCircumstances>[] =
  [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "changeType",
      header: ({ column }) => (
        <SortableHeader name="Change Type" column={column} />
      ),
      cell: ({ row }) => (
        <>{makeVarNameHumanReadable(row.original.changeType)}</>
      ),
    },
    {
      accessorKey: "old_value",
      header: ({ column }) => (
        <SortableHeader name="Old Value" column={column} />
      ),
    },
    {
      accessorKey: "new_value",
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
        <>{new Date(row.original.created_at).toLocaleDateString("en-GB")}</>
      ),
    },
  ];
