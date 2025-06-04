"use client";

import { Column } from "@tanstack/react-table";
import React, { useCallback, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../dialog";
import { Button } from "../button";
import { Input } from "../input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryState } from "nuqs";
import { searchParamsParsers } from "@/utils/searchParamsParsers";
import { Check, XIcon } from "lucide-react";

const FormSchema = z.object({
  filter_value: z.string().default(""),
});

type FormType = z.infer<typeof FormSchema>;

export default function DataTableFilterFormDialog({
  data,
  filterMap,
}: {
  data: Column<any, unknown>;
  filterMap: Map<string, string>;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [filters, setFilters] = useQueryState(
    "filters",
    searchParamsParsers.filters.withDefault("").withOptions({
      shallow: true,
      throttleMs: 1000,
    })
  );

  const form = useForm<FormType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      filter_value: filterMap.get(data.id) ?? "",
    },
  });

  const handleFilterChange = useCallback(
    (formValues: FormType) => {
      const id = data.id;
      const value = formValues.filter_value;

      const entries = filters.split(",");
      const arr = entries.map((kv) => kv.split("."));
      const newFilterArr = arr
        .map(([k, v]) => {
          if (k === id) return [id, value].join(".");
          return [k, v].join(".");
        })
        .filter((item) => item !== ".");

      if (!filterMap.has(id)) {
        newFilterArr.push([id, value].join("."));
      }

      setFilters(newFilterArr.join());
      setOpen(false);
    },
    [data.id, filterMap, filters, setFilters]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="w-full justify-start px-2"
          size={"sm"}
          variant={"ghost"}
        >
          Apply
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Apply Filter</DialogTitle>
          <DialogDescription>
            Apply filter for column: {data.id}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFilterChange)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="filter_value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Filter Value</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter filter value" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter a form description here. For example: Manager
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="sm"
                className="gap-1 min-w-28 bg-green-500 hover:bg-green-400 text-white"
              >
                <Check />
                Apply
              </Button>

              <DialogClose asChild>
                <Button
                  size="sm"
                  type="button"
                  className="gap-1 min-w-28"
                  variant={"destructive"}
                >
                  <XIcon />
                  Cancel
                </Button>
              </DialogClose>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
