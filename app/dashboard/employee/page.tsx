"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import EmployeePageCompanyDataTable from "@/app/Components/Dashboard/Employee/EmployeePageCompanyDataTable";
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
    {
      label: "Migrant Employees",
      data: [5, 6, 6, 6, 6, 7],
      backgroundColor: ["rgba(98, 24, 168, 0.2)"],
      borderColor: ["rgba(98, 24, 168, 1)"],
      borderWidth: 1,
    },
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

export default function EmployeeDashboard() {
  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Employee Dashboard</p>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Employee</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid lg:grid-cols-2 gap-2">
        {/* List of companies goes here */}
        <div className="col-span-full">
          <EmployeePageCompanyDataTable />
        </div>

        {/* Placeholder content */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Employee Statistics</CardTitle>
            <Separator />
            <CardDescription className="sr-only">
              Employee Statistics Card
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Bar data={empStats} />
          </CardContent>
          <CardFooter>
            <div className="flex-grow flex flex-col gap-1">
              <p className="text-base font-bold">Summary</p>
              <Table>
                <TableBody className="text-xs">
                  <TableRow className="*:p-2">
                    <TableCell>Active Employees</TableCell>
                    <TableCell>22</TableCell>
                    <TableCell>
                      <Button
                        className="rounded-full bg-blue-500 hover:bg-blue-400 text-white text-xs gap-1"
                        size="sm"
                      >
                        <Icons.visible className="size-4" /> View All
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow className="*:p-2">
                    <TableCell>Migrant Employees</TableCell>
                    <TableCell>7</TableCell>
                    <TableCell>
                      <Button
                        className="rounded-full bg-purple-500 hover:bg-purple-400 text-white text-xs gap-1"
                        size="sm"
                      >
                        <Icons.visible className="size-4" /> View All
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow className="*:p-2">
                    <TableCell>New Hires</TableCell>
                    <TableCell>2</TableCell>
                    <TableCell>
                      <Button
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

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Staff Report</CardTitle>
            <Separator />
            <CardDescription className="sr-only">
              Staff Report Card
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader className="bg-blue-500">
                <TableRow className="*:text-white text-xs">
                  <TableHead className="text-nowrap">Employee ID</TableHead>
                  <TableHead>Full name</TableHead>
                  <TableHead>Job title</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead></TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {Array.from({ length: 5 }, (_, index) => index + 1).map(
                  (item) => (
                    <TableRow
                      key={`example-employee-${item}`}
                      className="text-xs"
                    >
                      <TableCell>Emp #{item}</TableCell>
                      <TableCell>John Doe #{item}</TableCell>
                      <TableCell>Example job title #{item}</TableCell>
                      <TableCell>Example address #{item}</TableCell>
                      <TableCell>
                        <Button
                          className="text-xs gap-1 rounded-full bg-blue-500 hover:bg-blue-400 text-white"
                          size={"icon"}
                        >
                          <Icons.visible className="size-4" />
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          className="text-xs gap-1 rounded-full bg-amber-500 hover:bg-amber-400 text-white"
                          size="icon"
                        >
                          <Icons.printer className="size-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </CardContent>

          <CardFooter className="justify-between">
            <Button className="text-xs gap-1 rounded-full bg-blue-500 hover:bg-blue-400 text-white">
              <Icons.visible className="size-4" /> View All
            </Button>
            <Button className="text-xs gap-1 rounded-full bg-amber-500 hover:bg-amber-400 text-white">
              <Icons.printer className="size-4" /> Print All
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
