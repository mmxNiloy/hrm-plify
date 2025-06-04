"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  Column,
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
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";
import { IPaginatedResponse } from "@/schema/PaginatedResponse";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  showOptions?: boolean;
  pageSize?: number;
  pageCount?: number;
  loading?: boolean;
  prefix?: string;
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
    <div className="flex flex-col gap-3 sm:gap-4">
      {showOptions && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 overflow-x-scroll">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
            <div className="flex flex-col gap-2 w-full sm:w-auto">
              <Label className="text-sm sm:text-base">Page size</Label>
              <Select
                onValueChange={(val) => {
                  setPagination((prev) => ({
                    ...prev,
                    pageSize: Number.parseInt(val),
                  }));
                }}
              >
                <SelectTrigger className="w-full sm:w-20">
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
            <div className="flex flex-col gap-2 w-full sm:w-auto">
              <Label className="text-sm sm:text-base">Visible Columns</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full sm:w-48 justify-between gap-2 text-sm sm:text-base px-3 sm:px-4"
                  >
                    Visible Columns
                    <Icons.chevronsUpDown className="size-4 sm:size-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-full sm:w-48">
                  {table
                    .getAllColumns()
                    .filter(
                      (column) =>
                        column.getCanHide() && !column.id.includes("action")
                    )
                    .map((column) => (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize text-sm sm:text-base"
                        checked={column.getIsVisible()}
                        onSelect={(e) => e.preventDefault()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
            <div className="flex flex-col gap-2 w-full sm:w-auto">
              <Label
                htmlFor="col-filter-input"
                className="text-sm sm:text-base"
              >
                Column Filter
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full sm:w-48 justify-start gap-2 text-sm sm:text-base px-3 sm:px-4"
                  >
                    <Icons.filter className="size-4 sm:size-5" /> Filters
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[90vw] sm:w-96 max-h-[70vh] p-2">
                  <Accordion
                    type="multiple"
                    defaultValue={columnFilters.map((item) => item.id)}
                    className="overflow-auto"
                  >
                    {table
                      .getAllColumns()
                      .filter((column) => column.getCanHide())
                      .map((item) => (
                        <AccordionItem
                          value={item.id}
                          key={`accordion-${item.id}`}
                        >
                          <AccordionTrigger className="capitalize text-sm sm:text-base">
                            {item.id}
                          </AccordionTrigger>
                          <AccordionContent className="flex flex-col gap-2 px-1 py-2">
                            <Input
                              placeholder={`Filter ${item.id}`}
                              value={
                                (columnFilters.find((f) => f.id === item.id)
                                  ?.value as string) ?? ""
                              }
                              onChange={(e) => {
                                const text = e.target.value;
                                if (text.length < 1) {
                                  setColumnFilters((oldVal) =>
                                    oldVal.filter((f) => f.id !== item.id)
                                  );
                                  return;
                                }
                                const allColumnFilters = [...columnFilters];
                                const filterRef = allColumnFilters.find(
                                  (f) => f.id === item.id
                                );
                                if (filterRef) {
                                  filterRef.value = text;
                                } else {
                                  allColumnFilters.push({
                                    id: item.id,
                                    value: text,
                                  });
                                }
                                setColumnFilters(allColumnFilters);
                              }}
                              className="text-sm sm:text-base"
                            />
                            {columnFilters.find((f) => f.id === item.id) && (
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() =>
                                  setColumnFilters((oldVal) =>
                                    oldVal.filter((f) => f.id !== item.id)
                                  )
                                }
                                className="text-sm sm:text-base px-3 sm:px-4"
                              >
                                <Icons.trash className="size-4 sm:size-5 mr-2" />{" "}
                                Remove
                              </Button>
                            )}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                  </Accordion>
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex flex-col gap-2 w-full sm:w-auto">
              <Label htmlFor="search-input" className="text-sm sm:text-base">
                Global Filter
              </Label>
              <Input
                type="search"
                placeholder="Global Filter..."
                onChange={handleFilterChange}
                className="w-full sm:w-64 text-sm sm:text-base"
              />
            </div>
          </div>
        </div>
      )}

      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader className="bg-site-gradient-lmr">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                className="*:text-white text-sm sm:text-base hover:bg-site-gradient-lmr-light"
                key={headerGroup.id}
              >
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="whitespace-nowrap">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="even:bg-accent text-xs sm:text-sm"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="whitespace-nowrap">
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
                  className="h-24 text-center text-sm sm:text-base"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {showOptions && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 py-3 sm:py-4">
          <p className="text-sm sm:text-base">
            Showing page: {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </p>
          <div className="flex flex-row gap-2 w-full sm:w-auto">
            <Button
              className="w-full sm:w-auto rounded-full gap-2 text-sm sm:text-base px-3 sm:px-4"
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <Icons.chevronLeft className="size-4 sm:size-5" /> Previous
            </Button>
            <Button
              className="w-full sm:w-auto rounded-full gap-2 text-sm sm:text-base px-3 sm:px-4"
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next <Icons.chevronRight className="size-4 sm:size-5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

interface NetworkedDataTableProps<TData, TValue> {
  src: string;
  columns: ColumnDef<TData, TValue>[];
  showOptions?: boolean;
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
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
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
      setTotalPage(1);
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
    <div className="flex flex-col gap-3 sm:gap-4">
      {showOptions && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 overflow-x-scroll">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
            <div className="flex flex-col gap-2 w-full sm:w-auto">
              <Label className="text-sm sm:text-base">Page size</Label>
              <Select
                disabled={loading}
                onValueChange={(val) => {
                  setCurrentPage(1);
                  setPagination((prev) => ({
                    ...prev,
                    pageSize: Number.parseInt(val),
                    pageIndex: 0,
                  }));
                }}
              >
                <SelectTrigger className="w-full sm:w-20">
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
            <div className="flex flex-col gap-2 w-full sm:w-auto">
              <Label className="text-sm sm:text-base">Visible Columns</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    disabled={loading}
                    variant="outline"
                    className="w-full sm:w-48 justify-between gap-2 text-sm sm:text-base px-3 sm:px-4"
                  >
                    Visible Columns
                    <Icons.chevronsUpDown className="size-4 sm:size-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-full sm:w-48">
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize text-sm sm:text-base"
                        checked={column.getIsVisible()}
                        onSelect={(e) => e.preventDefault()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
            <div className="flex flex-col gap-2 w-full sm:w-auto">
              <Label
                htmlFor="col-filter-input"
                className="text-sm sm:text-base"
              >
                Column Filter
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full sm:w-48 justify-start gap-2 text-sm sm:text-base px-3 sm:px-4"
                  >
                    <Icons.filter className="size-4 sm:size-5" /> Filters
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[90vw] sm:w-96 max-h-[70vh] p-2">
                  <Accordion
                    type="multiple"
                    defaultValue={columnFilters.map((item) => item.id)}
                    className="overflow-auto"
                  >
                    {table
                      .getAllColumns()
                      .filter((column) => column.getCanHide())
                      .map((item) => (
                        <AccordionItem
                          value={item.id}
                          key={`accordion-${item.id}`}
                        >
                          <AccordionTrigger className="capitalize text-sm sm:text-base">
                            {item.id}
                          </AccordionTrigger>
                          <AccordionContent className="flex flex-col gap-2 px-1 py-2">
                            <Input
                              placeholder={`Filter ${item.id}`}
                              value={
                                (columnFilters.find((f) => f.id === item.id)
                                  ?.value as string) ?? ""
                              }
                              onChange={(e) => {
                                const text = e.target.value;
                                if (text.length < 1) {
                                  setColumnFilters((oldVal) =>
                                    oldVal.filter((f) => f.id !== item.id)
                                  );
                                  return;
                                }
                                const allColumnFilters = [...columnFilters];
                                const filterRef = allColumnFilters.find(
                                  (f) => f.id === item.id
                                );
                                if (filterRef) {
                                  filterRef.value = text;
                                } else {
                                  allColumnFilters.push({
                                    id: item.id,
                                    value: text,
                                  });
                                }
                                setColumnFilters(allColumnFilters);
                              }}
                              className="text-sm sm:text-base"
                            />
                            {columnFilters.find((f) => f.id === item.id) && (
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() =>
                                  setColumnFilters((oldVal) =>
                                    oldVal.filter((f) => f.id !== item.id)
                                  )
                                }
                                className="text-sm sm:text-base px-3 sm:px-4"
                              >
                                <Icons.trash className="size-4 sm:size-5 mr-2" />{" "}
                                Remove
                              </Button>
                            )}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                  </Accordion>
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex flex-col gap-2 w-full sm:w-auto">
              <Label htmlFor="search-input" className="text-sm sm:text-base">
                Global Filter
              </Label>
              <Input
                type="search"
                placeholder="Global Filter..."
                onChange={handleFilterChange}
                className="w-full sm:w-64 text-sm sm:text-base"
              />
            </div>
          </div>
        </div>
      )}

      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader className="bg-site-gradient-lmr">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                className="*:text-white text-sm sm:text-base hover:bg-site-gradient-lmr-light"
                key={headerGroup.id}
              >
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="whitespace-nowrap">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-sm sm:text-base"
                >
                  <p className="flex flex-row gap-2 items-center justify-center">
                    <Icons.spinner className="animate-spin size-5 sm:size-6 ease-in-out" />
                    Loading...
                  </p>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="even:bg-accent text-xs sm:text-sm"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="whitespace-nowrap">
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
                  className="h-24 text-center text-sm sm:text-base"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {showOptions && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 py-3 sm:py-4">
          <p className="text-sm sm:text-base">
            Showing page: {currentPage} of {totalPage}
          </p>
          <div className="flex flex-row gap-2 w-full sm:w-auto">
            <Button
              className="w-full sm:w-auto rounded-full gap-2 text-sm sm:text-base px-3 sm:px-4"
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((oldVal) => oldVal - 1)}
              disabled={loading || currentPage < 2}
            >
              <Icons.chevronLeft className="size-4 sm:size-5" /> Previous
            </Button>
            <Button
              className="w-full sm:w-auto rounded-full gap-2 text-sm sm:text-base px-3 sm:px-4"
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((oldVal) => oldVal + 1)}
              disabled={loading || currentPage >= totalPage}
            >
              Next <Icons.chevronRight className="size-4 sm:size-5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

interface DataTableSkeletonProps<TValue> {
  columns: ColumnDef<any | undefined, TValue>[];
  showOptions?: boolean;
}



export function StaticDataTable<TData, TValue>({
  columns,
  data,
  showOptions = true,
  pageCount = 1,
  loading = false,
  prefix,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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
        params.set(prefix ? prefix.concat(`_${name}`) : name, value);
      }
      if (names && values) {
        names.forEach((n, i) =>
          params.set(prefix ? prefix.concat(`_${n}`) : n, values.at(i) ?? "")
        );
      }
      return params.toString();
    },
    [prefix, searchParams]
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
          Math.max(
            1,
            Number.parseInt(
              searchParams.get(prefix ? `${prefix}_page` : "page") ?? "1"
            )
          ) - 1,
        pageSize: Math.max(
          5,
          Number.parseInt(
            searchParams.get(prefix ? `${prefix}_limit` : "limit") ?? "5"
          )
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
    <div className="flex flex-col gap-3 sm:gap-4">
      {showOptions && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 overflow-x-scroll">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
            <div className="flex flex-col gap-2 w-full sm:w-auto">
              <Label className="text-sm sm:text-base">Page size</Label>
              <Select
                disabled={loading}
                onValueChange={(val) => {
                  router.replace(
                    `${pathname}?${createQueryString({
                      names: ["limit", "page"],
                      values: [val, "1"],
                    })}`
                  );
                }}
              >
                <SelectTrigger className="w-full sm:w-20">
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
            <div className="flex flex-col gap-2 w-full sm:w-auto">
              <Label className="text-sm sm:text-base">Visible Columns</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    disabled={loading}
                    variant="outline"
                    className="w-full sm:w-48 justify-between gap-2 text-sm sm:text-base px-3 sm:px-4"
                  >
                    Visible Columns
                    <Icons.chevronsUpDown className="size-4 sm:size-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-full sm:w-48">
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize text-sm sm:text-base"
                        checked={column.getIsVisible()}
                        onSelect={(e) => e.preventDefault()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
            <div className="flex flex-col gap-2 w-full sm:w-auto">
              <Label
                htmlFor="col-filter-input"
                className="text-sm sm:text-base"
              >
                Column Filter
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full sm:w-48 justify-start gap-2 text-sm sm:text-base px-3 sm:px-4"
                  >
                    <Icons.filter className="size-4 sm:size-5" /> Filters
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[90vw] sm:w-96 max-h-[70vh] p-2">
                  <Accordion
                    type="multiple"
                    defaultValue={columnFilters.map((item) => item.id)}
                    className="overflow-auto"
                  >
                    {table
                      .getAllColumns()
                      .filter((column) => column.getCanHide())
                      .map((item) => (
                        <AccordionItem
                          value={item.id}
                          key={`accordion-${item.id}`}
                        >
                          <AccordionTrigger className="capitalize text-sm sm:text-base">
                            {item.id}
                          </AccordionTrigger>
                          <AccordionContent className="flex flex-col gap-2 px-1 py-2">
                            <Input
                              placeholder={`Filter ${item.id}`}
                              value={
                                (columnFilters.find((f) => f.id === item.id)
                                  ?.value as string) ?? ""
                              }
                              onChange={(e) => {
                                const text = e.target.value;
                                if (text.length < 1) {
                                  setColumnFilters((oldVal) =>
                                    oldVal.filter((f) => f.id !== item.id)
                                  );
                                  return;
                                }
                                const allColumnFilters = [...columnFilters];
                                const filterRef = allColumnFilters.find(
                                  (f) => f.id === item.id
                                );
                                if (filterRef) {
                                  filterRef.value = text;
                                } else {
                                  allColumnFilters.push({
                                    id: item.id,
                                    value: text,
                                  });
                                }
                                setColumnFilters(allColumnFilters);
                              }}
                              className="text-sm sm:text-base"
                            />
                            {columnFilters.find((f) => f.id === item.id) && (
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() =>
                                  setColumnFilters((oldVal) =>
                                    oldVal.filter((f) => f.id !== item.id)
                                  )
                                }
                                className="text-sm sm:text-base px-3 sm:px-4"
                              >
                                <Icons.trash className="size-4 sm:size-5 mr-2" />{" "}
                                Remove
                              </Button>
                            )}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                  </Accordion>
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex flex-col gap-2 w-full sm:w-auto">
              <Label htmlFor="search-input" className="text-sm sm:text-base">
                Global Filter
              </Label>
              <Input
                type="search"
                placeholder="Global Filter..."
                onChange={handleFilterChange}
                className="w-full sm:w-64 text-sm sm:text-base"
              />
            </div>
          </div>
        </div>
      )}

      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader className="bg-site-gradient-lmr">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                className="*:text-white text-sm sm:text-base hover:bg-site-gradient-lmr-light"
                key={headerGroup.id}
              >
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="whitespace-nowrap">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          {!loading && (
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    className="even:bg-accent text-xs sm:text-sm"
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="whitespace-nowrap">
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
                    className="h-24 text-center text-sm sm:text-base"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
          {loading && (
            <TableBody>
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-sm sm:text-base"
                >
                  <p className="flex flex-row gap-2 items-center justify-center">
                    <Icons.spinner className="animate-spin size-5 sm:size-6 ease-in-out" />
                    Loading...
                  </p>
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </div>

      {showOptions && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 py-3 sm:py-4">
          <p className="text-sm sm:text-base">
            Showing page: {table.getState().pagination.pageIndex + 1} of{" "}
            {Math.max(1, pageCount)}
          </p>
          <div className="flex flex-row gap-2 w-full sm:w-auto">
            <Button
              className="w-full sm:w-auto rounded-full gap-2 text-sm sm:text-base px-3 sm:px-4"
              variant="outline"
              size="sm"
              onClick={() => {
                router.push(
                  `${pathname}?${createQueryString({
                    name: "page",
                    value: `${table.getState().pagination.pageIndex}`,
                  })}`,
                  { scroll: false }
                );
              }}
              disabled={!table.getCanPreviousPage()}
            >
              <Icons.chevronLeft className="size-4 sm:size-5" /> Previous
            </Button>
            <Button
              className="w-full sm:w-auto rounded-full gap-2 text-sm sm:text-base px-3 sm:px-4"
              variant="outline"
              size="sm"
              onClick={() => {
                router.push(
                  `${pathname}?${createQueryString({
                    name: "page",
                    value: `${table.getState().pagination.pageIndex + 2}`,
                  })}`,
                  { scroll: false }
                );
              }}
              disabled={!table.getCanNextPage()}
            >
              Next <Icons.chevronRight className="size-4 sm:size-5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

interface SortableHeaderProps<TData, TValue> {
  column: Column<TData, TValue>;
  name: string;
  title?: string;
}

export function SortableHeader<TData, TValue>({
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
      <span className="text-sm sm:text-base text-white">{name}</span>
      {column.getIsSorted() === "asc" ? (
        <Icons.chevronUp className="size-4 sm:size-5" />
      ) : column.getIsSorted() === "desc" ? (
        <Icons.chevronDown className="size-4 sm:size-5" />
      ) : (
        <Icons.chevronsUpDown className="size-4 sm:size-5" />
      )}
    </div>
  );
}
