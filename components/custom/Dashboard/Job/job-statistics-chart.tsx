"use client";

import dynamic from "next/dynamic";
import React from "react";
import { ChartData } from "chart.js/auto";
import "chart.js/auto";
const Bar = dynamic(() => import("react-chartjs-2").then((mod) => mod.Bar), {
  ssr: false,
});

export default function JobStatisticsChart({
  data,
}: {
  data: ChartData<"bar", number[], string>;
}) {
  return (
    <>
      <div className="relative items-center justify-center w-full h-auto hidden sm:flex">
        {/* Small screen+ chart */}
        <Bar
          data={data}
          options={{
            maintainAspectRatio: true,
            responsive: true,
            aspectRatio: 2,
          }}
        />
      </div>

      <div className="relative items-center justify-center w-full h-auto flex sm:hidden">
        {/* mobile view */}
        <Bar
          data={data}
          className="w-56"
          options={{
            maintainAspectRatio: true,
            responsive: true,
            aspectRatio: 0.75,
          }}
        />
      </div>
    </>
  );
}
