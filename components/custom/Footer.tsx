import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import SiteConfig from "@/utils/SiteConfig";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="flex flex-col gap-2 text-white container">
      <div className="flex items-center justify-evenly rounded-full from-blue-600 to-purple-500 bg-gradient-to-r px-8 py-2 text-white">
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
        {/* <div className="flex items-center gap-8">
          <Link href={"#?_ref=RevoloHR"} passHref>
            <Icons.fb className="size-10 cursor-pointer fill-white" />
            </Link>

            <Link href={"#?_ref=RevoloHR"} passHref>
            <Icons.linkedin className="size-10 cursor-pointer fill-white" />
            </Link>
            
          <Link href={"#?_ref=RevoloHR"} passHref>
          <Icons.youtube className="size-10 cursor-pointer fill-white" />
          </Link>

          <Link href={"#?_ref=RevoloHR"} passHref>
            <Icons.instagram className="size-10 cursor-pointer fill-white" />
          </Link>
        </div> */}
      </div>

      <div className="flex items-center justify-between">
        <p>
          &copy; {new Date().getFullYear()} {SiteConfig.siteName} HR UK, Inc.
          Alrights reserved.
        </p>
        <p>
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
    </footer>
  );
}
