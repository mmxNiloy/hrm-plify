"use client";
import React from "react";
import dynamic from "next/dynamic";
import "chart.js/auto";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { months } from "@/utils/Misc";
const Line = dynamic(() => import("react-chartjs-2").then((mod) => mod.Line), {
  ssr: false,
});
const Bar = dynamic(() => import("react-chartjs-2").then((mod) => mod.Bar), {
  ssr: false,
});

const currentMonth = new Date().getMonth();

const dataBar = {
  labels: Array.from({ length: 4 }, (_, index) => {
    var nextMonthIndex = currentMonth - 4 + index;
    if (nextMonthIndex < 0) nextMonthIndex += 12;
    return months[nextMonthIndex].slice(0, 3);
  }).concat(
    Array.from({ length: 2 }, (_, index) =>
      months[(currentMonth + index) % 12].slice(0, 3)
    )
  ),
  datasets: [
    {
      label: "Holiday",
      data: [8, 3, 5, 4, 7, 5],
      backgroundColor: ["rgba(255, 99, 132, 0.2)"],
      borderColor: ["rgba(255, 99, 132, 1)"],
      borderWidth: 1,
    },
    {
      label: "Sick Leave",
      data: [0, 1, 3, 0, 0, 2],
      backgroundColor: ["rgba(153, 102, 255, 0.2)"],
      borderColor: ["rgba(153, 102, 255, 1)"],
      borderWidth: 1,
    },
    {
      label: "Unauthorised Absence",
      data: [0, 0, 1, 0, 2, 0],
      backgroundColor: ["rgba(75, 192, 192, 0.2)"],
      borderColor: ["rgba(75, 192, 192, 1)"],
      borderWidth: 1,
    },
    {
      label: "Paternity Leave",
      data: [0, 0, 1, 2, 2, 1],
      backgroundColor: ["rgba(255, 206, 86, 0.2)"],
      borderColor: ["rgba(255, 206, 86, 1)"],
      borderWidth: 1,
    },
    {
      label: "Public Duties",
      data: [2, 0, 3, 1, 0, 0],
      backgroundColor: ["rgba(54, 162, 235, 0.2)"],
      borderColor: ["rgba(54, 162, 235, 1)"],
      borderWidth: 1,
    },
    {
      label: "Maternity Leave",
      data: [3, 0, 0, 4, 0, 1],
      backgroundColor: ["rgba(255, 99, 132, 0.2)"],
      borderColor: ["rgba(255, 99, 132, 1)"],
      borderWidth: 1,
    },
  ],
};

export default function LeaveCountBarChart() {
  return (
    <div className="border rounded-md px-8 py-4 flex flex-col gap-1">
      <Label className="text-lg font-semibold">Leave Application Stats</Label>
      <Bar data={dataBar} />
    </div>
  );
}
