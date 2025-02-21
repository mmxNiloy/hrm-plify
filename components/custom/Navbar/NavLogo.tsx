import React from "react";
import Link from "next/link";
import Image from "next/image";
import SiteConfig from "@/utils/SiteConfig";

export default function NavLogo({ href }: { href?: string }) {
  return (
    <Link href={href ?? "/"} className="flex gap-1 items-center justify-center">
      <Image
        src={"/site-logo-horizontal.svg"}
        priority
        unoptimized
        height={0}
        width={0}
        className="w-40 dark:invert"
        alt={`Revolo HR`}
      />
    </Link>
  );
}
