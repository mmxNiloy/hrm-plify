"use client";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Icons from "@/components/ui/icons";
import { Separator } from "@/components/ui/separator";
import useSearchbar from "@/hooks/use-searchbar";
import { shortenText } from "@/utils/Text";
import React, { useState } from "react";

export default function CompanySearchCommandDropdown() {
  const [history, setHistory] = useState<string[]>([]);

  const { searchQuery, setSearchQuery, resetSearch } = useSearchbar();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
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
            onClick={resetSearch}
          >
            <Icons.reset className="size-4 sm:size-5" /> Reset
          </DropdownMenuItem>
          <Drawer direction="right">
            <DrawerTrigger asChild>
              <DropdownMenuItem className="gap-2 text-sm sm:text-base">
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
                      <DrawerClose asChild key={`search-history-item-${index}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-2 justify-start text-sm sm:text-base px-3 sm:px-4"
                          onClick={() => {
                            setSearchQuery(item);
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
                    <p className="text-sm sm:text-base">No search history...</p>
                  </div>
                )}
              </div>
            </DrawerContent>
          </Drawer>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
