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

export default function DashboardPage() {
  const [showMore, setShowMore] = useState<boolean>(false);
  return (
    <main className="container">
      <p className="text-xl font-semibold">Dashboard</p>
      <div className="flex flex-col lg:flex-row gap-2">
        <div className="h-fit flex flex-col gap-1">
          <div
            className={`flex flex-col ${
              showMore ? "" : "h-72 overflow-hidden"
            } lg:flex-grow gap-2`}
          >
            <div className="grid grid-cols-3 gap-2">
              <div className="p-4 rounded-md bg-red-300/60 flex flex-col gap-1">
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

              <div className="p-4 rounded-md bg-green-300/60 flex flex-col gap-1">
                <p className="font-bold text-xl flex gap-1">
                  <Icons.users /> Employees
                </p>
                <p className="text-sm">123 employees</p>
                <span className="flex-grow" />
                <Button className="justify-self-end rounded-full bg-blue-500 hover:bg-blue-400 gap-1">
                  <Icons.login /> Go to dashboard
                </Button>
              </div>

              <div className="p-4 rounded-md bg-blue-300/60 flex flex-col gap-1">
                <p className="font-bold text-xl flex gap-1">
                  <Icons.users /> Migrant Employees
                </p>
                <p className="text-sm">69 employees</p>
                <span className="flex-grow" />
                <Button className="justify-self-end rounded-full bg-blue-500 hover:bg-blue-400 gap-1">
                  <Icons.login /> Go to dashboard
                </Button>
              </div>

              <div className="p-4 rounded-md bg-amber-300/60 flex flex-col gap-1">
                <p className="font-bold text-xl flex gap-1">
                  <Icons.scale /> Right to work checks
                </p>
                <span className="flex-grow" />
                <Button className="justify-self-end rounded-full bg-blue-500 hover:bg-blue-400 gap-1">
                  <Icons.login /> Go to dashboard
                </Button>
              </div>

              <div className="p-4 rounded-md bg-red-300/60 flex flex-col gap-1">
                <p className="font-bold text-xl flex gap-1">
                  <Icons.search /> Recruitment process
                </p>
                <span className="flex-grow" />
                <Button className="justify-self-end rounded-full bg-blue-500 hover:bg-blue-400 gap-1">
                  <Icons.login /> Go to dashboard
                </Button>
              </div>

              <div className="p-4 rounded-md bg-green-300/60 flex flex-col gap-1">
                <p className="font-bold text-xl flex gap-1">
                  <Icons.logout /> Leave management
                </p>
                <span className="flex-grow" />
                <Button className="justify-self-end rounded-full bg-blue-500 hover:bg-blue-400 gap-1">
                  <Icons.login /> Go to dashboard
                </Button>
              </div>

              <div className="p-4 rounded-md bg-blue-300/60 flex flex-col gap-1">
                <p className="font-bold text-xl flex gap-1">
                  <Icons.money /> Payroll
                </p>
                <span className="flex-grow" />
                <Button className="justify-self-end rounded-full bg-blue-500 hover:bg-blue-400 gap-1">
                  <Icons.login /> Go to dashboard
                </Button>
              </div>

              <div className="p-4 rounded-md bg-amber-300/60 flex flex-col gap-1">
                <p className="font-bold text-xl flex gap-1">
                  <Icons.contact /> Key Contact
                </p>
                <span className="flex-grow" />
                <Button className="justify-self-end rounded-full bg-blue-500 hover:bg-blue-400 gap-1">
                  <Icons.login /> Go to dashboard
                </Button>
              </div>

              <div className="p-4 rounded-md bg-red-300/60 flex flex-col gap-1">
                <p className="font-bold text-xl flex gap-1">
                  <Icons.handshake />
                  Sponsor Management Dossier
                </p>
                <span className="flex-grow" />
                <Button className="justify-self-end rounded-full bg-blue-500 hover:bg-blue-400 gap-1">
                  <Icons.login /> Go to dashboard
                </Button>
              </div>

              <div className="p-4 rounded-md bg-green-300/60 flex flex-col gap-1">
                <p className="font-bold text-xl flex gap-1">
                  <Icons.visible />
                  Monitoring & reporting
                </p>
                <span className="flex-grow" />
                <Button className="justify-self-end rounded-full bg-blue-500 hover:bg-blue-400 gap-1">
                  <Icons.login /> Go to dashboard
                </Button>
              </div>

              <div className="p-4 rounded-md bg-blue-300/60 flex flex-col gap-1">
                <p className="font-bold text-xl flex gap-1">
                  <Icons.message /> Message center
                </p>
                <span className="flex-grow" />
                <Button className="justify-self-end rounded-full bg-blue-500 hover:bg-blue-400 gap-1">
                  <Icons.login /> Go to dashboard
                </Button>
              </div>

              <div className="p-4 rounded-md bg-amber-300/60 flex flex-col gap-1">
                <p className="font-bold text-xl flex gap-1">
                  <Icons.list /> Staff report
                </p>
                <span className="flex-grow" />
                <Button className="justify-self-end rounded-full bg-blue-500 hover:bg-blue-400 gap-1">
                  <Icons.login /> Go to dashboard
                </Button>
              </div>

              <div className="p-4 rounded-md bg-red-300/60 flex flex-col gap-1">
                <p className="font-bold text-xl flex gap-1">
                  <Icons.fileX /> Absent report
                </p>
                <span className="flex-grow" />
                <Button className="justify-self-end rounded-full bg-blue-500 hover:bg-blue-400 gap-1">
                  <Icons.login /> Go to dashboard
                </Button>
              </div>

              <div className="p-4 rounded-md bg-green-300/60 flex flex-col gap-1">
                <p className="font-bold text-xl flex gap-1">
                  <Icons.todo /> Change of Circumstances
                </p>
                <span className="flex-grow" />
                <Button className="justify-self-end rounded-full bg-blue-500 hover:bg-blue-400 gap-1">
                  <Icons.login /> Go to dashboard
                </Button>
              </div>

              <div className="p-4 rounded-md bg-blue-300/60 flex flex-col gap-1">
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
              <Button variant={"outline"} className="w-full">
                Create new schedule
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
}
