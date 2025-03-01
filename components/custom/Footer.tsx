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
      <footer className="w-10/12 grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-2 rounded-t-[4.875rem] md:pt-16 pt-8 xs:pt-4 md:px-16 px-8 xs:px-4 pb-8 from-[#017bce]/[0.078] to-[#019e8f]/[0.078] bg-gradient-to-t">
        <div className="flex flex-col gap-2 items-center justify-center md:items-start">
          <Image
            src={"/site-logo-horizontal.svg"}
            priority
            unoptimized
            height={0}
            width={0}
            className={"w-32 sm:w-40 md:w-64"}
            alt={`Revolo HR`}
          />
          <p className="font-bold text-lg sm:text-2xl md:text-3xl">
            Control Compliance, Stress Less
          </p>
        </div>

        {/* Footer navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-3 text-center sm:text-start gap-4">
          <div className="flex flex-col">
            <p className="font-bold md:text-lg">Product</p>
            <Link href={"/features"} className="sm:text-sm text-xs" passHref>
              <Button variant={"link"} className="p-0 w-full justify-start">
                Features
              </Button>
            </Link>
            <Link href={"/pricing"} className="sm:text-sm text-xs">
              <Button variant={"link"} className="p-0 w-full justify-start">
                Pricing
              </Button>
            </Link>
            <Link href={"/about"} className="sm:text-sm text-xs">
              <Button variant={"link"} className="p-0 w-full justify-start">
                About Us
              </Button>
            </Link>
          </div>
          <div className="flex flex-col">
            <p className="font-bold md:text-lg">Resources</p>
            <Link href={"/contact-us"} className="sm:text-sm text-xs" passHref>
              <Button variant={"link"} className="p-0 w-full justify-start">
                Contact Us
              </Button>
            </Link>
            {/* <Link href={"/book-a-demo"} className="sm:text-sm text-xs">
            <Button variant={"link"} className="p-0 w-full justify-start">
            Book a Demo
            </Button>
          </Link> */}
            <Link href={"/pricing"} className="sm:text-sm text-xs">
              <Button variant={"link"} className="p-0 w-full justify-start">
                Pricing
              </Button>
            </Link>
          </div>
          <div className="flex flex-col">
            <p className="font-bold md:text-lg sm:invisible">Policy</p>
            <Link
              href={"/policy/privacy"}
              className="sm:text-sm text-xs"
              passHref
            >
              <Button variant={"link"} className="p-0 w-full justify-start">
                Privacy Policy
              </Button>
            </Link>
            <Link href={"/policy/tnc"} className="sm:text-sm text-xs">
              <Button variant={"link"} className="p-0 w-full justify-start">
                Terms & Conditions
              </Button>
            </Link>
            <Link href={"/policy/gdpr"} className="sm:text-sm text-xs">
              <Button variant={"link"} className="p-0 w-full justify-start">
                GDPR Policy
              </Button>
            </Link>
          </div>
        </div>

        <span className="col-span-full h-px bg-muted-foreground/60" />
        <div
          className={
            "flex flex-col sm:flex-row items-center justify-between col-span-full"
          }
        >
          <p>
            &copy; {new Date().getFullYear()} {SiteConfig.siteName} Consultancy
            International Limited.
          </p>
          <p
            className={params.get("credits") ? "visible" : "invisible"}
            id="credits"
          >
            Made with ❤ by
            <Link
              passHref
              href="https://www.linkedin.com/in/ashirbad-sarkar-niloy/"
              target="_blank"
            >
              <Button variant={"link"} size="sm" className="text-blue-500">
                @mmxNiloy
              </Button>
            </Link>
          </p>
        </div>
        {/* <div className="flex items-center justify-evenly rounded-full from-blue-600 to-purple-500 bg-gradient-to-r px-8 py-2 text-white">
        <div className="flex flex-col gap-0.5 group cursor-pointer">
          <p className="font-bold text-lg">About Us</p>
          <span className="h-0.5 w-10 bg-[#ed1c24] group-hover:w-full transition-all" />
        </div>
        <div className="flex flex-col gap-0.5 group cursor-pointer">
          <p className="font-bold text-lg">Learn More</p>
          <span className="h-0.5 w-10 bg-[#ed1c24] group-hover:w-full transition-all" />
        </div>
        <div className="flex flex-col gap-0.5 group cursor-pointer">
          <p className="font-bold text-lg">Policies</p>
          <span className="h-0.5 w-10 bg-[#ed1c24] group-hover:w-full transition-all" />
          </div>
        <div className="flex flex-col gap-0.5 group cursor-pointer">
          <p className="font-bold text-lg">Contact Us</p>
          <span className="h-0.5 w-10 bg-[#ed1c24] group-hover:w-full transition-all" />
          </div>
      </div>

      <div
      className={cn(
        "flex items-center justify-center",
        params.get("credits") && "justify-between"
        )}
      >
        <p>
          &copy; {new Date().getFullYear()} {SiteConfig.siteName}
          Consultancy International Limited.
          </p>
        <p className={params.get("credits") ? "block" : "hidden"} id="credits">
        Made with ❤ by
          <Link
            passHref
            href="https://www.linkedin.com/in/ashirbad-sarkar-niloy/"
            target="_blank"
            >
            <Button variant={"link"} size="sm" className="text-blue-500">
            @mmxNiloy
            </Button>
            </Link>
            </p>
            </div> */}
      </footer>
    </section>
  );
}
