"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";
import "chart.js/auto";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";

export default function EmployeeStatsCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Employee Statistics</CardTitle>
        <Separator />
        <CardDescription className="sr-only">
          Employee Statistics Card
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div
          style={{ aspectRatio: "2/1" }}
          className="w-full flex flex-col gap-2 items-center justify-center"
        >
          <Icons.spinner className="animate-spin ease-in-out" />
          Loading...
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex-grow flex flex-col gap-1">
          <p className="text-base font-bold">Summary</p>
          <Table>
            <TableBody className="text-xs">
              <TableRow className="*:p-2">
                <TableCell>Active Employees</TableCell>
                <TableCell>0</TableCell>
                <TableCell>
                  <Button
                    disabled
                    className="rounded-full bg-blue-500 hover:bg-blue-400 text-white text-xs gap-1"
                    size="sm"
                  >
                    <Icons.visible className="size-4" /> View All
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow className="*:p-2">
                <TableCell>Migrant Employees</TableCell>
                <TableCell>0</TableCell>
                <TableCell>
                  <Button
                    disabled
                    className="rounded-full bg-purple-500 hover:bg-purple-400 text-white text-xs gap-1"
                    size="sm"
                  >
                    <Icons.visible className="size-4" /> View All
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow className="*:p-2">
                <TableCell>New Hires</TableCell>
                <TableCell>0</TableCell>
                <TableCell>
                  <Button
                    disabled
                    className="rounded-full bg-green-500 hover:bg-green-400 text-white text-xs gap-1"
                    size="sm"
                  >
                    <Icons.visible className="size-4" /> View All
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardFooter>
    </Card>
  );
}
