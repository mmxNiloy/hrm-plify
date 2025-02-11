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
import {
  IEmployeeAttendanceStats,
  IEmployeeLeaveStats,
} from "@/schema/StatsSchema";
import { Button } from "@/components/ui/button";
import { ButtonBlue } from "@/styles/button.tailwind";
import { Label, Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import { getAttendanceStats } from "@/app/(server)/actions/employee/getAttendanceStats";

const chartConfig = {
  freq: {
    label: "Attendance Count",
  },
  absent: {
    label: "Absent",
    color: "hsl(var(--chart-2))",
  },
  present: {
    label: "Present",
    color: "hsl(var(--chart-1))",
  },
  dayoff: {
    label: "Day Off",
    color: "hsl(var(--chart-3))",
  },
  holiday: {
    label: "Holiday",
    color: "hsl(var(--chart-4))",
  },
  None: {
    label: "N/A",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export default function EmployeeAttendanceStatsCard() {
  const [leaveStats, setLeaveStats] = useState<IEmployeeAttendanceStats>();
  const [hasError, setHasError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(7);

  const limitList = useMemo(() => [7, 15, 30], []);

  const getData = useCallback(async (lim?: number) => {
    setLoading(true);

    const result = await getAttendanceStats(lim);

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
      return [{ is_present: "None", freq: 1 }];
    const present = leaveStats?.data.find((item) => item.is_present === 1) ?? {
      is_present: "present",
      freq: 0,
    };
    const offDay = leaveStats?.data.find((item) => item.is_present === 2) ?? {
      is_present: "offday",
      freq: 0,
    };
    const absent = leaveStats?.data.find((item) => item.is_present === 0) ?? {
      is_present: "absent",
      freq: 0,
    };
    const holiday = leaveStats?.data.find((item) => item.is_present === 3) ?? {
      is_present: "holiday",
      freq: 0,
    };

    return [
      {
        is_present: "present",
        freq: present.freq,
        fill: "var(--color-present)",
      },
      { is_present: "offday", freq: offDay.freq, fill: "var(--color-offday)" },
      { is_present: "absent", freq: absent.freq, fill: "var(--color-absent)" },
      {
        is_present: "holiday",
        freq: holiday.freq,
        fill: "var(--color-holiday)",
      },
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
            Attendance Statistics
          </CardTitle>
          <CardDescription className="sr-only">
            Your Attendance statistics.
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
            Attendance Statistics
          </CardTitle>
          <CardDescription className="sr-only">
            Your Attendance statistics.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-1 text-xl flex-col gap-2 items-center justify-center">
          <Icons.error className="size-24" />
          Failed to load data
          <Button
            disabled={loading}
            onClick={() => getData(limit)}
            size={"sm"}
            className={ButtonBlue}
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
          Attendance Statistics
        </CardTitle>
        <CardDescription className="sr-only">
          Your Attendance statistics.
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
              nameKey={"is_present"}
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
                          Records
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
