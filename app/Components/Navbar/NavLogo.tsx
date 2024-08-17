import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function NavLogo({ href }: { href?: string }) {
  return (
    <Link href={href ?? "/"}>
      <Image
        src={"/logo.svg"}
        priority
        unoptimized
        height={0}
        width={0}
        className="h-16 w-full"
        alt="HRMplify Logo"
      />
    </Link>
  );
}
