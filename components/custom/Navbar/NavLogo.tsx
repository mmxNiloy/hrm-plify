import React from "react";
import Link from "next/link";
import Image from "next/image";
import SiteConfig from "@/utils/SiteConfig";

export default function NavLogo({ href }: { href?: string }) {
  return (
    <Link href={href ?? "/"} className="flex gap-1 items-center justify-center">
      <Image
        src={"/revolo-logo-emblem.svg"}
        priority
        unoptimized
        height={0}
        width={0}
        className="w-6 dark:invert"
        alt={`Logo`}
      />

      <Image
        src={"/revolo-logo-text.svg"}
        priority
        unoptimized
        height={0}
        width={0}
        className="w-24 dark:invert"
        alt={`${SiteConfig.siteName}`}
      />
    </Link>
  );
}
