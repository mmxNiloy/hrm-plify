"use client";
import React from "react";
import { Card, CardContent } from "../ui/card";
import Icons from "../ui/icons";
import { Button } from "../ui/button";
import { ButtonGradient } from "@/styles/button.tailwind";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SiteConfig from "@/utils/SiteConfig";

export default function ErrorFallbackCard({
  error,
}: {
  error?:
    | { message: string; name?: string; cause?: string; stack?: string }
    | Error;
}) {
  const pathname = usePathname();
  const mailSubject = encodeURIComponent(`${SiteConfig.siteName} > Bug Report`);
  const mailBody = encodeURIComponent(
    `A bug has been found in the following route: ${pathname}
    Error encountered: ${error?.name}
    Error Message: ${error?.message}
    Error Cause: ${error?.cause}
    Stack Trace: ${error?.stack}
    
    Above content is auto-generated. You can provide additional information such as screenshots or how it happened to help with the debugging process.
    `
  );
  return (
    <Card className="col-span-full w-full">
      <CardContent className="w-full flex flex-col items-center justify-center gap-4 p-4">
        <Icons.rabbit className="size-16" />
        <p className="text-2xl font-bold">Oops! Something went wrong!</p>
        <p className="text-xl font-bold">
          Please try again. If the problem persists, report a bug.
        </p>
        <Link
          href={`mailto:dev.niloysarkar@gmail.com?subject=${mailSubject}&body=${mailBody}`}
          passHref
        >
          <Button className={ButtonGradient}>
            <Icons.bug />
            Report a Bug
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
