"use server";
import React, { Suspense } from "react";
import EmploymentTypeCreateDialog from "./components/employment-type-create-dialog";
import { FilePlus2 } from "lucide-react";
import DataTableSkeleton from "@/components/ui/data-table/data-table-skeleton";
import EmploymentTypeTable from "./features/employment-type-table";
import { Metadata } from "next";
import SiteConfig from "@/utils/SiteConfig";
import { SearchParams } from "nuqs";
import { searchParamsCache, serialize } from "@/utils/searchParamsParsers";
import { cn } from "@/lib/utils";
import { ButtonGradient } from "@/styles/button.tailwind";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import getSiteMetadata from "@/app/(server)/actions/site/get-site-metadata.controller";

export async function generateMetadata(): Promise<Metadata> {
  return await getSiteMetadata("Employment Types");
}

export default async function EmploymentTypePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sParams = await searchParams;

  searchParamsCache.parse(sParams);
  const key = serialize(sParams);

  return (
    <main className="container flex flex-col gap-4 sm:gap-6 py-4 sm:py-6">
      <p className="text-lg sm:text-xl md:text-2xl font-semibold">
        Employment Types
      </p>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <MyBreadcrumbs title="Employment Type" />

        <EmploymentTypeCreateDialog
          size={"sm"}
          className={cn(ButtonGradient, "gap-1 [&_svg]:size-4 text-sm")}
        >
          <FilePlus2 /> Create Employment Type
        </EmploymentTypeCreateDialog>
      </div>
      <Suspense
        key={key}
        fallback={<DataTableSkeleton rows={10} columns={4} />}
      >
        <EmploymentTypeTable />
      </Suspense>
    </main>
  );
}
