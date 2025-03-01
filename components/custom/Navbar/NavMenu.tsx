"use client";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Icons from "@/components/ui/icons";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function NavMenu() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col md:flex-row gap-10 font-semibold">
      <div className="flex flex-col">
        <Link href="/features" passHref className="peer">
          Features
        </Link>
        <span
          className={cn(
            "h-0.5 bg-red-500 transition-all w-0 peer-hover:w-full",
            pathname === "/features" && "bg-blue-500 w-full"
          )}
        />
      </div>

      <div className="flex flex-col">
        <Link href="/about" passHref className="peer">
          About Us
        </Link>
        <span
          className={cn(
            "h-0.5 bg-red-500 transition-all w-0 peer-hover:w-full",
            pathname === "/about" && "bg-blue-500 w-full"
          )}
        />
      </div>

      <div className="flex flex-col">
        <Link href="/pricing" passHref className="peer">
          Pricing
        </Link>
        <span
          className={cn(
            "h-0.5 bg-red-500 transition-all w-0 peer-hover:w-full",
            pathname === "/pricing" && "bg-blue-500 w-full"
          )}
        />
      </div>

      <div className="flex flex-col">
        <Link href="/contact-us" passHref className="peer">
          Contact Us
        </Link>
        <span
          className={cn(
            "h-0.5 bg-red-500 transition-all w-0 peer-hover:w-full",
            pathname === "/contact-us" && "bg-blue-500 w-full"
          )}
        />
      </div>
    </div>
  );
}
