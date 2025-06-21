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
  const company = await getCompanyDetails(companyId);
  return {
    title: `${SiteConfig.siteName} | ${
      company.data?.company_name ?? "Company Dashboard"
    }`,
  };
}

export default async function CompanyByIDPage({ params }: Props) {
  const mCookies = await cookies();
  const mPermissions = JSON.parse(
    mCookies.get(process.env.NEXT_PUBLIC_COOKIE_USER_ACCESS_KEY!)?.value ?? "[]"
  ) as TPermission[];

  const readAccess = mPermissions.find((item) => item === "cmp_mgmt_read");
  if (!readAccess) {
    return <AccessDenied />;
  }

  const [prms, user] = await Promise.all([params, getCurrentUser()]);
  var companyId = prms.companyId;
  const company = await getCompanyDetails(companyId);

  if (!user) {
    redirect("/login?_ref=token-expired");
  }

  if (
    user.user_roles?.roles.role_name !== "Super Admin" &&
    user.user_roles?.roles.role_name !== "Admin" &&
    user.usercompany?.company_id != Number.parseInt(`${companyId}`)
  ) {
    redirect(
      `/dashboard/company/${user.usercompany?.company_id}/?_ref=unauthorized-access`
    );
  }

  if (company.error) {
    return (
      <main className="container mx-auto flex flex-col gap-4 p-4">
        <p className="text-xl font-semibold">Company Details</p>
        <ErrorFallbackCard error={company.error} />
      </main>
    );
  }

  return (
    <main className="container mx-auto flex flex-col gap-6 p-4 md:p-6 lg:p-8 max-w-7xl">
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        <AvatarPicker
          readOnly
          src={company.data.logo}
          skeleton={<AvatarNamePlaceholder name={company.data.company_name} />}
          className="size-24 md:size-32 p-0 ring-2 shrink-0"
        />

        <div className="flex-1">
          <p className="text-2xl font-bold mb-4">{company.data.company_name}</p>
          <div className="flex flex-wrap gap-4">
            <TextCapsule className="bg-amber-500" title={company.data.industry}>
              <Icons.factory />{" "}
              {shortenText(company.data.industry ?? "Unspecified", 32)}
            </TextCapsule>

            <TextCapsule
              className="bg-emerald-500"
              title={company.data.headquarters}
            >
              <Icons.mapPin />{" "}
              {shortenText(company.data.headquarters ?? "Unspecified", 48)}
            </TextCapsule>

            <Link
              target="_blank"
              href={
                company.data.contact_number
                  ? `tel:${company.data.contact_number}`
                  : "#"
              }
              passHref
              className="hover:underline"
            >
              <TextCapsule
                className="bg-fuchsia-500"
                title={company.data.contact_number}
              >
                <Icons.phone />{" "}
                {shortenText(company.data.contact_number ?? "Unspecified")}
              </TextCapsule>
            </Link>

            <Link
              target="_blank"
              href={company.data.email ? `mailto:${company.data.email}` : "#"}
              passHref
              className="hover:underline"
            >
              <TextCapsule className="bg-rose-500" title={company.data.email}>
                <Icons.mail />{" "}
                {shortenText(company.data.email ?? "Unspecified")}
              </TextCapsule>
            </Link>

            <Link
              target="_blank"
              passHref
              className="hover:underline sm:col-span-2"
              href={toHTTPSString(company.data.website)}
            >
              <TextCapsule className="bg-blue-500" title={company.data.website}>
                <Icons.externalLink />{" "}
                {company.data.website ? "Visit Website" : "Unspecified"}
              </TextCapsule>
            </Link>
          </div>
        </div>
      </div>

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
