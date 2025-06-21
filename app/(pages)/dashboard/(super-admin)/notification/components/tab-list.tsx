"use client";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import {
  searchParamsCache,
  searchParamsParsers,
} from "@/utils/searchParamsParsers";
import { useQueryState } from "nuqs";
import React from "react";

export default function TabList() {
  const [demoOnly, setDemoOnly] = useQueryState(
    "demoOnly",
    searchParamsParsers.demoOnly
  );

  return (
    <div className="flex flex-col sm:flex-row gap-2 w-full bg-muted/40 py-1 rounded-md justify-center">
      <Button
        variant={"ghost"}
        size="sm"
        onClick={() => {
          setDemoOnly(null);
        }}
        className={cn(
          "rounded-none min-w-36",
          demoOnly == -1 && "border-b-2 border-b-blue-500"
        )}
      >
        <Icons.message /> Messages
      </Button>
      <Button
        variant={"ghost"}
        size="sm"
        onClick={() => {
          setDemoOnly(1);
        }}
        className={cn(
          "rounded-none min-w-36",
          demoOnly == 1 && "border-b-2 border-b-blue-500"
        )}
      >
        <Icons.handshake /> Demo Requests
      </Button>
    </div>
  );
}
