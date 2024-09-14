"use server";
import React from "react";
import { CompanyByIDPageProps } from "../PageProps";
import JobDashboardStatisticsCard from "@/app/Components/Dashboard/Job/JobDashboardStatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default async function JobDashboardPage({
  params,
}: CompanyByIDPageProps) {
  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Designations Dashboard</p>
      {/* <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink
              href={`/dashboard/company/${company.company_id}`}
              className="line-clamp-1 text-ellipsis max-w-32"
            >
              {company.company_name}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Designations</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb> */}

      <div className="grid lg:grid-cols-2 gap-2">
        <JobDashboardStatisticsCard />

        <div className="grid grid-cols-3 gap-2">
          <Card className="bg-gradient-to-br from-indigo-300 to-green-200 drop-shadow-md">
            <CardHeader className="flex flex-row gap-4">
              {/* <Icons.todo className="size-8" /> */}
              <CardTitle className="text-2xl">Job Applied</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl">19</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-300 to-amber-200 drop-shadow-md">
            <CardHeader className="flex flex-row gap-4">
              {/* <Icons.todo className="size-8" /> */}
              <CardTitle className="text-2xl">Shortlisted</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl">6</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-300 to-pink-200 drop-shadow-md">
            <CardHeader className="flex flex-row gap-4">
              {/* <Icons.todo className="size-8" /> */}
              <CardTitle className="text-2xl">Interviewed</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl">6</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-amber-300 to-lime-200 drop-shadow-md">
            <CardHeader className="flex flex-row gap-4">
              {/* <Icons.todo className="size-8" /> */}
              <CardTitle className="text-2xl">Interviewed</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl">6</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-300 to-pink-200 drop-shadow-md">
            <CardHeader className="flex flex-row gap-4">
              {/* <Icons.todo className="size-8" /> */}
              <CardTitle className="text-2xl">Hired</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl">4</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-sky-300 to-emerald-200 drop-shadow-md">
            <CardHeader className="flex flex-row gap-4">
              {/* <Icons.todo className="size-8" /> */}
              <CardTitle className="text-2xl">Offered</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl">5</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-rose-300 to-orange-200 drop-shadow-md">
            <CardHeader className="flex flex-row gap-4">
              {/* <Icons.todo className="size-8" /> */}
              <CardTitle className="text-2xl">Rejected</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl">5</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-sky-300 to-violet-200 drop-shadow-md">
            <CardHeader className="flex flex-row gap-4">
              {/* <Icons.todo className="size-8" /> */}
              <CardTitle className="text-2xl">Job Posting</CardTitle>
            </CardHeader>
            <CardContent>{/* <p className="text-4xl">5</p> */}</CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-sky-300 to-green-200 drop-shadow-md">
            <CardHeader className="flex flex-row gap-4">
              {/* <Icons.todo className="size-8" /> */}
              <CardTitle className="text-2xl">Job Posting (External)</CardTitle>
            </CardHeader>
            <CardContent>{/* <p className="text-4xl">5</p> */}</CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Offer Letters</CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center justify-between">
                <p>Candidate #1</p>
                <p className="text-blue-600">$12345.00</p>
              </div>
              <div className="flex flex-row items-center justify-between text-sm">
                <p>Sent: {new Date().toLocaleDateString("en-GB")}</p>
                <p>Date of joining: {new Date().toLocaleDateString("en-GB")}</p>
              </div>
            </div>

            <Separator />

            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center justify-between">
                <p>Candidate #2</p>
                <p className="text-blue-600">$12345.00</p>
              </div>
              <div className="flex flex-row items-center justify-between text-sm">
                <p>Sent: {new Date().toLocaleDateString("en-GB")}</p>
                <p>Date of joining: {new Date().toLocaleDateString("en-GB")}</p>
              </div>
            </div>

            <Separator />

            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center justify-between">
                <p>Candidate #3</p>
                <p className="text-blue-600">$12345.00</p>
              </div>
              <div className="flex flex-row items-center justify-between text-sm">
                <p>Sent: {new Date().toLocaleDateString("en-GB")}</p>
                <p>Date of joining: {new Date().toLocaleDateString("en-GB")}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
