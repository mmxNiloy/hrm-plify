"use server";
import { getCompanyDetails } from "@/app/(server)/actions/getCompanyDetails";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { CompanyByIDPageProps } from "../../PageProps";

export async function generateMetadata({
  params,
}: CompanyByIDPageProps): Promise<Metadata> {
  const mParams = await params;
  const companyId = mParams.companyId;
  const company = await getCompanyDetails(companyId);
  return {
    title: `Artemis | ${
      company.data?.company_name ?? "Company Dashboard"
    } | Sponsor Compliance`,
  };
}

export default async function SponsorCompliancePage() {
  return (
    <Link
      className="w-fit"
      target="_blank"
      href={"https://www.gov.uk/view-right-to-work"}
      passHref
    >
      <Button className="text-lg font-semibold gap-2" variant={"link"}>
        <Icons.scale />
        <p>Right to Work</p>
        <Icons.externalLink className="self-start size-4" />
      </Button>
    </Link>
  );
}
