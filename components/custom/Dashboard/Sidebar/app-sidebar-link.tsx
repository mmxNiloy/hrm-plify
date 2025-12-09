import React from "react";
import SiteConfig from "@/utils/SiteConfig";
import { SidebarHeader } from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";

export default function AppSidebarHeaderLink({
  link = "/dashboard",
  logoUrl = "/site-logo-horizontal.svg",
  altText = SiteConfig.siteName,
}: {
  link?: string;
  logoUrl?: string;
  altText?: string;
}) {
  return (
    <SidebarHeader>
      <Link href={link} passHref className="px-4">
        <Image
          src={logoUrl}
          priority
          unoptimized
          height={0}
          width={0}
          className="w-full max-h-16 object-center object-contain"
          alt={altText}
        />
      </Link>
    </SidebarHeader>
  );
}
