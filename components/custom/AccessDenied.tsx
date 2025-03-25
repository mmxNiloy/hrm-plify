import React from "react";
import { Button } from "../ui/button";
import { ButtonGradient } from "@/styles/button.tailwind";
import Link from "next/link";
import Icons from "../ui/icons";
import Image from "next/image";

export default function AccessDenied() {
  return (
    <main className="w-full h-[80vh] flex flex-col items-center justify-center">
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
    </main>
  );
}
