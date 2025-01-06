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
                              <span
                                style={{
                                  backgroundColor: stringToColor(
                                    comp.company_name
                                  ),
                                }}
                                className={
                                  "flex items-center justify-center text-xl size-10 bg-muted rounded-full text-white"
                                }
                              >
                                {comp.company_name.charAt(0).toUpperCase()}
                              </span>
                            }
                            className="size-16 p-0"
                          />

                          <Link
                            href={`${
                              comp.website
                            }?_ref=ArtemisHRMS&_clickId=Artemis-${Date.now()}`}
                            passHref
                            className="hover:underline"
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
