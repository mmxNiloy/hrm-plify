"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";
import dynamic from "next/dynamic";
import "chart.js/auto";
const Bar = dynamic(() => import("react-chartjs-2").then((mod) => mod.Bar), {
  ssr: false,
});

const empStats = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Applied",
      data: [5, 3, 0, 0, 7, 4],
      backgroundColor: ["rgba(7, 79, 245, 0.2)"],
      borderColor: ["rgba(7, 79, 245, 1)"],
      borderWidth: 1,
    },
    {
      label: "Shortlisted",
      data: [2, 1, 0, 0, 2, 1],
      backgroundColor: ["rgba(98, 24, 168, 0.2)"],
      borderColor: ["rgba(98, 24, 168, 1)"],
      borderWidth: 1,
    },
    {
      label: "Interviewed",
      data: [2, 1, 0, 0, 2, 1],
      backgroundColor: ["rgba(46, 245, 113, 0.2)"],
      borderColor: ["rgba(46, 245, 113, 1)"],
      borderWidth: 1,
    },
    {
      label: "Hired",
      data: [2, 0, 0, 0, 1, 1],
      backgroundColor: ["rgba(164, 127, 43, 0.2)"],
      borderColor: ["rgba(164, 127, 43, 1)"],
      borderWidth: 1,
    },
    {
      label: "Offered",
      data: [2, 0, 0, 0, 2, 1],
      backgroundColor: ["rgba(128, 102, 233, 0.2)"],
      borderColor: ["rgba(128, 102, 233, 1)"],
      borderWidth: 1,
    },
    {
      label: "Rejected",
      data: [1, 0, 0, 0, 1, 0],
      backgroundColor: ["rgba(245, 57, 43, 0.2)"],
      borderColor: ["rgba(245, 57, 43, 1)"],
      borderWidth: 1,
    },
  ],
};

export default function JobDashboardStatisticsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Job Statistics (WIP)</CardTitle>
        <Separator />
        <CardDescription className="sr-only">
          Job Dashboard Statistics Card
        </CardDescription>
      </CardHeader>

      <CardContent className="relative items-center justify-center w-full h-auto hidden sm:flex">
        <Bar
          data={empStats}
          options={{
            maintainAspectRatio: true,
            responsive: true,
            aspectRatio: 2,
          }}
        />
      </CardContent>
      <CardContent className="relative items-center justify-center w-full h-auto flex sm:hidden">
        <Bar
          data={empStats}
          className="w-56"
          options={{
            maintainAspectRatio: true,
            responsive: true,
            aspectRatio: 0.75,
          }}
        />
      </CardContent>
    </Card>
  );
}
