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
  GlobalFilterTableState,
  SortingState,
  useReactTable,
  VisibilityState,
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
import { ChangeEvent, useCallback, useEffect, useState } from "react";
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
import { useDebouncedCallback } from "use-debounce";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IPaginatedResponse } from "@/schema/PaginatedResponse";
import { Skeleton } from "./skeleton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  showOptions?: boolean;
  pageSize?: number;
  pageCount?: number;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  showOptions = true,
  pageSize = 5,
  pageCount = 1,
}: DataTableProps<TData, TValue>) {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: pageSize,
  });

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

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
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      pagination,
      sorting,
      columnFilters,
      globalFilter,
      columnVisibility,
      rowSelection,
    },
  });

  const handleFilterChange = useDebouncedCallback(
    useCallback(
      (e: ChangeEvent<HTMLInputElement>) => setGlobalFilter(e.target.value),
      []
    ),
    300
  );

  return (
    <div className="flex flex-col gap-4">
      {showOptions && (
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <div className="flex flex-col gap-2">
              <Label>Page size</Label>
              <Select
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
              <Label>Visible Columns</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="items-center gap-4 justify-between"
                  >
                    Visible Columns
                    <Icons.chevronsUpDown className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) =>
                            column.toggleVisibility(!!value)
                          }
                        >
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      );
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="search-input">Search</Label>
            <Input
              type="search"
              placeholder="Search..."
              onChange={handleFilterChange}
            />
          </div>
        </div>
      )}
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
      {showOptions && (
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
      )}
    </div>
  );
}

export function SortableHeader<TData, TValue>({
  name,
  column,
  title,
  hasOverflow,
}: {
  name: string;
  column: Column<TData, TValue>;
  hasOverflow?: boolean;
  title?: string;
}) {
  const sortState = column.getIsSorted();
  return (
    <Button
      title={title}
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
      {hasOverflow && <Icons.help className="ml-4 size-4" />}
    </Button>
  );
}

interface NetworkedDataTableProps<TData, TValue>
  extends Omit<DataTableProps<TData, TValue>, "data"> {
  src: string;
  skeleton?: React.JSX.Element;
}

interface IPaginatedTableData<T> extends IPaginatedResponse {
  data: T[];
}

export function NetworkedDataTable<TData, TValue>({
  src,
  columns,
  showOptions = true,
}: NetworkedDataTableProps<TData, TValue>) {
  const [data, setData] = useState<TData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const [totalPage, setTotalPage] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

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
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      pagination,
      sorting,
      columnFilters,
      globalFilter,
      columnVisibility,
      rowSelection,
    },
  });

  const getData = useCallback(async () => {
    setLoading(true);

    try {
      const apiRes = await fetch(
        `${src}${src.includes("?") ? "&" : "?"}page=${currentPage}&limit=${
          pagination.pageSize
        }`
      );
      if (apiRes.ok) {
        const resData = (await apiRes.json()) as IPaginatedTableData<TData>;
        setData(resData.data);
        setTotalPage(resData.total_page);
      } else {
        setData([]);
        setTotalPage(1);
      }
    } catch (_) {
      setData([]);
      setTotalPage;
    }

    setLoading(false);
  }, [currentPage, pagination.pageSize, src]);

  const handleFilterChange = useDebouncedCallback(
    useCallback(
      (e: ChangeEvent<HTMLInputElement>) => setGlobalFilter(e.target.value),
      []
    ),
    300
  );

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="flex flex-col gap-4">
      {showOptions && (
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <div className="flex flex-col gap-2">
              <Label>Page size</Label>
              <Select
                disabled={loading}
                onValueChange={(val) => {
                  setCurrentPage(1);
                  const mPagination = { ...pagination };
                  mPagination.pageSize = Number.parseInt(val);
                  mPagination.pageIndex = 1;
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
              <Label>Visible Columns</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    disabled={loading}
                    variant="outline"
                    className="items-center gap-4 justify-between"
                  >
                    Visible Columns
                    <Icons.chevronsUpDown className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) =>
                            column.toggleVisibility(!!value)
                          }
                        >
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      );
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="search-input">Search</Label>
            <Input
              disabled={loading}
              type="search"
              placeholder="Search..."
              onChange={handleFilterChange}
            />
          </div>
        </div>
      )}
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
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24">
                  <p className="w-full h-full flex flex-row gap-2 items-center justify-center">
                    <Icons.spinner className="animate-spin ease-in-out" />
                    Loading...
                  </p>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
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
      {showOptions && (
        <div className="flex items-center justify-between space-x-2 py-4">
          <p className="text-sm">
            Showing page: {currentPage} of {totalPage}
          </p>
          <div className="flex flex-row gap-2">
            <Button
              className="rounded-full gap-2"
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((oldVal) => oldVal - 1)}
              disabled={loading || currentPage < 2}
            >
              <Icons.chevronLeft /> Previous
            </Button>
            <Button
              className="rounded-full gap-2"
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((oldVal) => oldVal + 1)}
              disabled={loading || currentPage >= totalPage}
            >
              Next <Icons.chevronRight />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export function DataTableSkeleton<TValue>({
  columns,
  showOptions,
}: {
  columns: ColumnDef<any | undefined, TValue>[];
  showOptions?: boolean;
}) {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      pagination,
      sorting,
      columnFilters,
      globalFilter,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="flex flex-col gap-4">
      {showOptions && (
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <div className="flex flex-col gap-2">
              <Label>Page size</Label>
              <Select disabled>
                <SelectTrigger className="w-16">
                  <SelectValue placeholder={5} />
                </SelectTrigger>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Visible Columns</Label>
              <Button
                disabled
                variant="outline"
                className="items-center gap-4 justify-between"
              >
                Visible Columns
                <Icons.chevronsUpDown className="size-4" />
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="search-input">Search</Label>
            <Input type="search" placeholder="Search..." disabled />
          </div>
        </div>
      )}
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
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24">
                <p className="w-full h-full flex flex-row gap-2 items-center justify-center">
                  <Icons.spinner className="animate-spin ease-in-out" />
                  Loading...
                </p>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      {showOptions && (
        <div className="flex items-center justify-between space-x-2 py-4">
          <p className="text-sm">Showing page: 1 of 1</p>
          <div className="flex flex-row gap-2">
            <Button
              className="rounded-full gap-2"
              variant="outline"
              size="sm"
              disabled
            >
              <Icons.chevronLeft /> Previous
            </Button>
            <Button
              className="rounded-full gap-2"
              variant="outline"
              size="sm"
              disabled
            >
              Next <Icons.chevronRight />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

/// Server Side Data table, uses query params to paginate
export function StaticDataTable<TData, TValue>({
  columns,
  data,
  showOptions = true,
  pageCount = 1,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();

  // update search params
  const createQueryString = useCallback(
    ({
      name,
      value,
      names,
      values,
    }: {
      name?: string;
      value?: string;
      names?: [string, ...string[]];
      values?: [string, ...string[]];
    }) => {
      const params = new URLSearchParams(searchParams.toString());
      if (name && value) {
        params.set(name, value);
      }

      if (names && values) {
        names.forEach((n, i) => params.set(n, values.at(i) ?? ""));
      }

      return params.toString();
    },
    [searchParams]
  );

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    pageCount,
    manualPagination: true,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      pagination: {
        pageIndex:
          Math.max(1, Number.parseInt(searchParams.get("page") ?? "1")) - 1,
        pageSize: Math.max(
          5,
          Number.parseInt(searchParams.get("limit") ?? "5")
        ),
      },
      sorting,
      columnFilters,
      globalFilter,
      columnVisibility,
      rowSelection,
    },
  });

  const handleFilterChange = useDebouncedCallback(
    useCallback(
      (e: ChangeEvent<HTMLInputElement>) => setGlobalFilter(e.target.value),
      []
    ),
    300
  );

  return (
    <div className="flex flex-col gap-4">
      {showOptions && (
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <div className="flex flex-col gap-2">
              <Label>Page size</Label>
              <Select
                onValueChange={(val) => {
                  router.replace(
                    `${pathname}?${createQueryString({
                      names: ["limit", "page"],
                      values: [val, "1"],
                    })}`
                  );
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
              <Label>Visible Columns</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="items-center gap-4 justify-between"
                  >
                    Visible Columns
                    <Icons.chevronsUpDown className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) =>
                            column.toggleVisibility(!!value)
                          }
                        >
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      );
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="search-input">Search</Label>
            <Input
              type="search"
              placeholder="Search..."
              onChange={handleFilterChange}
            />
          </div>
        </div>
      )}
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
      {showOptions && (
        <div className="flex items-center justify-between space-x-2 py-4">
          <p className="text-sm">
            Showing page: {table.getState().pagination.pageIndex + 1} of{" "}
            {pageCount}
          </p>
          <div className="flex flex-row gap-2">
            <Button
              className="rounded-full gap-2"
              variant="outline"
              size="sm"
              onClick={() => {
                router.push(
                  `${pathname}?${createQueryString({
                    name: "page",
                    value: `${table.getState().pagination.pageIndex}`,
                  })}`
                );
              }}
              disabled={!table.getCanPreviousPage()}
            >
              <Icons.chevronLeft /> Previous
            </Button>
            <Button
              className="rounded-full gap-2"
              variant="outline"
              size="sm"
              onClick={() => {
                router.push(
                  `${pathname}?${createQueryString({
                    name: "page",
                    value: `${table.getState().pagination.pageIndex + 2}`,
                  })}`
                );
              }}
              disabled={!table.getCanNextPage()}
            >
              Next <Icons.chevronRight />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
