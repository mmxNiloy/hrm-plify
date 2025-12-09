"use server";
import { CommandEmpty, CommandGroup } from "@/components/ui/command";
import React from "react";
import CompanySearchCommandCard from "./CompanySearchCommandCard";
import { searchCompanies } from "@/app/(server)/actions/searchCompanies";
import { searchParamsCache } from "@/utils/searchParamsParsers";
import { getCompanies } from "@/app/(server)/actions/company/get-companies.controller";
import { DataTableError } from "@/components/ui/data-table/data-table-error";

export default async function CompanySearchCommandContent() {
  const search = searchParamsCache.get("search") ?? "";
  const isActive = searchParamsCache.get("companyStatus");

  const companiesData = await getCompanies({
    search,
    page: 1,
    limit: 12,
    isActive,
  });

  // console.log("Companies Data:", companiesData);

  if (companiesData.error) {
    return (
      <div className="flex-1">
        <DataTableError errorMessage="Failed to load companies. Please try again later." />
      </div>
    );
  }

  const companies = companiesData.payload;

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
