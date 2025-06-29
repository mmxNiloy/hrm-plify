"use server";

import { ICompany } from "@/schema/CompanySchema";
import executeRequest from "../network/request-builder.service";
import { Metadata } from "next";
import SiteConfig from "@/utils/SiteConfig";
import getSiteMetadata from "../site/get-site-metadata.controller";

interface Meta {
  company_name: string;
  industry: string | null;
  headquarters: string | null;
  founded_year: number | null;
  website: string | null;
  logo: string | null;
  contact_number: string | null;
  email: string | null;
}

export default async function getCompanyMeta(
  companyId: string,
  pageName: string = "Dashboard",
  pageUrl?: string
): Promise<Metadata> {
  const result = await executeRequest<Meta | null>({
    method: "GET",
    endpoint: ["v2", "meta", "company", companyId].join("/"),
  });

  const meta = result.payload;
  console.log("Meta", meta);

  if (result.error || !meta) {
    return await getSiteMetadata(pageName);
  }

  return {
    title: `${meta.company_name} | ${pageName} | ${SiteConfig.appName}`,
    description: `${
      meta.company_name
    } offers insights into ${pageName.toLowerCase()}${
      meta.industry ? ` within the ${meta.industry} industry` : ""
    }${
      meta.headquarters
        ? ` from their headquarters in ${meta.headquarters}`
        : ""
    }${meta.founded_year ? ` since ${meta.founded_year}` : ""}. Explore now!`,
    keywords: [
      meta.company_name,
      ...(meta.industry
        ? [meta.industry, `${meta.industry} ${pageName.toLowerCase()}`]
        : []),
      pageName.toLowerCase(),
      ...(meta.headquarters
        ? [`${pageName.toLowerCase()} in ${meta.headquarters}`]
        : []),
    ]
      .filter(Boolean)
      .join(", "),
    openGraph: {
      title: `${meta.company_name} | ${pageName} | ${SiteConfig.appName}`,
      description: `${
        meta.company_name
      } offers insights into ${pageName.toLowerCase()}${
        meta.industry ? ` within the ${meta.industry} industry` : ""
      }${meta.headquarters ? ` from ${meta.headquarters}` : ""}${
        meta.founded_year ? ` since ${meta.founded_year}` : ""
      }.`,
      url:
        meta.website ||
        `${SiteConfig.deployUrl}/dashboard/company/${companyId}/${
          pageUrl ?? pageName !== "Dashboard" ? pageName.toLowerCase() : ""
        }`,
      siteName: SiteConfig.appName,
      type: "website",
      ...(meta.logo && {
        images: [
          {
            url: meta.logo,
            width: 1200,
            height: 630,
            alt: `${meta.company_name} logo`,
          },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: `${meta.company_name} | ${pageName} | ${SiteConfig.appName}`,
      description: `${
        meta.company_name
      } offers insights into ${pageName.toLowerCase()}${
        meta.industry ? ` within the ${meta.industry} industry` : ""
      }${meta.headquarters ? ` from ${meta.headquarters}` : ""}.`,
      ...(meta.logo && { images: [meta.logo] }),
    },
    alternates: {
      canonical:
        meta.website ||
        `${SiteConfig.deployUrl}/dashboard/company/${companyId}/${
          pageUrl ?? pageName !== "Dashboard" ? pageName.toLowerCase() : ""
        }`,
    },
    ...(meta.contact_number && { contactNumber: meta.contact_number }),
    ...(meta.email && { email: meta.email }),
  };
}
