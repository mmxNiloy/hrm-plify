"use client";
import Icons from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { INavItem } from "@/schema/SidebarSchema";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useCallback } from "react";

export default function SidebarLink({
  data,
  asCollapsibleTrigger = false,
  className,
}: {
  data: INavItem;
  asCollapsibleTrigger?: boolean;
  className?: string;
}) {
  const pathname = usePathname();

  const router = useRouter();

  const handleRedirect = useCallback(() => {
    if (
      data.hidden ||
      !data.href ||
      data.href === "#" ||
      data.disabled ||
      asCollapsibleTrigger
    )
      return;

    router.push(data.href);
  }, [asCollapsibleTrigger, data.disabled, data.hidden, data.href, router]);

  const ItemIcon = data.icon ? Icons[data.icon] : Icons.user;
  if (data.hidden) return null;

  if (
    !data.href ||
    data.href === "#" ||
    data.disabled ||
    asCollapsibleTrigger
  ) {
    return (
      <div
        data-disabled={data.disabled ? "true" : "false"}
        className={cn(
          "flex-1 flex gap-1 items-center group/sidebar-link cursor-pointer hover:bg-muted py-1 px-2 rounded-md data-[disabled=true]:cursor-not-allowed data-[disabled=true]:text-muted-foreground",
          className
        )}
      >
        {data.icon && (
          <span
            className={cn(
              "shrink-0 *:size-4",
              pathname.endsWith(data.href) ? "text-blue-500" : ""
            )}
          >
            <ItemIcon />
          </span>
        )}
        <span
          className={cn(
            "flex-1 group-hover/sidebar-link:underline",
            pathname.endsWith(data.href) ? "text-blue-500" : "text-primary"
          )}
        >
          {data.title}
        </span>
        {asCollapsibleTrigger && (
          <ChevronDown className="size-4 ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
        )}
      </div>
    );
  }
  return (
    <Link
      href={data.href}
      target={data.target}
      // onClick={handleRedirect}
      data-disabled={data.disabled ? "true" : "false"}
      className={cn(
        "cursor-pointer flex-1 flex gap-1 items-center group/sidebar-link hover:bg-muted py-1 px-2 rounded-md data-[disabled=true]:cursor-not-allowed data-[disabled=true]:text-muted-foreground",
        className
      )}
    >
      {data.icon && (
        <span
          className={cn(
            "shrink-0 *:size-4",
            pathname.endsWith(data.href) ? "text-blue-500" : ""
          )}
        >
          <ItemIcon />
        </span>
      )}
      <span
        className={cn(
          "flex-1 group-hover/sidebar-link:underline",
          pathname.endsWith(data.href) ? "text-blue-500" : "text-primary"
        )}
      >
        {data.title}
      </span>
      <span
        className={cn(
          "shrink-0 text-nowrap",
          pathname.endsWith(data.href) ? "text-blue-500" : "text-transparent"
        )}
      >
        &#8226;
      </span>
    </Link>
  );
}
