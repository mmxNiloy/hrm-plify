import React, { HTMLAttributes } from "react";
import { Button } from "../ui/button";
import { ButtonGradient } from "@/styles/button.tailwind";
import Link from "next/link";
import Icons from "../ui/icons";
import Image from "next/image";
import { cn } from "@/lib/utils";

const AccessDenied = React.forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      className={cn(
        "w-full h-[80vh] flex flex-col items-center justify-center",
        className
      )}
      {...props}
      ref={ref}
    >
      <Image
        src={"/access-denied.svg"}
        height={512}
        width={512}
        className="size-64 2xl:size-[48rem]"
        alt="Access denied illustration"
      />
      <div className="w-fit rounded-md flex flex-col gap-2 items-center justify-center px-4 py-2">
        <p className="text-4xl font-bold">We are sorry...</p>
        <p className="text-xl">
          The page you&apos;re trying to access has limited access.
        </p>
        <p className="text-xl">Please refer to the system administrator.</p>
        <Link href={"."} passHref>
          <Button className={ButtonGradient}>
            <Icons.chevronLeft /> Go Back
          </Button>
        </Link>
      </div>
    </div>
  );
});

AccessDenied.displayName = "AccessDenied";

export default AccessDenied;
