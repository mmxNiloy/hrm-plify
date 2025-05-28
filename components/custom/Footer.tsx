"use client";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import SiteConfig from "@/utils/SiteConfig";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";
import NavLogo from "./Navbar/NavLogo";
import Image from "next/image";

export default function Footer() {
  const params = useSearchParams();
  const pathname = usePathname();

  if (pathname.startsWith("/dashboard")) return null;

  return (
    <section className="w-full flex items-center justify-center">
      <footer className="w-full md:w-11/12 lg:w-10/12 grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-2 sm:rounded-t-[4rem] md:rounded-t-[4.5rem] lg:rounded-t-[4.75rem] xl:rounded-t-[4.875rem] md:pt-16 pt-4 md:px-16 px-4 pb-8 from-[#017bce]/[0.078] to-[#019e8f]/[0.078] bg-gradient-to-t">
        <div className="flex flex-col gap-2 items-center justify-center md:items-start">
          <Image
            src={"/nest-hrm-logo.png"}
            priority
            unoptimized
            height={0}
            width={0}
            className="w-24 sm:w-32 md:w-56 lg:w-64"
            alt={SiteConfig.appName}
          />
          <p className="font-bold text-sm md:text-lg lg:text-3xl text-start">
            {SiteConfig.siteDescription}
          </p>
          <div className="flex gap-1 items-center justify-center md:justify-start">
            {/* <p className="text">Find us on</p> */}
            <Link href={"#"} target="_blank" passHref>
              <Button variant={"ghost"} size={"icon"}>
                <Icons.linkedin />
              </Button>
            </Link>
            <Link href={"#"} target="_blank" passHref>
              <Button variant={"ghost"} size={"icon"}>
                <Icons.x />
              </Button>
            </Link>
            <Link href={"#"} target="_blank" passHref>
              <Button variant={"ghost"} size={"icon"}>
                <Icons.fb />
              </Button>
            </Link>
          </div>
        </div>

        {/* Footer navigation */}
        <div className="grid grid-cols-3 text-center md:text-start gap-2 md:gap-4">
          <div className="flex flex-col">
            <p className="font-bold text-sm md:text-lg">Product</p>
            <Link href={"/features"} className="text-xs md:text-sm" passHref>
              <Button
                variant={"link"}
                className="p-0 w-full justify-center md:justify-start"
              >
                Features
              </Button>
            </Link>
            <Link href={"/about"} className="text-xs md:text-sm">
              <Button
                variant={"link"}
                className="p-0 w-full justify-center md:justify-start"
              >
                About Us
              </Button>
            </Link>
          </div>
          <div className="flex flex-col">
            <p className="font-bold text-sm md:text-lg">Resources</p>
            <Link href={"/contact-us"} className="text-xs md:text-sm" passHref>
              <Button
                variant={"link"}
                className="p-0 w-full justify-center md:justify-start"
              >
                Contact Us
              </Button>
            </Link>
            <Link href={"/book-a-demo"} className="text-xs md:text-sm">
              <Button
                variant={"link"}
                className="p-0 w-full justify-center md:justify-start"
              >
                Book a Demo
              </Button>
            </Link>
            <Link href={"/pricing"} className="text-xs md:text-sm">
              <Button
                variant={"link"}
                className="p-0 w-full justify-center md:justify-start"
              >
                Pricing
              </Button>
            </Link>
          </div>
          <div className="flex flex-col">
            <p className="font-bold text-sm md:text-lg md:invisible">Policy</p>
            <Link
              href={"/policy/privacy"}
              className="text-xs md:text-sm"
              passHref
            >
              <Button
                variant={"link"}
                className="p-0 w-full justify-center md:justify-start"
              >
                Privacy Policy
              </Button>
            </Link>
            <Link href={"/policy/tnc"} className="text-xs md:text-sm">
              <Button
                variant={"link"}
                className="p-0 w-full justify-center md:justify-start"
              >
                Terms & Conditions
              </Button>
            </Link>
            <Link href={"/policy/gdpr"} className="text-xs md:text-sm">
              <Button
                variant={"link"}
                className="p-0 w-full justify-center md:justify-start"
              >
                GDPR Policy
              </Button>
            </Link>
          </div>
        </div>

        <span className="col-span-full h-px bg-muted-foreground/60" />
        <div className="flex flex-col md:flex-row items-center justify-between col-span-full gap-2 md:gap-0">
          <p className="text-xs md:text-sm text-center md:text-left">
            © {new Date().getFullYear()} {SiteConfig.appName}.
          </p>
          <p
            className={`${
              params.get("credits") ? "visible" : "invisible"
            } text-xs md:text-sm text-center md:text-right`}
            id="credits"
          >
            Made with ❤ by
            <Link
              passHref
              href="https://www.linkedin.com/in/ashirbad-sarkar-niloy/"
              target="_blank"
            >
              <Button
                variant={"link"}
                size="sm"
                className="text-blue-500 p-0 h-auto"
              >
                @mmxNiloy
              </Button>
            </Link>
          </p>
        </div>
      </footer>
    </section>
  );
}
