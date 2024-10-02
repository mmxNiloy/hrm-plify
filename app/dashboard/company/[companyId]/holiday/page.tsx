"use client";
import { HolidayTypeDataTableColumns } from "@/app/Components/Holiday/HolidayTypeDataTableColumns";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StaticDataTable } from "@/components/ui/data-table";
import Icons from "@/components/ui/icons";
import { ButtonBlue } from "@/styles/button.tailwind";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function HolidayDashboardPage() {
  const pathname = usePathname();
  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Holiday Management</p>
      <Card>
        <CardHeader>
          <CardTitle>Holiday Types</CardTitle>
        </CardHeader>

        <CardContent>
          <StaticDataTable data={[]} columns={HolidayTypeDataTableColumns} />
        </CardContent>

        <CardFooter>
          <Link href={`${pathname}/type`} passHref>
            <Button className={ButtonBlue}>
              <Icons.visible />
              View all
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}
