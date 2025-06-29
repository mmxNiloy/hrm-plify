import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function CompanyInfoCardSkeleton() {
  return (
    <Card className="max-w-md">
      <CardContent>
        <Skeleton className="w-full aspect-video" />
      </CardContent>
      <CardHeader>
        <Skeleton className="w-full h-10" />

        <Skeleton className="w-full h-10" />

        <CardTitle className="sr-only">Company Info Card Skeleton</CardTitle>
        <CardDescription className="sr-only">
          Company Info Card Skeleton
        </CardDescription>
      </CardHeader>
      <CardContent>
        {Array.from({ length: 5 }, (_, idx) => idx).map((item) => (
          <Skeleton className="w-full h-10" key={item} />
        ))}
      </CardContent>
    </Card>
  );
}
