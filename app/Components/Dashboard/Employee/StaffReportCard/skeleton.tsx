import React from "react";
import StaffReportDataTableSkeleton from "./StaffReportDataTable/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";

export default function StaffReportCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Staff Report</CardTitle>
        <Separator />
        <CardDescription className="sr-only">Staff Report Card</CardDescription>
      </CardHeader>
      <CardContent>
        <StaffReportDataTableSkeleton />
      </CardContent>

      <CardFooter className="justify-between">
        <Button
          disabled
          className="text-xs gap-1 rounded-full bg-blue-500 hover:bg-blue-400 text-white"
        >
          <Icons.visible className="size-4" /> View All
        </Button>
        <Button
          disabled
          className="text-xs gap-1 rounded-full bg-amber-500 hover:bg-amber-400 text-white"
        >
          <Icons.printer className="size-4" /> Print All
        </Button>
      </CardFooter>
    </Card>
  );
}
