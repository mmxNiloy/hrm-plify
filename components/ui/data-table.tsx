"use client";

import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./button";
import Icons from "./icons";
import { useState } from "react";
import { Label } from "./label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Input } from "./input";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      pagination,
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <Label>Page size</Label>
          <Select
            defaultValue={pagination.pageSize.toString()}
            onValueChange={(val) => {
              const mPagination = { ...pagination };
              mPagination.pageSize = Number.parseInt(val);
              setPagination(mPagination);
            }}
          >
            <SelectTrigger className="w-16">
              <SelectValue placeholder={5} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="search-input">Search</Label>
          <Input type="search" placeholder="Search..." />
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-blue-500">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                className="*:text-white text-sm hover:bg-blue-500"
                key={headerGroup.id}
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="even:bg-accent text-xs"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <p className="text-sm">
          Showing page: {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </p>
        <div className="flex flex-row gap-2">
          <Button
            className="rounded-full gap-2"
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <Icons.chevronLeft /> Previous
          </Button>
          <Button
            className="rounded-full gap-2"
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next <Icons.chevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}

export function SortableHeader<TData, TValue>({
  name,
  column,
}: {
  name: string;
  column: Column<TData, TValue>;
}) {
  const sortState = column.getIsSorted();
  return (
    <Button
      className="gap-1 hover:bg-transparent text-xs p-0"
      variant={"ghost"}
      onClick={() => {
        if (sortState) {
          if (sortState === "desc") {
            column.clearSorting();
          } else column.toggleSorting();
        } else {
          column.toggleSorting();
        }
      }}
    >
      {name}
      {sortState ? (
        sortState === "asc" ? (
          <Icons.arrowUp className="size-4" />
        ) : (
          <Icons.arrowDown className="size-4" />
        )
      ) : (
        <Icons.arrowUpDown className="size-4" />
      )}
    </Button>
  );
}
