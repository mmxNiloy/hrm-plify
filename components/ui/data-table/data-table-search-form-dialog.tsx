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
import { Check, Search, Trash2, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const FormSchema = z.object({
  search_value: z.string().default(""),
});

type FormType = z.infer<typeof FormSchema>;

export default function DataTableSearchFormDialog() {
  const [open, setOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useQueryState(
    "search",
    searchParamsParsers.search.withDefault("").withOptions({
      shallow: true,
      throttleMs: 1000,
    })
  );

  const form = useForm<FormType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      search_value: searchQuery,
    },
  });

  const handleSearchChange = useCallback(
    (values: FormType) => {
      setSearchQuery(values.search_value);
      setOpen(false);
    },
    [setSearchQuery]
  );

  const handleSearchRemove = useCallback(() => {
    setSearchQuery(null);
    setOpen(false);
  }, [setSearchQuery]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className={cn(
            "w-full gap-2 justify-start px-2 [&_svg]:size-4",
            searchQuery.length > 0 && "text-blue-500"
          )}
          size={"sm"}
          variant={"ghost"}
        >
          <Search />
          Search
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Search (Global Filter)</DialogTitle>
          <DialogDescription>Search any value in the table.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSearchChange)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="search_value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Search</FormLabel>
                  <FormControl>
                    <Input placeholder="Search..." {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter a search query here. For example: John Doe
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

              <Button
                size="sm"
                type="button"
                onClick={handleSearchRemove}
                className="gap-1 min-w-28"
                variant={"destructive"}
              >
                <Trash2 />
                Remove
              </Button>

              <span className="hidden sm:block flex-1"></span>

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
