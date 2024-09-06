import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { ButtonBlue } from "@/styles/button.tailwind";
import { headers } from "next/headers";
import Link from "next/link";
import React from "react";

export default async function NotFound() {
  const headersList = headers();
  const referer = headersList.get("referer");
  const returnAddress = new URL(
    "./",
    referer ?? "http://localhost:3000/dashboard"
  ).href;

  return (
    <main className="bg-no-repeat bg-center bg-cover bg-[url('/not-found.jpg')] w-full h-screen flex flex-col gap-4 items-center justify-center">
      <span className="h-2/3" />
      <Link className="w-2/3" href={returnAddress} passHref>
        <Button className={cn(ButtonBlue, "w-full text-4xl py-6")}>
          <Icons.chevronLeft className="size-8" /> Go Back
        </Button>
      </Link>
    </main>
  );
}
