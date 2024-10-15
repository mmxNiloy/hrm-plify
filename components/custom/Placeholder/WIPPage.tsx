import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { ButtonBlue } from "@/styles/button.tailwind";
import Link from "next/link";
import React from "react";

export default function WIPPage() {
  return (
    <main className="relative bg-no-repeat bg-center bg-cover bg-[url('/wip-image.jpg')] w-full h-[calc(100vh-8.125rem)] flex items-center justify-center">
      <Link className="absolute bottom-0 flex left-0" href={"/"} passHref>
        <Button className={ButtonBlue}>
          <Icons.chevronLeft />
          Back to Dashboard
        </Button>
      </Link>
    </main>
  );
}
