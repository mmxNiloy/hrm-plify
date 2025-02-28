import React from "react";
import Link from "next/link";
import Image from "next/image";
import SiteConfig from "@/utils/SiteConfig";
import { cn } from "@/lib/utils";

export default function NavLogo({
  href,
  logoSize = "default",
}: {
  href?: string;
  logoSize?: "default" | "lg" | "sm";
}) {
  return (
    <Link href={href ?? "/"} className="flex gap-1 items-center justify-center">
      <Image
        src={"/site-logo-horizontal.svg"}
        priority
        unoptimized
        height={0}
        width={0}
        className={cn(
          "dark:invert",
          logoSize === "default"
            ? "w-32 sm:w-36 md:w-40"
            : logoSize === "sm"
            ? "w-20 sm:w-24 md:w-32"
            : "w-32 sm:w-40 md:w-64"
        )}
        alt={`Revolo HR`}
      />
    </Link>
  );
}
