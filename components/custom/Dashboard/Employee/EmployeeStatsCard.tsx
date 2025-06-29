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
import dynamic from "next/dynamic";
import "chart.js/auto";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { IEmployeeWithUserMetadata } from "@/schema/EmployeeSchema";
import { IDesignation } from "@/schema/DesignationSchema";
import { differenceInCalendarDays } from "date-fns";
import Link from "next/link";
const Bar = dynamic(() => import("react-chartjs-2").then((mod) => mod.Bar), {
  ssr: false,
});

const empStats = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Employees",
      data: [15, 16, 21, 21, 20, 22],
      backgroundColor: ["rgba(7, 79, 245, 0.2)"],
      borderColor: ["rgba(7, 79, 245, 1)"],
      borderWidth: 1,
    },
    // {
    //   label: "Migrant Employees",
    //   data: [5, 6, 6, 6, 6, 7],
    //   backgroundColor: ["rgba(98, 24, 168, 0.2)"],
    //   borderColor: ["rgba(98, 24, 168, 1)"],
    //   borderWidth: 1,
    // },
    {
      label: "New Hires",
      data: [0, 1, 5, 0, 0, 2],
      backgroundColor: ["rgba(46, 245, 113, 0.2)"],
      borderColor: ["rgba(46, 245, 113, 1)"],
      borderWidth: 1,
    },
    {
      label: "Departures",
      data: [0, 0, 0, 0, 1, 0],
      backgroundColor: ["rgba(245, 57, 43, 0.2)"],
      borderColor: ["rgba(245, 57, 43, 1)"],
      borderWidth: 1,
    },
  ],
};

interface Props {
  employees: IEmployeeWithUserMetadata[];
  designations: IDesignation[];
}

export default function EmployeeStatsCard({ employees, designations }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Employee Statistics (WIP)</CardTitle>
        <Separator />
        <CardDescription className="sr-only">
          Employee Statistics Card
        </CardDescription>
      </CardHeader>

      <CardContent className="relative flex h-auto w-full items-center justify-center">
        <Bar
          options={{
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 2 / 1,
          }}
          data={empStats}
        />
      </CardContent>
      <CardFooter>
        <div className="flex-grow flex flex-col gap-1">
          <p className="text-base font-bold">Summary</p>
          <Table>
            <TableBody className="text-xs">
              <TableRow className="*:p-2">
                <TableCell>Active Employees</TableCell>
                <TableCell>{employees.length}</TableCell>
                <TableCell>
                  <Link passHref href={"./employee/all"}>
                    <Button
                      className="rounded-full bg-blue-500 hover:bg-blue-400 text-white text-xs gap-1"
                      size="sm"
                    >
                      <Icons.visible className="size-4" /> View All
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
              <TableRow className="*:p-2">
                <TableCell>Migrant Employees</TableCell>
                <TableCell>
                  {
                    employees.filter((emp) => emp.nationality !== "British")
                      .length
                  }
                </TableCell>
                <TableCell>
                  <Link href="./employee/migrant" passHref>
                    <Button
                      className="rounded-full bg-purple-500 hover:bg-purple-400 text-white text-xs gap-1"
                      size="sm"
                    >
                      <Icons.visible className="size-4" /> View All
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
              <TableRow className="*:p-2">
                <TableCell>New Hires</TableCell>
                <TableCell>
                  {
                    employees.filter(
                      (emp) =>
                        differenceInCalendarDays(
                          new Date(emp.hire_date ?? new Date()),
                          new Date()
                        ) <= 180
                    ).length
                  }
                </TableCell>
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
