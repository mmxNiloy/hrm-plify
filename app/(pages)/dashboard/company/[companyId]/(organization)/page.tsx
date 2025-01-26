"use server";
import { ICompanyDetails } from "@/schema/CompanySchema";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import React from "react";
import { CompanyByIDPageProps } from "../PageProps";
import { redirect } from "next/navigation";
import { getCompanyDetails } from "@/app/(server)/actions/getCompanyDetails";
import CompanyDetailTabs from "@/components/custom/Tabs/CompanyDetailTabs";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CompanyAuthorityTab from "@/components/custom/Tabs/CompanyDetailTabs/CompanyAuthorityTab";
import CompanyDocumentsTab from "@/components/custom/Tabs/CompanyDetailTabs/CompanyDocumentsTab";

interface Props extends CompanyByIDPageProps {
  readOnly?: boolean;
  parent?: string;
  title?: string;
}

export async function generateMetadata({
  params,
}: CompanyByIDPageProps): Promise<Metadata> {
  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);
  const company = await getCompanyDetails(companyId);
  return {
    title: `Artemis | ${company.data?.company_name ?? "Company Dashboard"}`,
  };
}

export default async function CompanyByIDPage({
  params,
  readOnly,
  parent,
  title,
}: Props) {
  const mCookies = await cookies();
  const mPermissions = JSON.parse(
    mCookies.get(process.env.NEXT_PUBLIC_COOKIE_USER_ACCESS_KEY!)?.value ?? "[]"
  ) as TPermission[];

  const readAccess = mPermissions.find((item) => item === "cmp_mgmt_read");
  const writeAccess = mPermissions.find((item) => item === "cmp_mgmt_create");
  const updateAccess = mPermissions.find((item) => item === "cmp_mgmt_update");

  if (!readAccess) {
    return <AccessDenied />;
  }

  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  var company = await getCompanyDetails(companyId);

  // Guard unauthorized access
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
      <main className="container flex flex-col gap-2">
        <p className="text-xl font-semibold">Company Details</p>

        <ErrorFallbackCard error={company.error} />
      </main>
    );
  }

  // console.log("Company Details > Company Doc Db", company.data.company_docs_db);

  return (
    <main className="container flex flex-col gap-2">
      {/* <p className="text-xl font-semibold">Company Details</p> */}

      {/* <MyBreadcrumbs
        company={company.data}
        user={user}
        parent={parent}
        title={title}
      /> */}

      <div className="flex flex-row gap-2">
        <AvatarPicker
          readOnly
          src={company.data.logo}
          skeleton={<AvatarNamePlaceholder name={company.data.company_name} />}
          className="size-32 p-0 ring-2"
        />

        <div className="grid grid-cols-2 gap-2">
          <p className="text-2xl font-bold col-span-full">
            {company.data.company_name}
          </p>
          <TextCapsule className="bg-amber-500">
            <Icons.factory /> {company.data.industry ?? "Unspecified"}
          </TextCapsule>

          <TextCapsule className="bg-emerald-500">
            <Icons.mapPin /> {company.data.headquarters ?? "Unspecified"}
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
              <Icons.phone /> {company.data.contact_number ?? "Unspecified"}
            </TextCapsule>
          </Link>

          <Link
            target="_blank"
            href={company.data.email ? `mailto:${company.data.email}` : "#"}
            passHref
            className="hover:underline"
          >
            <TextCapsule className="bg-rose-500" title={company.data.email}>
              <Icons.mail /> {company.data.email ?? "Unspecified"}
            </TextCapsule>
          </Link>

          <Link
            target="_blank"
            passHref
            className="hover:underline"
            href={toHTTPSString(company.data.website)}
          >
            <TextCapsule className="bg-blue-500" title={company.data.website}>
              <Icons.externalLink />{" "}
              {company.data.website ? "Visit Website" : "Unspecified"}
            </TextCapsule>
          </Link>
        </div>
      </div>

      {/* Company Authorized personnel and documents tabs */}
      <Tabs defaultValue="auth">
        <TabsList className="w-full">
          <TabsTrigger value="auth">
            <Icons.adminUser /> Authorized Personnel
          </TabsTrigger>
          <TabsTrigger value="docs">
            <Icons.files /> Company Documents
          </TabsTrigger>
        </TabsList>

        <TabsContent value="auth">
          <CompanyAuthorityTab
            readOnly
            data={company.data}
            company_id={company.data.company_id}
          />
        </TabsContent>

        <TabsContent value="docs">
          <CompanyDocumentsTab
            readOnly
            data={company.data.company_docs_db}
            company_id={0}
          />
        </TabsContent>
      </Tabs>
    </main>
  );
}
