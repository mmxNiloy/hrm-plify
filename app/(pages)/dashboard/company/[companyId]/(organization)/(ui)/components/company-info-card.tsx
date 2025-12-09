"use server";

import { getCompany } from "@/app/(server)/actions/company/get-company.controller";
import AvatarNamePlaceholder from "@/components/custom/AvatarNamePlaceholder";
import ErrorCard from "@/components/custom/error-card";
import TextCapsule from "@/components/custom/TextCapsule";
import { AvatarPicker } from "@/components/ui/avatar-picker";
import Icons from "@/components/ui/icons";
import { toHTTPSString } from "@/utils/Misc";
import { shortenText } from "@/utils/Text";
import Link from "next/link";
import React from "react";

interface Props {
  companyId: string;
}

export default async function CompanyInfoCard({ companyId }: Props) {
  const data = await getCompany(companyId);

  if (data.error) {
    return <ErrorCard description={"Failed to load company data."} />;
  }

  const company = data.payload;

  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-8">
      <AvatarPicker
        readOnly
        src={company.logo}
        skeleton={<AvatarNamePlaceholder name={company.company_name} />}
        className="size-24 md:size-32 p-0 ring-2 shrink-0"
      />

      <div className="flex-1 max-w-xs">
        <p className="text-2xl font-bold mb-4">{company.company_name}</p>
        <div className="flex flex-wrap gap-4">
          <TextCapsule className="bg-amber-500" title={company.industry}>
            <Icons.factory />{" "}
            {shortenText(company.industry || "Unspecified", 32)}
          </TextCapsule>

          <TextCapsule className="bg-emerald-500" title={company.headquarters}>
            <Icons.mapPin />{" "}
            {shortenText(company.headquarters || "Unspecified", 48)}
          </TextCapsule>

          <Link
            target="_blank"
            href={
              company.contact_number ? `tel:${company.contact_number}` : "#"
            }
            passHref
            className="hover:underline"
          >
            <TextCapsule
              className="bg-fuchsia-500"
              title={company.contact_number}
            >
              <Icons.phone />{" "}
              {shortenText(company.contact_number || "Unspecified")}
            </TextCapsule>
          </Link>

          <Link
            target="_blank"
            href={company.email ? `mailto:${company.email}` : "#"}
            passHref
            className="hover:underline"
          >
            <TextCapsule className="bg-rose-500" title={company.email}>
              <Icons.mail /> {shortenText(company.email || "Unspecified")}
            </TextCapsule>
          </Link>

          <Link
            target="_blank"
            passHref
            className="hover:underline sm:col-span-2"
            href={toHTTPSString(company.website)}
          >
            <TextCapsule className="bg-blue-500" title={company.website}>
              <Icons.externalLink />{" "}
              {company.website ? "Visit Website" : "Unspecified"}
            </TextCapsule>
          </Link>
        </div>
      </div>
    </div>
  );
}
