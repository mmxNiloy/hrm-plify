"use server";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import React from "react";
import { CompanyByIDPageProps } from "../../PageProps";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import { getCompanyExtraData } from "@/app/(server)/actions/getCompanyExtraData";
import OrgChart from "@/components/custom/Organogram/OrgChart";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import { getCompanyDetails } from "@/app/(server)/actions/getCompanyDetails";
import { Metadata } from "next";
import OrgChartVersionSelect from "@/components/custom/Organogram/OrgChartVersionSelect";
import OrgChartVersionCreationPopover from "@/components/custom/Popover/Organogram/OrgChartVersionCreationPopover";
import { getAllOrganograms } from "@/app/(server)/actions/getAllOrganograms";
import SiteConfig from "@/utils/SiteConfig";
import getCompanyMeta from "@/app/(server)/actions/company/get-company-meta.controller";

export async function generateMetadata({
  params,
}: CompanyByIDPageProps): Promise<Metadata> {
  const mParams = await params;
  const companyId = mParams.companyId;
  return await getCompanyMeta(companyId, "Organogram");
}

export default async function OrganogramPage({ params }: CompanyByIDPageProps) {
  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);
  const [company, companyExtra, charts] = await Promise.all([
    getCompanyData(companyId),
    getCompanyExtraData(companyId),
    getAllOrganograms(companyId),
  ]);
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  if (company.error || companyExtra.error || charts.error) {
    return (
      <main className="container flex flex-col gap-4 sm:gap-6 py-4 sm:py-6">
        <p className="text-lg sm:text-xl md:text-2xl font-semibold">
          Organogram Chart
        </p>
        <ErrorFallbackCard
          error={company.error ?? companyExtra.error ?? charts.error}
        />
      </main>
    );
  }

  return (
    <main className="container flex flex-col gap-4 sm:gap-6 py-4 sm:py-6">
      <p className="text-lg sm:text-xl md:text-2xl font-semibold">
        Organogram Chart
      </p>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4">
        <MyBreadcrumbs company={company.data} user={user} title="Organogram" />

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <OrgChartVersionSelect charts={charts.data} />

          {charts.data.length < 3 && (
            <div className="w-full sm:w-auto">
              <OrgChartVersionCreationPopover
                charts={charts.data}
                companyId={companyId}
              />
            </div>
          )}
        </div>
      </div>

      <OrgChart
        charts={charts.data}
        company={company.data}
        employees={companyExtra.data.employees}
        designations={companyExtra.data.designations}
        companyId={companyId}
      />
    </main>
  );
}
