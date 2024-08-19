import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Icons from "@/components/ui/icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import PersonalDetailForm from "./PersonalDetailForm";
import ServiceDetailForm from "./ServiceDetailForm";

export default function EmployeeCreationDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="bg-blue-500 hover:bg-blue-400 text-white rounded-full gap-1"
        >
          <Icons.plus /> Add an Employee
        </Button>
      </DialogTrigger>

      <DialogContent className="lg:max-w-2xl xl:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex gap-1 items-center">
            <Icons.employee /> Add an Employee
          </DialogTitle>
          <DialogDescription>
            Fill out the form with appropriate information.
          </DialogDescription>
          <DialogDescription className="text-red-500">
            Fields marked with asterisks (*) are required.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[70vh]">
          {/* Employee creation form here */}
          <Tabs defaultValue="personal-details">
            <TabsList className="w-full">
              <TabsTrigger value="basic-details">Basic Information</TabsTrigger>
              <TabsTrigger value="job-details">Job Details</TabsTrigger>
              <TabsTrigger value="contact-details">Contact Details</TabsTrigger>
              <TabsTrigger value="pay-details">Pay Details</TabsTrigger>
            </TabsList>

            <TabsContent value="basic-details">
              <div className="flex flex-col gap-4">
                <PersonalDetailForm />
                <ServiceDetailForm />
                {/* Todo: Add an editable table for educational details here */}
                {/* Checkout active table */}
              </div>
            </TabsContent>
            <TabsContent value="job-details">Job Details</TabsContent>
            <TabsContent value="contact-details">Contact Details</TabsContent>
            <TabsContent value="pay-details">Pay Details</TabsContent>
          </Tabs>
        </ScrollArea>

        <DialogFooter>
          <Button size="sm" className="rounded-full gap-1" variant={"outline"}>
            <Icons.chevronLeft />
            Back
          </Button>
          <Button size="sm" className="rounded-full gap-1" variant={"outline"}>
            Next
            <Icons.chevronRight />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
