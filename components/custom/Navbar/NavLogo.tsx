import React from "react";
import Link from "next/link";
import Image from "next/image";
import SiteConfig from "@/utils/SiteConfig";

export default function NavLogo({ href }: { href?: string }) {
  return (
    <Link href={href ?? "/"}>
      <Image
        src={"/site-logo.svg"}
        priority
        unoptimized
        height={0}
        width={0}
        className="h-16 w-32 dark:invert"
        alt={`${SiteConfig.siteName} Logo`}
      />
    </Link>
  );
}
