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
import { ButtonGradient } from "@/styles/button.tailwind";
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
import { shortenText } from "@/utils/Text";
import { cn } from "@/lib/utils";

export default function CompanySearchCommand() {
  const [loading, setLoading] = useState<boolean>(false);
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const router = useRouter();
  const [history, setHistory] = useState<string[]>([]);
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
        const sHistory = [...history];
        if (sHistory.find((item) => item === query) === undefined) {
          if (sHistory.length >= 10) sHistory.shift();
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
    <Command className="rounded-lg border shadow-md">
      <div className="relative flex items-center">
        <CommandInput
          placeholder="Select a company or search..."
          onValueChange={(query) => {
            handleSearchChange(query);
            setSearchBarValue(query);
          }}
          value={searchBarValue}
          disabled={loading}
          wrapperClassName="flex-grow"
          className="text-sm sm:text-base pr-10 sm:pr-12"
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              disabled={loading}
              size="icon"
              variant="ghost"
              className="absolute right-0 h-8 w-8 sm:h-10 sm:w-10"
            >
              <div className="relative">
                <Icons.menu className="size-4 sm:size-5" />
                {history.length > 0 && (
                  <span className="absolute size-2 bg-red-400 rounded-full top-0 right-0" />
                )}
              </div>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-48 sm:w-56">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-sm sm:text-base">
                Options
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="gap-2 text-sm sm:text-base"
                disabled={loading}
                onClick={resetSearch}
              >
                <Icons.reset className="size-4 sm:size-5" /> Reset
              </DropdownMenuItem>
              <Drawer direction="right">
                <DrawerTrigger asChild>
                  <DropdownMenuItem
                    className="gap-2 text-sm sm:text-base"
                    disabled={loading}
                  >
                    <div className="relative">
                      <Icons.history className="size-4 sm:size-5" />
                      {history.length > 0 && (
                        <span className="absolute size-2 bg-red-400 rounded-full top-0 right-0" />
                      )}
                    </div>
                    Search History
                  </DropdownMenuItem>
                </DrawerTrigger>

                <DrawerContent className="h-screen top-0 right-0 left-auto mt-0 w-[85vw] sm:w-[400px] max-w-md rounded-none">
                  <div className="flex flex-col gap-2 px-4 py-2">
                    <DrawerHeader>
                      <DrawerTitle className="text-lg sm:text-xl">
                        Search History
                      </DrawerTitle>
                      <DrawerDescription className="text-sm sm:text-base">
                        Latest 10 searches in this session.
                      </DrawerDescription>
                    </DrawerHeader>

                    <Separator />

                    {history.length > 0 ? (
                      <div className="flex flex-col gap-1">
                        {history.reverse().map((item, index) => (
                          <DrawerClose
                            asChild
                            key={`search-history-item-${index}`}
                          >
                            <Button
                              disabled={loading}
                              variant="ghost"
                              size="sm"
                              className="gap-2 justify-start text-sm sm:text-base px-3 sm:px-4"
                              onClick={() => {
                                handleSearchChange(item);
                                setSearchBarValue(item);
                              }}
                            >
                              <Icons.history className="size-4 sm:size-5" />
                              <p>{shortenText(item, 25)}</p>
                            </Button>
                          </DrawerClose>
                        ))}
                      </div>
                    ) : (
                      <div className="flex-grow flex flex-col gap-2 items-center justify-center min-h-[50vh]">
                        <Icons.rabbit className="size-20 sm:size-24" />
                        <p className="text-sm sm:text-base">
                          No search history...
                        </p>
                      </div>
                    )}
                  </div>
                </DrawerContent>
              </Drawer>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <CommandList className="max-h-[60vh] sm:max-h-[70vh] overflow-auto">
        <CommandEmpty className="py-4 text-sm sm:text-base">
          No companies found.
        </CommandEmpty>
        {loading ? (
          <CommandGroup heading="Companies">
            <CommandItem className="flex flex-col gap-2 items-center justify-center min-h-48 sm:min-h-64 text-base sm:text-xl">
              <Icons.spinner className="animate-spin size-6 sm:size-8 ease-in-out" />
              Loading...
            </CommandItem>
          </CommandGroup>
        ) : (
          <CommandGroup heading="Companies" className="text-sm sm:text-base">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 p-2 sm:p-4">
              {companies.map((comp) => (
                <Link
                  className="cursor-pointer col-span-1"
                  href={`/dashboard/company/${comp.company_id}/`}
                  passHref
                  key={`company-id-${comp.company_id}`}
                >
                  <CommandItem
                    className="cursor-pointer"
                    title={comp.company_name}
                  >
                    <div className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-md drop-shadow border flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center justify-between">
                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
                        <div className="flex flex-col gap-3 sm:gap-4 items-center justify-center shrink-0">
                          <AvatarPicker
                            readOnly
                            src={comp.logo}
                            skeleton={
                              <AvatarNamePlaceholder name={comp.company_name} />
                            }
                            className="size-12 sm:size-14 p-0"
                          />
                          <Link
                            href={`${comp.website}?_ref=${
                              SiteConfig.siteName
                            }HRMS&_clickId=${
                              SiteConfig.siteName
                            }-${Date.now()}`}
                            target="_blank"
                            className="hover:underline w-full"
                            passHref
                          >
                            <TextCapsule className="text-xs sm:text-sm bg-sky-500 hover:bg-sky-400 w-full justify-center">
                              <Icons.externalLink className="size-3 sm:size-4" />
                              Visit
                            </TextCapsule>
                          </Link>
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                          <p className="font-semibold text-base sm:text-lg">
                            {shortenText(comp.company_name, 18)}
                          </p>
                          <div className="flex flex-col gap-1 sm:gap-2 *:text-xs sm:*:text-sm">
                            <TextCapsule className="bg-blue-600">
                              <Icons.building className="size-3 sm:size-4" />
                              {shortenText(comp.headquarters, 20)}
                            </TextCapsule>
                            <TextCapsule className="bg-purple-600">
                              <Icons.factory className="size-3 sm:size-4" />
                              {shortenText(comp.industry, 20)}
                            </TextCapsule>
                            <TextCapsule
                              className={comp.is_active ? "bg-green-500" : ""}
                            >
                              {comp.is_active ? "Active" : "Inactive"}
                            </TextCapsule>
                          </div>
                        </div>
                      </div>
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
