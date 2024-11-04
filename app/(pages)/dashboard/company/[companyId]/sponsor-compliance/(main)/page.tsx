import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import Link from "next/link";
import React from "react";

export default function SponsorCompliancePage() {
  return (
    <Link
      className="w-fit"
      target="_blank"
      href={"https://www.gov.uk/view-right-to-work"}
      passHref
    >
      <Button className="text-lg font-semibold gap-2" variant={"link"}>
        <Icons.scale />
        <p>Right to Work</p>
        <Icons.externalLink className="self-start size-4" />
      </Button>
    </Link>
  );
}
