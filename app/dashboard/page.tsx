"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Icons from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import "chart.js/auto";
import { Calendar } from "@/components/ui/calendar";
import LeaveBalanceCard from "../Components/Dashboard/Leave/LeaveBalanceCard";
import { IEmployeeLeave, ILeaveBalance } from "@/schema/LeaveSchema";
const Line = dynamic(() => import("react-chartjs-2").then((mod) => mod.Line), {
  ssr: false,
});
const Bar = dynamic(() => import("react-chartjs-2").then((mod) => mod.Bar), {
  ssr: false,
});

const dataDoughnut = {
  labels: ["Red", "Blue", "Yellow"],
  datasets: [
    {
      label: "Example Dataset",
      data: [300, 50, 100],
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
      ],
      hoverOffset: 4,
    },
  ],
};

const dataBar = {
  labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6"],
  datasets: [
    {
      label: "Present",
      data: [12, 19, 17, 20, 18, 13],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
    {
      label: "Absent",
      data: [8, 1, 3, 0, 2, 7],
      backgroundColor: [
        "rgba(255, 159, 64, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 99, 132, 0.2)",
      ],
      borderColor: [
        "rgba(255, 159, 64, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 99, 132, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const dataLine = {
  labels: ["March", "April", "May", "Jun", "Jul", "Aug"],
  datasets: [
    {
      label: "Revenue",
      data: [65, 59, 80, 81, 56, 92],
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    },
    {
      label: "Expenditure",
      data: [30, 47, 42, 93, 67, 59],
      fill: false,
      borderColor: "rgb(195, 45, 75)",
      tension: 0.1,
    },
  ],
};

export default function DashboardPage() {
  const [showMore, setShowMore] = useState<boolean>(false);
  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Dashboard</p>
      <div className="flex flex-col lg:flex-row gap-2">
        <div className="h-fit flex flex-col gap-1">
          <div
            className={`flex flex-col ${
              showMore ? "" : "h-72 overflow-hidden"
            } lg:flex-grow gap-2 transition-all`}
          >
            <div className="grid grid-cols-3 gap-2">
              <div className="p-4 rounded-md bg-gradient-to-br from-amber-300 to-purple-200 flex flex-col gap-1">
                <p className="font-bold text-xl flex gap-1">
                  <Icons.company /> Company Management
                </p>
                <span className="flex-grow" />
                <Button className="rounded-full bg-blue-500 hover:bg-blue-400 gap-1">
                  <Icons.login /> Go to dashboard
                </Button>
              </div>

              <div className="p-4 rounded-md bg-gradient-to-br from-pink-300 to-blue-200 flex flex-col gap-1">
                <p className="font-bold text-xl flex gap-1">
                  <Icons.company /> Organization Profile
                </p>
                <p className="text-sm">82% complete</p>
                <p className="text-xs text-red-500 before:content-['*']">
                  Please provide the missing information of your
                  organization&apos;s profile.
                </p>
                <Button className="rounded-full bg-blue-500 hover:bg-blue-400 gap-1">
                  <Icons.login /> Go to dashboard
                </Button>
              </div>

              <div className="p-4 rounded-md from-green-300 to-rose-200 bg-gradient-to-br flex flex-col gap-1">
                <p className="font-bold text-xl flex gap-1">
                  <Icons.users /> Employees
                </p>
                <p className="text-sm">123 employees</p>
                <span className="flex-grow" />
                <Button className="justify-self-end rounded-full bg-blue-500 hover:bg-blue-400 gap-1">
                  <Icons.login /> Go to dashboard
                </Button>
              </div>

              <div className="p-4 rounded-md from-blue-300 to-orange-300 bg-gradient-to-br flex flex-col gap-1">
                <p className="font-bold text-xl flex gap-1">
                  <Icons.users /> Migrant Employees
                </p>
                <p className="text-sm">69 employees</p>
                <span className="flex-grow" />
                <Button className="justify-self-end rounded-full bg-blue-500 hover:bg-blue-400 gap-1">
                  <Icons.login /> Go to dashboard
                </Button>
              </div>

              <div className="p-4 rounded-md from-amber-300 to-violet-200 bg-gradient-to-br flex flex-col gap-1">
                <p className="font-bold text-xl flex gap-1">
                  <Icons.scale /> Right to work checks
                </p>
                <span className="flex-grow" />
                <Button className="justify-self-end rounded-full bg-blue-500 hover:bg-blue-400 gap-1">
                  <Icons.login /> Go to dashboard
                </Button>
              </div>

              <div className="p-4 rounded-md from-red-300 to-sky-200 bg-gradient-to-br flex flex-col gap-1">
                <p className="font-bold text-xl flex gap-1">
                  <Icons.search /> Recruitment process
                </p>
                <span className="flex-grow" />
                <Button className="justify-self-end rounded-full bg-blue-500 hover:bg-blue-400 gap-1">
                  <Icons.login /> Go to dashboard
                </Button>
              </div>

              <div className="p-4 rounded-md from-green-300 to-rose-200 bg-gradient-to-br flex flex-col gap-1">
                <p className="font-bold text-xl flex gap-1">
                  <Icons.logout /> Leave management
                </p>
                <span className="flex-grow" />
                <Button className="justify-self-end rounded-full bg-blue-500 hover:bg-blue-400 gap-1">
                  <Icons.login /> Go to dashboard
                </Button>
              </div>

              <div className="p-4 rounded-md from-sky-300 to-purple-200 bg-gradient-to-br flex flex-col gap-1">
                <p className="font-bold text-xl flex gap-1">
                  <Icons.money /> Payroll
                </p>
                <span className="flex-grow" />
                <Button className="justify-self-end rounded-full bg-blue-500 hover:bg-blue-400 gap-1">
                  <Icons.login /> Go to dashboard
                </Button>
              </div>

              <div className="p-4 rounded-md from-amber-300 to-fuchsia-200 bg-gradient-to-br flex flex-col gap-1">
                <p className="font-bold text-xl flex gap-1">
                  <Icons.contact /> Key Contact
                </p>
                <span className="flex-grow" />
                <Button className="justify-self-end rounded-full bg-blue-500 hover:bg-blue-400 gap-1">
                  <Icons.login /> Go to dashboard
                </Button>
              </div>

              <div className="p-4 rounded-md from-red-300 to-sky-200 bg-gradient-to-br flex flex-col gap-1">
                <p className="font-bold text-xl flex gap-1">
                  <Icons.handshake />
                  Sponsor Management Dossier
                </p>
                <span className="flex-grow" />
                <Button className="justify-self-end rounded-full bg-blue-500 hover:bg-blue-400 gap-1">
                  <Icons.login /> Go to dashboard
                </Button>
              </div>

              <div className="p-4 rounded-md from-green-300 to-rose-200 bg-gradient-to-br flex flex-col gap-1">
                <p className="font-bold text-xl flex gap-1">
                  <Icons.visible />
                  Monitoring & reporting
                </p>
                <span className="flex-grow" />
                <Button className="justify-self-end rounded-full bg-blue-500 hover:bg-blue-400 gap-1">
                  <Icons.login /> Go to dashboard
                </Button>
              </div>

              <div className="p-4 rounded-md from-blue-300 to-amber-200 bg-gradient-to-br flex flex-col gap-1">
                <p className="font-bold text-xl flex gap-1">
                  <Icons.message /> Message center
                </p>
                <span className="flex-grow" />
                <Button className="justify-self-end rounded-full bg-blue-500 hover:bg-blue-400 gap-1">
                  <Icons.login /> Go to dashboard
                </Button>
              </div>

              <div className="p-4 rounded-md from-amber-300 to-purple-200 bg-gradient-to-br flex flex-col gap-1">
                <p className="font-bold text-xl flex gap-1">
                  <Icons.list /> Staff report
                </p>
                <span className="flex-grow" />
                <Button className="justify-self-end rounded-full bg-blue-500 hover:bg-blue-400 gap-1">
                  <Icons.login /> Go to dashboard
                </Button>
              </div>

              <div className="p-4 rounded-md from-red-300 to-sky-200 bg-gradient-to-br flex flex-col gap-1">
                <p className="font-bold text-xl flex gap-1">
                  <Icons.fileX /> Absent report
                </p>
                <span className="flex-grow" />
                <Button className="justify-self-end rounded-full bg-blue-500 hover:bg-blue-400 gap-1">
                  <Icons.login /> Go to dashboard
                </Button>
              </div>

              <div className="p-4 rounded-md from-teal-300 to-purple-200 bg-gradient-to-br flex flex-col gap-1">
                <p className="font-bold text-xl flex gap-1">
                  <Icons.todo /> Change of Circumstances
                </p>
                <span className="flex-grow" />
                <Button className="justify-self-end rounded-full bg-blue-500 hover:bg-blue-400 gap-1">
                  <Icons.login /> Go to dashboard
                </Button>
              </div>

              <div className="p-4 rounded-md from-blue-300 to-rose-200 bg-gradient-to-br flex flex-col gap-1">
                <p className="font-bold text-xl flex gap-1">
                  <Icons.handshake /> Contract agreement
                </p>
                <span className="flex-grow" />
                <Button className="justify-self-end rounded-full bg-blue-500 hover:bg-blue-400 gap-1">
                  <Icons.login /> Go to dashboard
                </Button>
              </div>
            </div>
          </div>
          <Button
            size={"sm"}
            className="rounded-full gap-1"
            variant={"outline"}
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? (
              <>
                <Icons.chevronUp /> Show less
              </>
            ) : (
              <>
                <Icons.chevronDown /> Show more
              </>
            )}
          </Button>

          {/* Data table */}
          <p className="mt-4 text-lg font-semibold">Visa Notification</p>
          <div className="flex flex-row justify-between items-center">
            <div>
              <Label htmlFor="tab-search">Search</Label>
              <Input
                id="tab-search"
                type="search"
                placeholder="Search data..."
              />
            </div>
            <div>
              <Label>Rows</Label>
              <Select>
                <SelectTrigger className="w-fit">
                  <SelectValue placeholder="5" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Row count</SelectLabel>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Table>
            <TableCaption>Visa Notification</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Employee ID</TableHead>
                <TableHead>Full Name</TableHead>
                <TableHead>
                  Passport N
                  <sup>
                    <u>o</u>
                  </sup>
                </TableHead>
                <TableHead>Visa Issue Date</TableHead>
                <TableHead>Visa Expiry Date</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 5 }, (_, index) => index + 1).map(
                (item) => (
                  <TableRow
                    key={`example-table-row-${item}`}
                    className="even:bg-accent"
                  >
                    <TableCell>
                      Emp-{item.toString().padStart(2, "0")}
                    </TableCell>
                    <TableCell>John Doe #{item}</TableCell>
                    <TableCell>Passport #{item}</TableCell>
                    <TableCell>Example date</TableCell>
                    <TableCell>Example expiry date</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            title="View details"
                            className="rounded-full"
                            variant="ghost"
                            size={"icon"}
                          >
                            <Icons.visible />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="lg:max-w-xl xl:max-w-2xl 2xl:max-w-4xl">
                          <DialogHeader>
                            <DialogTitle>
                              Visa details of John Doe #{item}
                            </DialogTitle>
                            <DialogDescription className="sr-only">
                              Visa details of John Doe #{item}
                            </DialogDescription>
                          </DialogHeader>
                          <ScrollArea className="h-[70vh]">
                            <div className="flex flex-col gap-1">
                              Employee details here
                            </div>
                          </ScrollArea>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex flex-col gap-2">
          <Card className="bg-accent">
            <CardHeader>
              <CardTitle className="text-base">Recent Activity</CardTitle>
              <Separator />
              <CardDescription className="sr-only">
                Recent activity card
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs">
                10:30 AM, Mon 5<sup>th</sup> Aug 2024
              </p>
              <p className="font-semibold">You&apos;ve posted a new job</p>
              <p className="text-sm">
                Kindly check the requirements and terms of work and make sure
                everything is right.
              </p>
            </CardContent>
            <CardFooter>
              <span className="flex-grow" />
              <Button
                size="sm"
                className="rounded-full bg-orange-400 hover:bg-orange-300"
              >
                See All Activity
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">Upcoming Schedule </CardTitle>
              <Select>
                <SelectTrigger className="w-fit">
                  <SelectValue placeholder="18/08/2024" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select a date</SelectLabel>
                    <SelectItem value={new Date().toLocaleDateString("en-GB")}>
                      {new Date().toLocaleDateString("en-GB")}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </CardHeader>

            <CardContent>
              <ScrollArea className="h-72">
                <div className="flex flex-col gap-1">
                  <p className="text-muted-foreground font-semibold text-sm">
                    Priority
                  </p>
                  <div className="p-4 rounded-md border flex justify-between">
                    <div className="flex flex-col gap-1">
                      <p className="text-lg">Review candidate applications</p>
                      <p className="text-xs">Today, 11:30 AM</p>
                    </div>
                    <Button variant={"ghost"} size={"icon"}>
                      <Icons.more />
                    </Button>
                  </div>

                  <p className="text-muted-foreground font-semibold text-sm">
                    Other
                  </p>
                  <div className="p-4 rounded-md border flex justify-between">
                    <div className="flex flex-col gap-1">
                      <p className="text-lg">Interview with candidates</p>
                      <p className="text-xs">Today, 10:30 AM</p>
                    </div>
                    <Button variant={"ghost"} size={"icon"}>
                      <Icons.more />
                    </Button>
                  </div>
                  <div className="p-4 rounded-md border flex justify-between">
                    <div className="flex flex-col gap-1">
                      <p className="text-lg">
                        Short meeting with product designer
                      </p>
                      <p className="text-xs">Today, 12:30 PM</p>
                    </div>
                    <Button variant={"ghost"} size={"icon"}>
                      <Icons.more />
                    </Button>
                  </div>
                  <div className="p-4 rounded-md border flex justify-between">
                    <div className="flex flex-col gap-1">
                      <p className="text-lg">Review candidate applications</p>
                      <p className="text-xs">Today, 11:30 AM</p>
                    </div>
                    <Button variant={"ghost"} size={"icon"}>
                      <Icons.more />
                    </Button>
                  </div>
                  <div className="p-4 rounded-md border flex justify-between">
                    <div className="flex flex-col gap-1">
                      <p className="text-lg">Review candidate applications</p>
                      <p className="text-xs">Today, 11:30 AM</p>
                    </div>
                    <Button variant={"ghost"} size={"icon"}>
                      <Icons.more />
                    </Button>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
            <CardFooter>
              <Button variant={"outline"} className="w-full rounded-full">
                Create new schedule
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      {/* Example graph here */}
      <div className="mt-8 grid grid-cols-2 gap-2">
        <div className="flex flex-col gap-1">
          <Label className="text-lg font-semibold">Example Chart 1</Label>
          <Line data={dataLine} />
        </div>
        <div className="flex flex-col gap-1">
          <Label className="text-lg font-semibold">Example Chart 2</Label>
          <Bar data={dataBar} />
        </div>
        <LeaveBalanceCard
          data={Array.from({ length: 3 }, (_: ILeaveBalance, index) => ({
            employee_id: index + 1,
            employee_name: `Example Employee #${index + 1}`,
            designation: "Example Designation",
            leaves: Array.from({ length: 3 }, (_: IEmployeeLeave, idx) => ({
              employee_id: index,
              leave_type: `Example Leave Type #${idx}`,
              total: 10 + idx * 5,
              leave_taken: 2 + idx * 3,
            })),
          }))}
        />

        <Card className="h-fit">
          <CardHeader className="py-4">
            <CardTitle className="text-lg font-semibold">
              Notice board
            </CardTitle>
            <Separator />
            <CardDescription className="sr-only">
              Notice board Card
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              {Array.from({ length: 5 }, (_, index) => index + 1).map(
                (item) => (
                  <div
                    key={`example-notice-#${item}`}
                    className="p-4 rounded-md border flex justify-between"
                  >
                    <div className="flex flex-col gap-1">
                      <p className="text-lg">Example notice</p>
                      <p className="text-xs">Today, 11:30 AM</p>
                    </div>
                    <Button variant={"ghost"} size={"icon"}>
                      <Icons.more />
                    </Button>
                  </div>
                )
              )}
            </div>
          </CardContent>

          <CardFooter>
            <Button className="w-full rounded-full" variant={"outline"}>
              View all
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
