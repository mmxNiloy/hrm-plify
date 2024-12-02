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

export default function CompanySearchCommand() {
  const [loading, setLoading] = useState<boolean>(false);
  const [companies, setCompanies] = useState<ICompany[]>([]);

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

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  const handleSearchChange = useDebouncedCallback(
    useCallback(async (query: string) => {
      if (query.length < 3) return;
      setLoading(true);
      const result = await searchCompanies({ companyName: query });

      if (result.error) {
        setCompanies([]);
      } else {
        setCompanies(result.data);
      }

      setLoading(false);
    }, []),
    300
  );
  return (
    <Command className="rounded-lg border shadow-md" shouldFilter={false}>
      <CommandInput
        placeholder={"Select a company or search..."}
        onValueChange={handleSearchChange}
        disabled={loading}
      />
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
            {companies.map((comp) => (
              <CommandItem key={`company-id-${comp.company_id}`}>
                <div className="w-full px-8 py-4 rounded-md drop-shadow border flex gap-2 items-center justify-between">
                  <div className="flex gap-4">
                    <AvatarPicker
                      readOnly
                      src={comp.logo}
                      skeleton={
                        <span
                          style={{
                            backgroundColor: stringToColor(comp.company_name),
                          }}
                          className={
                            "flex items-center justify-center text-xl size-10 bg-muted rounded-full text-white"
                          }
                        >
                          {comp.company_name.charAt(0).toUpperCase()}
                        </span>
                      }
                      className="size-10 p-0"
                    />
                    <div className="flex flex-col gap-2">
                      <p className="font-semibold text-xl">
                        {comp.company_name}
                      </p>

                      <Link
                        href={`${
                          comp.website
                        }?_ref=ArtemisHRMS&_clickId=Artemis-${Date.now()}`}
                        passHref
                        className="hover:underline"
                      >
                        <p className="text-sm italic flex gap-2 items-center">
                          <Icons.link className="size-3" />
                          {comp.website}
                        </p>
                      </Link>
                      <div className="flex gap-2 *:flex *:px-2 *:py-1 *:rounded-full *:text-white *:w-fit *:items-center *:gap-1">
                        <p className="bg-blue-500">
                          <Icons.building className="size-3" />
                          {comp.headquarters}
                        </p>

                        <p className="bg-orange-500">
                          <Icons.factory className="size-3" />
                          {comp.industry}
                        </p>
                        <p
                          className={
                            comp.is_active
                              ? "bg-green-500"
                              : "bg-muted-foreground text-muted-foreground"
                          }
                        >
                          {comp.is_active ? "Active" : "Inactive"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/dashboard/company/${comp.company_id}/`}
                    passHref
                  >
                    <Button className={ButtonBlue}>
                      Select
                      <Icons.chevronRight />
                    </Button>
                  </Link>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </Command>
  );
}
