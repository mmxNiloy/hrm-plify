import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AlertOctagon } from "lucide-react";
import React from "react";

export default function JobStatsCardEmpty() {
  return (
    <Card className="flex-1 flex flex-col">
      <CardHeader>
        <CardTitle className="text-base">Job Statistics</CardTitle>
        <Separator />
        <CardDescription className="sr-only">
          Job Dashboard Statistics Card
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col items-center justify-center w-full gap-4 flex-1">
        <AlertOctagon className="text-yellow-500 size-16" />
        <p className="sm:text-lg">No data</p>
      </CardContent>
    </Card>
  );
}
