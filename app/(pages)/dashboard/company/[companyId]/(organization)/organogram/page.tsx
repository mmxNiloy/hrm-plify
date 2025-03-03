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
import OrgChartNameEditPopover from "@/components/custom/Popover/Organogram/OrgChartNameEditPopover";
import SiteConfig from "@/utils/SiteConfig";
import { getOrganogramFile } from "@/app/(server)/actions/getOrganogramFile";

export async function generateMetadata({
  params,
}: CompanyByIDPageProps): Promise<Metadata> {
  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);
  const company = await getCompanyDetails(companyId);
  return {
    title: `${SiteConfig.siteName} | ${
      company.data?.company_name ?? "Company Dashboard"
    } | Organogram Chart`,
  };
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
      <main className="container flex flex-col gap-2">
        <p className="text-xl font-semibold">Organogram Chart</p>
        <ErrorFallbackCard
          error={company.error ?? companyExtra.error ?? charts.error}
        />
      </main>
    );
  }

  const chartData = await Promise.all(
    charts.data.map((item) => getOrganogramFile(item))
  );

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Organogram Chart</p>
      <div className="flex items-center justify-between">
        <MyBreadcrumbs company={company.data} user={user} title="Organogram" />

        <div className="flex gap-4 items-center">
          <OrgChartVersionSelect charts={charts.data} />

          {charts.data.length < 3 && (
            <OrgChartVersionCreationPopover
              charts={charts.data}
              companyId={companyId}
            />
          )}
        </div>
      </div>

      <OrgChart
        charts={chartData.map((item) =>
          item.error
            ? {
                company_id: companyId,
                id: 0,
                name: "",
              }
            : item.data
        )}
        company={company.data}
        employees={companyExtra.data.employees}
        designations={companyExtra.data.designations}
        companyId={companyId}
      />
    </main>
  );
}
