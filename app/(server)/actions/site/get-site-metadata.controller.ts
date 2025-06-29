"use server";

import SiteConfig from "@/utils/SiteConfig";
import { Metadata } from "next";

export default async function getSiteMetadata(
  pageName = "Home"
): Promise<Metadata> {
  return {
    title: `${pageName} | ${SiteConfig.appName}`,
    description: `${SiteConfig.siteDescription} | Manage HR at lightning speed for your company on our platform.`,
    keywords: [
      SiteConfig.appName,
      pageName.toLowerCase(),
      "HR management",
      "company management",
      "human resources",
    ]
      .filter(Boolean)
      .join(", "),
    openGraph: {
      title: `${pageName} | ${SiteConfig.appName}`,
      description: `${SiteConfig.siteDescription} | Manage HR at lightning speed for your company on our platform.`,
      url: SiteConfig.deployUrl,
      siteName: SiteConfig.appName,
      type: "website",
      images: [
        {
          url: `${SiteConfig.deployUrl}/site-logo.svg`, // Fallback to a default image
          width: 1200,
          height: 630,
          alt: `${SiteConfig.appName} logo`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${pageName} | ${SiteConfig.appName}`,
      description: `${SiteConfig.siteDescription} | Manage HR at lightning speed for your company on our platform.`,
      images: [`${SiteConfig.deployUrl}/site-logo.svg`], // Twitter image
    },
    alternates: {
      canonical: `${SiteConfig.deployUrl}/${pageName.toLowerCase()}`,
    },
  };
}
