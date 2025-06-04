import { Column } from "@tanstack/react-table";
import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react";
import React from "react";

interface SortableHeaderProps<TData, TValue> {
  column: Column<TData, TValue>;
  name: string;
  title?: string;
}

export default function SortableHeader<TData, TValue>({
  column,
  name,
  title,
}: SortableHeaderProps<TData, TValue>) {
  return (
    <div
      title={title}
      className="flex items-center gap-2 cursor-pointer select-none whitespace-nowrap"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      <span className="text-sm text-white">{name}</span>
      {column.getIsSorted() === "asc" ? (
        <ChevronUp className="size-4" />
      ) : column.getIsSorted() === "desc" ? (
        <ChevronDown className="size-4" />
      ) : (
        <ChevronsUpDown className="size-4" />
      )}
    </div>
  );
}
