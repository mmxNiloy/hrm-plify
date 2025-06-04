import React from "react";
import { getCompanyDetails } from "@/app/(server)/actions/getCompanyDetails";
import { DataTableError } from "@/components/ui/data-table/data-table-error";
import CompanyAuthorityEditDialog from "../company-authority-edit-dialog";
import CompanyAuthorityFormFragment from "./company-authority-form-fragment";
import { Skeleton } from "@/components/ui/skeleton";
import CompanyAuthorityFormFragmentSkeleton from "./company-authority-form-fragment-skeleton";

export default function CompanyAuthorityTabSkeleton() {
  return (
    <div className="flex flex-col gap-4 sm:gap-6 p-4 sm:p-6 md:p-8 border rounded-md">
      {/* Authorised Personnel Section */}
      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="col-span-full flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-base sm:text-lg md:text-xl font-semibold">
            Authorised Personnel
          </p>
          <div className="w-full sm:w-auto">
            <Skeleton className="h-10 w-24" />
          </div>
        </div>

        <CompanyAuthorityFormFragmentSkeleton />
      </div>

      {/* Key Contact Section */}
      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="col-span-full flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-base sm:text-lg md:text-xl font-semibold">
            Key Contact
          </p>
        </div>

        <CompanyAuthorityFormFragmentSkeleton />
      </div>

      {/* Level 1 User Section */}
      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="col-span-full flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-base sm:text-lg md:text-xl font-semibold">
            Level 1 User
          </p>
        </div>

        <CompanyAuthorityFormFragmentSkeleton />
      </div>
    </div>
  );
}
