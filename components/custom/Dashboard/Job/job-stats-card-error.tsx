"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Icons from "@/components/ui/icons";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import React, { useCallback, useTransition } from "react";

export default function JobStatsCardError() {
  const [loading, startRefresh] = useTransition();
  const router = useRouter();

  const handleRefresh = useCallback(() => {
    startRefresh(() => {
      router.refresh();
    });
  }, [router]);

  return (
    <Card className="flex flex-col flex-1">
      <CardHeader>
        <CardTitle className="text-base">Job Statistics</CardTitle>
        <Separator />
        <CardDescription className="sr-only">
          Job Dashboard Statistics Card
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col items-center justify-center w-full gap-4 flex-1">
        <Icons.error className="text-red-500 size-16" />
        <p className="sm:text-lg text-red-500">Failed to load data...</p>
        <Button
          variant={"outline"}
          disabled={loading}
          className="gap-1"
          onClick={handleRefresh}
        >
          <Icons.resend />
          Try again
        </Button>
      </CardContent>
    </Card>
  );
}
