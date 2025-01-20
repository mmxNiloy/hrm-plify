"use client";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Icons from "@/components/ui/icons";
import { IEmployeeWithPersonalInfo } from "@/schema/EmployeeSchema";
import React, { useCallback, useState } from "react";

export default function TaskSearch() {
  const [open, setOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [employees, setEmployees] = useState<IEmployeeWithPersonalInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearchChange = useCallback((e: string) => {
    setSearchTerm(e);
  }, []);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="w-full flex-1 md:w-auto md:flex-none">
        <Button
          variant={"outline"}
          size={"sm"}
          className="inline-flex items-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground px-4 py-2 relative h-8 w-full rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none md:w-40 lg:w-64 justify-between"
        >
          <span className="hidden lg:inline-flex">Search Employee...</span>
          <span className="inline-flex lg:hidden">Search...</span>
          <Icons.search />
        </Button>
      </DialogTrigger>

      <DialogContent
        onInteractOutside={(e) => {
          if (loading) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
        className="sm:max-w-[425px] md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl"
      >
        <DialogHeader>
          <DialogTitle>Search Tasks by Employee</DialogTitle>
        </DialogHeader>

        <Command className="rounded-lg border shadow-md" shouldFilter={false}>
          <CommandInput
            defaultValue={searchTerm}
            onValueChange={handleSearchChange}
            placeholder="Search products..."
          />

          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>

            <CommandGroup>
              {employees.map((employee) => (
                <CommandItem
                  key={`prod-res-${employee.employee_id}`}
                  value={employee.employee_id.toString()}
                >
                  {employee.users.first_name} {employee.users.last_name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>

        <DialogFooter>
          <Button
            disabled={searchTerm.length < 3}
            type="submit"
            size={"sm"}
            className="w-full gap-1 items-center"
            // onClick={() => {
            //   setOpen(false);
            //   router.push(`/store/search?q=${searchTerm}`);
            // }}
          >
            <Icons.search />
            Search
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
