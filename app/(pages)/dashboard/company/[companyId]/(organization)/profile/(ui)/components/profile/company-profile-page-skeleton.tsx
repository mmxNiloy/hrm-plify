import React from "react";
import CompanyProfileFormSkeleton from "./company-profile-form-skeleton";

export default function CompanyProfilePageSkeleton() {
  return (
    <div className="flex flex-col gap-4 sm:gap-6 p-4 sm:p-6 md:p-8 border rounded-md">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <p className="text-base sm:text-lg md:text-xl font-semibold">
          Company Profile
        </p>
      </div>
      <CompanyProfileFormSkeleton />
    </div>
  );
}
