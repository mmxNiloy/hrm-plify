"use server";
import { ICompanyDetails } from "@/schema/CompanySchema";
import { IUser } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import React from "react";
import { CompanyByIDPageProps } from "../../../PageProps";
import { redirect } from "next/navigation";
import { getCompanyDetails } from "@/app/(server)/actions/getCompanyDetails";
import CompanyDetailTabs from "@/components/custom/Tabs/CompanyDetailTabs";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { ButtonBase, ButtonBlue } from "@/styles/button.tailwind";

export default async function SCSponsorManagementDossier({
  params,
}: CompanyByIDPageProps) {
  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  var company = await getCompanyDetails(companyId);

  if (company.error) {
    return (
      <main className="container flex flex-col gap-2">
        <p className="text-xl font-semibold">Sponsor Management Dossier</p>

        <ErrorFallbackCard error={company.error} />
      </main>
    );
  }

  const data = [
    {
      title: "Sponsorship: guidance for employers and educators ",
      link: "https://www.gov.uk/government/collections/sponsorship-information-for-employers-and-educators",
    },

    {
      title:
        "Sponsor guidance appendix A: supporting documents for sponsor applications ",
      link: "https://www.gov.uk/government/publications/supporting-documents-for-sponsor-applications-appendix-a",
    },

    {
      title: "Sponsor guidance appendix D: keeping records for sponsorship ",
      link: "https://www.gov.uk/government/publications/keep-records-for-sponsorship-appendix-d",
    },

    {
      title: "Prevent illegal working. ",
      link: "https://www.gov.uk/government/publications/preventing-illegal-working",
    },

    {
      title: "Right to work checks ",
      link: "https://www.gov.uk/government/publications/right-to-work-checks-employers-guide",
    },

    {
      title: "Priority change of circumstances for sponsors ",
      link: "https://www.gov.uk/government/publications/priority-change-of-circumstances-for-sponsors",
    },

    {
      title: "Introduction to the sponsorship management system: SMS guide 1 ",
      link: "https://www.gov.uk/government/publications/use-the-sponsorship-management-system-sms-user-manual",
    },

    {
      title: "Manage your sponsorship licence: SMS guide 2 ",
      link: "https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/939148/2._Managing_your_licence_-_PBS820.pdf",
    },

    {
      title: "Applications, renewals and services: SMS guide 3 ",
      link: "https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/939200/3._Applications__renewals_and_services_-_PBS820.pdf",
    },
    { title: "Right to Work Checklist" },
    { title: "Paper and electronic files of all migrant workers " },
  ];

  const colors = [
    "bg-emerald-400",
    "bg-indigo-500",
    "bg-pink-500",
    "bg-yellow-400",
  ];

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Sponsor Management Dossier</p>

      <MyBreadcrumbs
        company={company.data}
        user={user}
        parent={"Sponsor Compliance"}
        title={"Sponsor Management Dossier"}
      />

      <div className="grid grid-cols-4 gap-4">
        {data.map((item, index) => (
          <div
            key={`dossier-item-${index}`}
            className={cn(
              "p-4 w-full aspect-video border rounded-md drop-shadow-md flex flex-col justify-between",
              colors[index % colors.length]
            )}
          >
            <p className="font-semibold text-white">{item.title}</p>
            {item.link ? (
              <Link passHref href={item.link} target="_blank">
                <Button className={cn(ButtonBlue, "w-full")}>
                  Visit
                  <Icons.externalLink className="size-4 self-start" />
                </Button>
              </Link>
            ) : (
              <Button className={ButtonBase}>
                <Icons.file />
                Hardcopy File
              </Button>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
