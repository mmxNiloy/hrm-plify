"use server";
import React, { Suspense } from "react";
import { CompanyByIDPageProps } from "../PageProps";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import JobDashboardStatisticsCard from "@/components/custom/Dashboard/Job/JobDashboardStatsCard";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import { getCompanyDetails } from "@/app/(server)/actions/getCompanyDetails";
import { Metadata } from "next";
import SiteConfig from "@/utils/SiteConfig";
import { Skeleton } from "@/components/ui/skeleton";
import JobStatsSkeleton from "@/components/custom/Dashboard/Job/job-stats-skeleton";

export async function generateMetadata({
  params,
}: CompanyByIDPageProps): Promise<Metadata> {
  const prms = await params;
  var companyId = prms.companyId;
  const company = await getCompanyDetails(companyId);
  return {
    title: `${SiteConfig.siteName} | ${
      company.data?.company_name ?? "Company Dashboard"
    } | Job & Recruitment`,
  };
}

export default async function JobDashboardPage({
  params,
}: CompanyByIDPageProps) {
  const prms = await params;
  var companyId = prms.companyId;

  return (
    <main className="container flex flex-col gap-4 sm:gap-6 py-4 sm:py-6">
      <p className="text-lg sm:text-xl md:text-2xl font-semibold">
        Job & Recruitment Dashboard
      </p>

      <Suspense fallback={<Skeleton className="h-4 w-3/5" />}>
        <MyBreadcrumbs companyId={companyId} title="Job & Recruitment" />
      </Suspense>

      <div className="grid lg:grid-cols-2 gap-2">
        <Suspense fallback={<JobStatsSkeleton />}>
          <JobDashboardStatisticsCard companyId={companyId} />
        </Suspense>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          <p className="text-bold col-span-full">Work In Progress (WIP)</p>
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
            <CardTitle className="text-base">Offer Letters (WIP)</CardTitle>
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
