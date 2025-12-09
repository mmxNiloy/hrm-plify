"use server";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";
import getJobStats from "@/app/(server)/actions/job/get-job-stats.controller";
import JobStatsCardError from "./job-stats-card-error";
import JobStatisticsChart from "./job-statistics-chart";
import { ChartData } from "chart.js";
import { months } from "@/utils/Misc";
import JobStatsCardEmpty from "./job-stats-card-empty";

export default async function JobDashboardStatisticsCard({
  companyId,
}: {
  companyId: string;
}) {
  const jobStats = await getJobStats(companyId);

  if (jobStats.error) {
    return <JobStatsCardError />;
  }

  const stats = jobStats.payload;

  if (!stats.length) {
    return <JobStatsCardEmpty />;
  }

  const dataMonths: string[] = stats.map((stat) => {
    return months[Number.parseInt(stat.month ?? "1") - 1].slice(0, 3);
  });

  // Bar chart colors
  const getBarColor = (status: string, alpha: number = 1) => {
    switch (status) {
      case "applied":
        return `rgba(7, 79, 245, ${alpha})`;
      case "shortlisted":
        return `rgba(98, 24, 168, ${alpha})`;
      case "interviewed":
        return `rgba(46, 245, 113, ${alpha})`;
      case "hired":
        return `rgba(164, 127, 43, ${alpha})`;
      case "offered":
        return `rgba(128, 102, 233, ${alpha})`;
      default:
        return `rgba(245, 57, 43, ${alpha})`;
    }
  };

  // Group data by status
  const datapoints: Map<string, number[]> = new Map();
  stats.forEach((stat) => {
    const entry = datapoints.get(stat.job_status) ?? [];

    // if an entry exists, push to the map
    datapoints.set(stat.job_status, [
      ...entry,
      Number.parseInt(stat.total ?? "0"),
    ]);
  });

  const {
    datasets,
  }: Pick<ChartData<"bar", number[], string>, "datasets"> = {
    datasets: datapoints
      .entries()
      .map(([key, val]) => ({
        label: key,
        data: val,
        backgroundColor: [getBarColor(key, 0.2)],
        borderColor: [getBarColor(key)],
        borderWidth: 1,
      }))
      .toArray(),
  };

  const chartData: ChartData<"bar", number[], string> = {
    labels: dataMonths,
    datasets,
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Job Statistics</CardTitle>
        <Separator />
        <CardDescription className="sr-only">
          Job Dashboard Statistics Card
        </CardDescription>
      </CardHeader>

      <CardContent>
        <JobStatisticsChart data={chartData} />
      </CardContent>
    </Card>
  );
}
