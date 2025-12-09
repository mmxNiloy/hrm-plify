"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function AppSidebarBackLink() {
  const pathname = usePathname();
  if (pathname.endsWith("/dashboard")) return null;

  return (
    <Link
      href="."
      passHref
      className="w-full flex text-xs text-muted-foreground items-center justify-start gap-2 px-4 py-2 hover:bg-accent hover:text-accent-foreground"
    >
      <ChevronLeft className="size-4" /> Back
    </Link>
  );
}
