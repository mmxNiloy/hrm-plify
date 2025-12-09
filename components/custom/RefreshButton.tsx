"use client";

import React, { useCallback, useTransition } from "react";
import { Button } from "../ui/button";
import Icons from "../ui/icons";
import { useRouter } from "next/navigation";
import { ButtonGradient } from "@/styles/button.tailwind";
import { cn } from "@/lib/utils";

export default function RefreshButton() {
  const [refreshing, startRefresh] = useTransition();

  const router = useRouter();

  const refresh = useCallback(() => {
    startRefresh(() => {
      router.refresh();
    });
  }, [router]);

  return (
    <Button
      disabled={refreshing}
      onClick={refresh}
      size={"sm"}
      className={cn("[&_svg]:size-4", ButtonGradient)}
    >
      <Icons.resend className={refreshing ? "animate-spin" : ""} /> Refresh
    </Button>
  );
}
