import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import Link from "next/link";
import React from "react";
const BackLinkButton = React.forwardRef<
  HTMLAnchorElement,
  React.HTMLAttributes<HTMLAnchorElement>
>(({ className, ...props }, ref) => (
  <Link
    passHref
    href={"."}
    {...props}
    className={className}
    ref={ref}
    title="Go Back"
  >
    <Button variant={"link"} size={"sm"} className="gap-2 w-full">
      <Icons.chevronLeft />
      <span className="group-data-[state=closed]/sidebar:hidden">Back</span>
    </Button>
  </Link>
));
BackLinkButton.displayName = "BackLinkButton";

export { BackLinkButton };
