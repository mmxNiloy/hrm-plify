"use client";

import { getLeaveStats } from "@/app/(server)/actions/employee/getLeaveStats";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Icons from "@/components/ui/icons";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { IEmployeeLeaveStats } from "@/schema/StatsSchema";
import { Button } from "@/components/ui/button";
import { ButtonGradient } from "@/styles/button.tailwind";
import { Label, Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

const chartConfig = {
  freq: {
    label: "Leave Count",
  },
  Pending: {
    label: "Pending",
    color: "hsl(var(--chart-3))",
  },
  Approved: {
    label: "Approved",
    color: "hsl(var(--chart-1))",
  },
  Rejected: {
    label: "Rejected",
    color: "hsl(var(--chart-2))",
  },
  Cancelled: {
    label: "Cancelled",
    color: "hsl(var(--chart-4))",
  },
  None: {
    label: "N/A",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export default function EmployeeLeaveStatsCard() {
  const [leaveStats, setLeaveStats] = useState<IEmployeeLeaveStats>();
  const [hasError, setHasError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(7);

  const limitList = useMemo(() => [7, 15, 30], []);

  const getData = useCallback(async (lim?: number) => {
    setLoading(true);

    const result = await getLeaveStats(lim);

    if (result.error) {
      setLimit(7);
      setHasError(true);
    } else {
      setHasError(false);
      var mData = result.data;
      setLeaveStats(result.data);
    }

    setLoading(false);
  }, []);

  const chartData = useMemo(() => {
    if ((leaveStats?.data.length ?? 0) < 1)
      return [{ status: "None", freq: 1 }];
    const approved = leaveStats?.data.find(
      (item) => item.status === "Approved"
    ) ?? {
      status: "Approved",
      freq: 0,
    };
    const pending = leaveStats?.data.find(
      (item) => item.status === "Pending"
    ) ?? {
      status: "Pending",
      freq: 0,
    };
    const rejected = leaveStats?.data.find(
      (item) => item.status === "Rejected"
    ) ?? {
      status: "Rejected",
      freq: 0,
    };
    const cancelled = leaveStats?.data.find(
      (item) => item.status === "Cancelled"
    ) ?? {
      status: "Cancelled",
      freq: 0,
    };

    return [
      { ...approved, fill: "var(--color-Approved)" },
      { ...pending, fill: "var(--color-Pending)" },
      { ...rejected, fill: "var(--color-Rejected)" },
      { ...cancelled, fill: "var(--color-Cancelled)" },
    ];
  }, [leaveStats]);

  // Populate data initially
  useEffect(() => {
    getData(limit);
  }, [getData, limit]);

  if (loading) {
    return (
      <Card className="flex flex-col gap-2">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Leave Statistics
          </CardTitle>
          <CardDescription className="sr-only">
            Your Leave statistics.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-1 text-xl flex-col gap-2 items-center justify-center">
          <Icons.spinner className="size-24 animate-spin" />
          Loading...
        </CardContent>
      </Card>
    );
  }

  if (hasError) {
    return (
      <Card className="flex flex-col gap-2">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Leave Statistics
          </CardTitle>
          <CardDescription className="sr-only">
            Your Leave statistics.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-1 text-xl flex-col gap-2 items-center justify-center">
          <Icons.error className="size-24" />
          Failed to load data
          <Button
            disabled={loading}
            onClick={() => getData(limit)}
            size={"sm"}
            className={ButtonGradient}
          >
            <Icons.resend /> Refresh
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col gap-2">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Leave Statistics
        </CardTitle>
        <CardDescription className="sr-only">
          Your Leave statistics.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col flex-1 gap-2">
        {/* Options select */}
        <div className="flex gap-2 group *:cursor-pointer *:border *:border-blue-300 *:rounded-lg *:px-2 *:py-1 text-sm [&_svg]:size-4 *:items-center">
          {limitList.map((lim) => (
            <button
              disabled={loading}
              key={`leave-stats-limit-button-${lim}`}
              onClick={() => {
                setLimit(lim);
              }}
              type="button"
              className={cn(
                `flex gap-1 hover:bg-blue-300 hover:border-blue-200 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed`,
                limit == lim ? "bg-blue-500 text-white" : ""
              )}
            >
              <Icons.check
                className={cn(
                  `scale-0 transition-transform`,
                  limit == lim ? "scale-100" : ""
                )}
              />
              {lim} Days
            </button>
          ))}
        </div>

        {/* Pie chart */}
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] w-full"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey={"freq"}
              nameKey={"status"}
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {leaveStats?.total}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Requests
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
