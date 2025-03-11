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

export default function NavMenu({
  onLinkClick,
}: {
  onLinkClick?: (link: string) => void;
}) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col xl:flex-row gap-10 font-semibold">
      <div className="flex flex-col">
        <Link
          href="/features"
          className="peer"
          onClick={(e) => {
            if (onLinkClick) {
              onLinkClick(e.currentTarget.href);
            }
          }}
        >
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
        <Link
          href="/about"
          className="peer"
          onClick={(e) => {
            if (onLinkClick) {
              onLinkClick(e.currentTarget.href);
            }
          }}
        >
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
        <Link
          href="/pricing"
          className="peer"
          onClick={(e) => {
            if (onLinkClick) {
              onLinkClick(e.currentTarget.href);
            }
          }}
        >
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
        <Link
          href="/contact-us"
          className="peer"
          onClick={(e) => {
            if (onLinkClick) {
              onLinkClick(e.currentTarget.href);
            }
          }}
        >
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
