import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Icons from "@/components/ui/icons";
import { Separator } from "@/components/ui/separator";
import React from "react";

export default function JobStatsSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Job Statistics</CardTitle>
        <Separator />
        <CardDescription className="sr-only">
          Job Dashboard Statistics Card
        </CardDescription>
      </CardHeader>

      <CardContent className="w-full flex flex-col text-gray-600 items-center justify-center gap-4 aspect-[3/4] sm:aspect-[2]">
        <Icons.spinner className="animate-spin size-16" />
        Loading...
      </CardContent>
    </Card>
  );
}
