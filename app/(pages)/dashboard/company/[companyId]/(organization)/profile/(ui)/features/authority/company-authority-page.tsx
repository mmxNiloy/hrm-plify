"use server";

import { getCompany } from "@/app/(server)/actions/company/get-company.controller";
import getCurrentUserPermissions from "@/app/(server)/actions/user/get-current-user-permissions.controller";
import getCurrentUser from "@/app/(server)/actions/user/get-current-user.controller";
import { DataTableError } from "@/components/ui/data-table/data-table-error";
import React, { Suspense } from "react";
import CompanyProfileEditDialog from "../../components/company-profile-edit-dialog";
import CompanyProfileFormFragment from "../../components/company-profile-form-fragment";
import getCompanyAuthority from "@/app/(server)/actions/company/authority/get-company-authority.controller";
import { Skeleton } from "@/components/ui/skeleton";
import CompanyAuthorizedPersonnelCard from "./company-authorized-personnel-card";
import CompanyAuthorityFormSkeleton from "../../components/company-authority-form-skeleton";
import CompanyKeyContactCard from "./company-key-contact-card";
import CompanyL1UserCard from "./company-l1-user-card";

export default async function CompanyAuthorityPage({
  companyId,
}: {
  companyId: string;
}) {
  const mPermissions = await getCurrentUserPermissions();

  const updateAccess = mPermissions?.find((item) => item === "cmp_mgmt_update");
  const key = Date.now().toString();

  return (
    <div className="flex flex-col gap-4">
      <Suspense
        key={`authorized-personnel-key-${key}`}
        fallback={<CompanyAuthorityFormSkeleton />}
      >
        <CompanyAuthorizedPersonnelCard
          companyId={companyId}
          updateAccess={!!updateAccess}
        />
      </Suspense>
      <Suspense
        key={`key-contact-key-${key}`}
        fallback={<CompanyAuthorityFormSkeleton />}
      >
        <CompanyKeyContactCard
          companyId={companyId}
          updateAccess={!!updateAccess}
        />
      </Suspense>
      <Suspense
        key={`level-1-user-key-${key}`}
        fallback={<CompanyAuthorityFormSkeleton />}
      >
        <CompanyL1UserCard
          companyId={companyId}
          updateAccess={!!updateAccess}
        />
      </Suspense>
    </div>
  );
}
