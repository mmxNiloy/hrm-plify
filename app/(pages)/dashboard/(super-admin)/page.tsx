"use server";
import { getCompanies } from "@/app/(server)/actions/getCompanies";
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
import { Label } from "@/components/ui/label";
import { ButtonBlue } from "@/styles/button.tailwind";
import { getPaginationParams, stringToColor } from "@/utils/Misc";
import { ISearchParamsProps } from "@/utils/Types";
import Link from "next/link";
import React from "react";

export default async function DashboardPage({
  searchParams,
}: ISearchParamsProps) {
  const { page, limit } = getPaginationParams(searchParams);
  const companies = await getCompanies({ page, limit });
  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Dashboard</p>

      <div className="flex flex-col gap-2">
        <Label className="text-lg">Please Select a Company</Label>
        <Command className="rounded-lg border shadow-md">
          <CommandInput placeholder={"Select a company or search..."} />
          <CommandList className="max-h-fit">
            <CommandEmpty>No companies found.</CommandEmpty>
            <CommandGroup heading="Companies">
              {companies.data.map((comp) => (
                <CommandItem key={`company-id-${comp.company_id}`}>
                  <div className="w-full px-8 py-4 rounded-md drop-shadow border flex gap-2 items-center justify-between">
                    <div className="flex gap-4">
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
          </CommandList>
        </Command>
      </div>
    </main>
  );
}
