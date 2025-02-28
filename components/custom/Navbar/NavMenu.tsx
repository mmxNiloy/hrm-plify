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

function ListItem({ title, items }: { title: string; items: string[] }) {
  return (
    <li>
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <Button
            variant="link"
            className="w-full items-center justify-between hover:bg-muted/60"
          >
            {title} <Icons.chevronRight className="size-4" />
          </Button>
        </HoverCardTrigger>
        <HoverCardContent
          side="right"
          sideOffset={32}
          align="start"
          className="px-8 py-6"
        >
          <ol className="grid grid-cols-1 gap-2">
            {items.map((item) => (
              <li key={`${title}-${item}`}>
                <Button variant={"link"}>{item}</Button>
              </li>
            ))}
          </ol>
        </HoverCardContent>
      </HoverCard>
    </li>
  );
}

function ListCard({
  title,
  description,
  items,
}: {
  title: string;
  description: string;
  items: { title: string; icon: LucideIcon }[];
}) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-background p-4">
      <div className="text-pretty">
        {/* Card title */}
        <p className="text-muted-foreground font-bold">{title}</p>
        <p className="text-xs">{description}</p>
      </div>

      {/* Card content */}
      <div className="grid grid-cols-2 text-xs font-bold gap-2 *:flex *:gap-1">
        {items.map((item) => (
          <p
            className="hover:text-blue-500 hover:underline cursor-pointer"
            key={`${title}-${item.title}`}
          >
            <item.icon className="size-4" /> {item.title}
          </p>
        ))}
      </div>
    </div>
  );
}
