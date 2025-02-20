"use client";
import { getCompanies } from "@/app/(server)/actions/getCompanies";
import { searchCompanies } from "@/app/(server)/actions/searchCompanies";
import { AvatarPicker } from "@/components/ui/avatar-picker";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import Icons from "@/components/ui/icons";
import { useToast } from "@/components/ui/use-toast";
import { ICompany } from "@/schema/CompanySchema";
import { ButtonBlue } from "@/styles/button.tailwind";
import { stringToColor } from "@/utils/Misc";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import TextCapsule from "../../TextCapsule";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import AvatarNamePlaceholder from "../../AvatarNamePlaceholder";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SiteConfig from "@/utils/SiteConfig";

export default function CompanySearchCommand() {
  const [loading, setLoading] = useState<boolean>(false);
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const router = useRouter();
  const [history, setHistory] = useState<string[]>([]); // Max capacity: 10
  const [searchBarValue, setSearchBarValue] = useState<string>("");

  const { toast } = useToast();

  const loadInitialData = useCallback(async () => {
    setLoading(true);

    const result = await getCompanies({ page: 1, limit: 10 });
    if (result.error) {
      toast({
        title: "Failed to get initial data",
        variant: "destructive",
      });

      setCompanies([]);
    } else {
      setCompanies(result.data.data);
    }

    setLoading(false);
  }, [toast]);

  const resetSearch = useCallback(() => {
    setSearchBarValue("");
    loadInitialData();
  }, [loadInitialData]);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  const handleSearchChange = useDebouncedCallback(
    useCallback(
      async (query: string) => {
        if (query.length < 3) return;
        // Handle search history here
        const sHistory = [...history];
        if (sHistory.find((item) => item === query) === undefined) {
          if (sHistory.length >= 10) {
            sHistory.shift();
          }
          sHistory.push(query);
          setHistory(sHistory);
        }

        setLoading(true);
        const result = await searchCompanies({ companyName: query });

        if (result.error) {
          setCompanies([]);
        } else {
          setCompanies(result.data);
        }

        setLoading(false);
      },
      [history]
    ),
    300
  );

  return (
    <Command className="rounded-lg border shadow-md" shouldFilter={false}>
      <div className="relative flex items-center">
        <CommandInput
          placeholder={"Select a company or search..."}
          onValueChange={(query) => {
            handleSearchChange(query);
            setSearchBarValue(query);
          }}
          value={searchBarValue}
          disabled={loading}
          wrapperClassName="flex-grow"
          className="flex-grow pr-10"
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              disabled={loading}
              size={"icon"}
              variant={"ghost"}
              className="absolute right-0"
            >
              <div className="relative">
                <Icons.menu />
                {history.length > 0 && (
                  <span className="absolute size-2 bg-red-400 rounded-full top-0 right-0" />
                )}
              </div>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Options</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="gap-1"
                disabled={loading}
                onClick={resetSearch}
              >
                <Icons.reset /> Reset
              </DropdownMenuItem>
              <Drawer direction="right">
                <DrawerTrigger asChild>
                  <DropdownMenuItem className="gap-1" disabled={loading}>
                    <div className="relative">
                      <Icons.history />
                      {history.length > 0 && (
                        <span className="absolute size-2 bg-red-400 rounded-full top-0 right-0" />
                      )}
                    </div>{" "}
                    Search History
                  </DropdownMenuItem>
                </DrawerTrigger>

                <DrawerContent className="h-screen top-0 right-0 left-auto mt-0 w-[500px] rounded-none">
                  <div className="flex flex-col gap-2 px-4">
                    <DrawerHeader>
                      <DrawerTitle>Search History</DrawerTitle>
                      <DrawerDescription>
                        These are the latest 10 searches by you in this session.
                      </DrawerDescription>
                    </DrawerHeader>

                    <Separator />

                    {history.length > 0 ? (
                      <>
                        {history.reverse().map((item, index) => (
                          <DrawerClose
                            asChild
                            key={`search-history-item-${index}`}
                          >
                            <Button
                              disabled={loading}
                              variant={"ghost"}
                              size={"sm"}
                              className="gap-2 justify-start"
                              onClick={() => {
                                handleSearchChange(item);
                                setSearchBarValue(item);
                              }}
                            >
                              <Icons.history />
                              <p>{item}</p>
                            </Button>
                          </DrawerClose>
                        ))}
                      </>
                    ) : (
                      <div className="flex-grow flex flex-col gap-2 w-full items-center justify-center">
                        <Icons.rabbit className="size-32" />
                        No search history...
                      </div>
                    )}
                  </div>
                </DrawerContent>
              </Drawer>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <CommandList className="max-h-fit">
        <CommandEmpty>No companies found.</CommandEmpty>
        {loading ? (
          <CommandGroup heading="Companies">
            <CommandItem className="flex flex-col gap-2 items-center justify-center min-h-64 text-xl">
              <Icons.spinner className="animate-spin size-8 ease-in-out" />
              Loading...
            </CommandItem>
          </CommandGroup>
        ) : (
          <CommandGroup heading="Companies">
            <div className="grid grid-cols-2 2xl:grid-cols-3 gap-4">
              {companies.map((comp) => (
                <Link
                  className="cursor-pointer col-span-1"
                  href={`/dashboard/company/${comp.company_id}/`}
                  passHref
                  key={`company-id-${comp.company_id}`}
                >
                  <CommandItem className="cursor-pointer">
                    <div className="w-full px-8 py-4 rounded-md drop-shadow border flex gap-2 items-center justify-between">
                      <div className="flex gap-4">
                        <div className="flex flex-col gap-4 items-center justify-center">
                          <AvatarPicker
                            readOnly
                            src={comp.logo}
                            skeleton={
                              <AvatarNamePlaceholder name={comp.company_name} />
                            }
                            className="size-16 p-0"
                          />
                          <Link
                            href={`${comp.website}?_ref=${
                              SiteConfig.siteName
                            }HRMS&_clickId=${
                              SiteConfig.siteName
                            }-${Date.now()}`}
                            target="_blank"
                            className="hover:underline"
                            passHref
                          >
                            <TextCapsule className="text-xs bg-sky-500 hover:bg-sky-400">
                              <Icons.externalLink />
                              Visit
                            </TextCapsule>
                          </Link>
                        </div>
                        <div className="flex flex-col gap-2">
                          <p className="font-semibold text-xl">
                            {comp.company_name}
                          </p>

                          <div className="flex flex-col gap-2 *:text-xs">
                            <TextCapsule className="bg-blue-500">
                              <Icons.building className="size-3" />
                              {comp.headquarters}
                            </TextCapsule>

                            <TextCapsule className="bg-orange-500">
                              <Icons.factory className="size-3" />
                              {comp.industry}
                            </TextCapsule>
                            <TextCapsule
                              className={comp.is_active ? "bg-green-500" : ""}
                            >
                              {comp.is_active ? "Active" : "Inactive"}
                            </TextCapsule>
                          </div>
                        </div>
                      </div>

                      {/* <Button className={ButtonBlue}>
                      Select
                      <Icons.chevronRight />
                    </Button> */}
                    </div>
                  </CommandItem>
                </Link>
              ))}
            </div>
          </CommandGroup>
        )}
      </CommandList>
    </Command>
  );
}
