"use server";
import { CommandEmpty, CommandGroup } from "@/components/ui/command";
import React from "react";
import CompanySearchCommandCard from "./CompanySearchCommandCard";
import { searchCompanies } from "@/app/(server)/actions/searchCompanies";
import { searchParamsCache } from "@/utils/searchParamsParsers";

export default async function CompanySearchCommandContent() {
  const search = searchParamsCache.get("search") ?? "";

  const companiesData = await searchCompanies({
    companyName: search,
    page: 1,
    limit: 12,
  });
  const companies = companiesData.data ?? [];

  if (companies.length < 1) {
    return (
      <div className="flex flex-col gap-4 text-sm sm:text-base p-2 sm:p-4">
        <p className="text-gray-600 text-sm font-bold">Companies</p>
        <p className="text-center">No companies found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 text-sm sm:text-base p-2 sm:p-4">
      <p className="text-gray-600 text-sm font-bold">Companies</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
        {companies.map((comp) => (
          <CompanySearchCommandCard
            key={`company-search-command-card${comp.company_id}`}
            company={comp}
          />
        ))}
      </div>
    </div>
  );
}
