"use server";
import { cookies } from "next/headers";
import React, { Suspense } from "react";
import { CompanyByIDPageProps } from "../PageProps";
import { redirect } from "next/navigation";
import { getCompanyDetails } from "@/app/(server)/actions/getCompanyDetails";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import AccessDenied from "@/components/custom/AccessDenied";
import { TPermission } from "@/schema/Permissions";
import { Metadata } from "next";
import { AvatarPicker } from "@/components/ui/avatar-picker";
import AvatarNamePlaceholder from "@/components/custom/AvatarNamePlaceholder";
import TextCapsule from "@/components/custom/TextCapsule";
import Icons from "@/components/ui/icons";
import Link from "next/link";
import { toHTTPSString } from "@/utils/Misc";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import SiteConfig from "@/utils/SiteConfig";
import { shortenText } from "@/utils/Text";
import getCurrentUser from "@/app/(server)/actions/user/get-current-user.controller";
import CompanyAuthorityTab from "./(ui)/features/tabs/company-authority-tab";
import CompanyAuthorityTabSkeleton from "./(ui)/components/company-authority/company-authority-tab-skeleton";
import CompanyDocumentFormSkeleton from "./(ui)/components/company-document/company-document-form-skeleton";
import CompanyDocumentsTab from "./(ui)/features/tabs/company-documents-tab";
import getCurrentUserPermissions from "@/app/(server)/actions/user/get-current-user-permissions.controller";
import { DataTableError } from "@/components/ui/data-table/data-table-error";
import CompanyInfoCard from "./(ui)/components/company-info-card";
import CompanyInfoCardSkeleton from "./(ui)/components/company-info-card-skeleton";
import getCompanyMeta from "@/app/(server)/actions/company/get-company-meta.controller";

interface Props extends CompanyByIDPageProps {
  readOnly?: boolean;
  parent?: string;
  title?: string;
}

export async function generateMetadata({
  params,
}: CompanyByIDPageProps): Promise<Metadata> {
  const prms = await params;
  var companyId = prms.companyId;
  return await getCompanyMeta(companyId);
}

export default async function CompanyByIDPage({ params }: Props) {
  const [prms, user, mPermissions] = await Promise.all([
    params,
    getCurrentUser(),
    getCurrentUserPermissions(),
  ]);

  const readAccess = mPermissions?.find((item) => item === "cmp_mgmt_read");

  if (!readAccess) {
    return <AccessDenied />;
  }

  var companyId = prms.companyId;

  if (!user) {
    redirect("/login?_ref=token-expired");
  }

  if (
    user.user_roles?.roles?.role_name !== "Super Admin" &&
    user.user_roles?.roles?.role_name !== "Admin" &&
    user.usercompany?.company_id != Number.parseInt(`${companyId}`)
  ) {
    redirect(
      `/dashboard/company/${user.usercompany?.company_id}/?_ref=unauthorized-access`
    );
  }

  return (
    <main className="container mx-auto flex flex-col gap-6 p-4 md:p-6 lg:p-8 max-w-7xl">
      <Suspense fallback={<CompanyInfoCardSkeleton />}>
        <CompanyInfoCard companyId={companyId} />
      </Suspense>

      <Tabs defaultValue="auth" className="w-full">
        <TabsList className="w-full h-fit flex flex-wrap justify-center gap-2 md:gap-4 bg-gray-100 p-2 rounded-lg">
          <TabsTrigger
            value="auth"
            className="flex-1 md:flex-none text-center min-w-[150px]"
          >
            <Icons.adminUser className="mr-2" /> Authorized Personnel
          </TabsTrigger>
          <TabsTrigger
            value="docs"
            className="flex-1 md:flex-none text-center min-w-[150px]"
          >
            <Icons.files className="mr-2" /> Company Documents
          </TabsTrigger>
        </TabsList>

        <TabsContent value="auth" className="mt-4">
          <Suspense fallback={<CompanyAuthorityTabSkeleton />}>
            <CompanyAuthorityTab readOnly companyId={companyId} />
          </Suspense>
        </TabsContent>

        <TabsContent value="docs" className="mt-4">
          <Suspense fallback={<CompanyDocumentFormSkeleton />}>
            <CompanyDocumentsTab readOnly companyId={companyId} />
          </Suspense>
        </TabsContent>
      </Tabs>
    </main>
  );
}
