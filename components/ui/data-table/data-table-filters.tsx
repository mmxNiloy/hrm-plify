"use client";
import React, { useCallback, useMemo } from "react";
import { Label } from "../label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { Button } from "../button";
import {
  CheckIcon,
  ChevronDown,
  EyeIcon,
  FilterIcon,
  SettingsIcon,
} from "lucide-react";
import { Table } from "@tanstack/react-table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../dialog";
import { useQueryState } from "nuqs";
import { searchParamsParsers } from "@/utils/searchParamsParsers";
import { Input } from "../input";
import DataTableFilterFormDialog from "./data-table-filter-form-dialog";
import DataTableSearchFormDialog from "./data-table-search-form-dialog";

interface Props {
  table: Table<any>;
}

export default function DataTableFilters({ table }: Props) {
  const [filters, setFilters] = useQueryState(
    "filters",
    searchParamsParsers.filters.withDefault("").withOptions({
      shallow: true,
      throttleMs: 1000,
    })
  );

  const filterMap: Map<string, string> = useMemo(() => {
    const hash: Map<string, string> = new Map();

    const entries = filters.split(",");
    entries.forEach((kv) => {
      const [key, val] = kv.split(".");
      hash.set(key, val);
    });

    return hash;
  }, [filters]);

  const handleRemoveFilter = useCallback(
    (id: string) => {
      if (filterMap.has(id)) {
        const entries = filters.split(",");
        const newFilters = entries.filter((item) => {
          const [k, v] = item.split(".");
          if (k === id) return false;
          return true;
        });

        setFilters(newFilters.join());
      }
    },
    [filterMap, filters, setFilters]
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"outline"}
          size={"sm"}
          className="gap-1 [&_svg]:size-4"
        >
          <SettingsIcon />
          Options
          <ChevronDown className="size-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <EyeIcon className="mr-2 size-4" />
            View
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize text-sm sm:text-base"
                  checked={column.getIsVisible()}
                  onSelect={(e) => e.preventDefault()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <FilterIcon className="mr-2 size-4" />
            Filters
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            {table
              .getAllColumns()
              .filter(
                (column) =>
                  column.getCanHide() && !/id|_at|action/i.test(column.id)
              )
              .map((item) => (
                <DropdownMenuSub key={item.id}>
                  <DropdownMenuSubTrigger>
                    {!!filterMap.get(item.id) && (
                      <CheckIcon className="size-4 mr-2" />
                    )}
                    {item.id}
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem asChild>
                      <DataTableFilterFormDialog
                        filterMap={filterMap}
                        data={item}
                      />
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleRemoveFilter(item.id)}
                    >
                      Remove
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuItem asChild>
          <DataTableSearchFormDialog />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    // <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 overflow-x-scroll">
    //           <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">

    //             <div className="flex flex-col gap-2 w-full sm:w-auto">
    //               <Label className="text-sm sm:text-base">Visible Columns</Label>
    //               <DropdownMenu>
    //                 <DropdownMenuTrigger asChild>
    //                   <Button
    //                     disabled={loading}
    //                     variant="outline"
    //                     className="w-full sm:w-48 justify-between gap-2 text-sm sm:text-base px-3 sm:px-4"
    //                   >
    //                     Visible Columns
    //                     <Icons.chevronsUpDown className="size-4 sm:size-5" />
    //                   </Button>
    //                 </DropdownMenuTrigger>
    //                 <DropdownMenuContent align="end" className="w-full sm:w-48">

    //                 </DropdownMenuContent>
    //               </DropdownMenu>
    //             </div>
    //           </div>

    //           <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
    //             <div className="flex flex-col gap-2 w-full sm:w-auto">
    //               <Label
    //                 htmlFor="col-filter-input"
    //                 className="text-sm sm:text-base"
    //               >
    //                 Column Filter
    //               </Label>
    //               <Popover>
    //                 <PopoverTrigger asChild>
    //                   <Button
    //                     variant="outline"
    //                     className="w-full sm:w-48 justify-start gap-2 text-sm sm:text-base px-3 sm:px-4"
    //                   >
    //                     <Icons.filter className="size-4 sm:size-5" /> Filters
    //                   </Button>
    //                 </PopoverTrigger>
    //                 <PopoverContent className="w-[90vw] sm:w-96 max-h-[70vh] p-2">
    //                   <Accordion
    //                     type="multiple"
    //                     defaultValue={columnFilters.map((item) => item.id)}
    //                     className="overflow-auto"
    //                   >
    //                     {table
    //                       .getAllColumns()
    //                       .filter((column) => column.getCanHide())
    //                       .map((item) => (
    //                         <AccordionItem
    //                           value={item.id}
    //                           key={`accordion-${item.id}`}
    //                         >
    //                           <AccordionTrigger className="capitalize text-sm sm:text-base">
    //                             {item.id}
    //                           </AccordionTrigger>
    //                           <AccordionContent className="flex flex-col gap-2 px-1 py-2">
    //                             <Input
    //                               placeholder={`Filter ${item.id}`}
    //                               value={
    //                                 (columnFilters.find((f) => f.id === item.id)
    //                                   ?.value as string) ?? ""
    //                               }
    //                               onChange={(e) => {
    //                                 const text = e.target.value;
    //                                 if (text.length < 1) {
    //                                   setColumnFilters((oldVal) =>
    //                                     oldVal.filter((f) => f.id !== item.id)
    //                                   );
    //                                   return;
    //                                 }
    //                                 const allColumnFilters = [...columnFilters];
    //                                 const filterRef = allColumnFilters.find(
    //                                   (f) => f.id === item.id
    //                                 );
    //                                 if (filterRef) {
    //                                   filterRef.value = text;
    //                                 } else {
    //                                   allColumnFilters.push({
    //                                     id: item.id,
    //                                     value: text,
    //                                   });
    //                                 }
    //                                 setColumnFilters(allColumnFilters);
    //                               }}
    //                               className="text-sm sm:text-base"
    //                             />
    //                             {columnFilters.find((f) => f.id === item.id) && (
    //                               <Button
    //                                 size="sm"
    //                                 variant="destructive"
    //                                 onClick={() =>
    //                                   setColumnFilters((oldVal) =>
    //                                     oldVal.filter((f) => f.id !== item.id)
    //                                   )
    //                                 }
    //                                 className="text-sm sm:text-base px-3 sm:px-4"
    //                               >
    //                                 <Icons.trash className="size-4 sm:size-5 mr-2" />{" "}
    //                                 Remove
    //                               </Button>
    //                             )}
    //                           </AccordionContent>
    //                         </AccordionItem>
    //                       ))}
    //                   </Accordion>
    //                 </PopoverContent>
    //               </Popover>
    //             </div>

    //             <div className="flex flex-col gap-2 w-full sm:w-auto">
    //               <Label htmlFor="search-input" className="text-sm sm:text-base">
    //                 Global Filter
    //               </Label>
    //               <Input
    //                 type="search"
    //                 placeholder="Global Filter..."
    //                 onChange={handleFilterChange}
    //                 className="w-full sm:w-64 text-sm sm:text-base"
    //               />
    //             </div>
    //           </div>
    //         </div>
  );
}
