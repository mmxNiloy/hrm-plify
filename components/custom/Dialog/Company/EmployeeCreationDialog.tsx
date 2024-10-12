"use client";
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
import React, { useCallback, useState } from "react";
import PersonalDetailForm from "../../Form/Company/Employee/PersonalDetailForm";
import ServiceDetailForm from "../../Form/Company/Employee/ServiceDetailForm";
import { ButtonBlue } from "@/styles/button.tailwind";
import {
  DialogContentWidth,
  DialogTitleStyles,
} from "@/styles/dialog.tailwind";

type TabValue = "personal-details" | "service-details";

export default function EmployeeCreationDialog() {
  const [currentTab, setCurrentTab] = useState<TabValue>("personal-details");
  const [isValid, setIsValid] = useState<boolean>(false);

  const toNextTab = useCallback(() => {
    if (currentTab === "personal-details") {
      setCurrentTab("service-details");
    }
  }, [currentTab]);

  const toPrevTab = useCallback(() => {
    if (currentTab === "service-details") {
      setCurrentTab("personal-details");
    }
  }, [currentTab]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className={ButtonBlue}>
          <Icons.plus /> Add an Employee
        </Button>
      </DialogTrigger>

      <DialogContent className={DialogContentWidth}>
        <DialogHeader>
          <DialogTitle className={DialogTitleStyles}>
            <Icons.employee /> Add an Employee
          </DialogTitle>
          <DialogDescription>
            Fill out the form with appropriate information.
          </DialogDescription>
          <DialogDescription className="text-red-500">
            Fields marked with asterisks (*) are required.
          </DialogDescription>
        </DialogHeader>
        <form
          method="POST"
          action="/api/employee"
          encType="multipart/form-data"
        >
          <ScrollArea className="h-[70vh]">
            {/* Employee creation form here */}
            <Tabs
              value={currentTab}
              defaultValue={currentTab}
              onValueChange={(v) => setCurrentTab(v as TabValue)}
            >
              <TabsList className="w-full">
                <TabsTrigger value="personal-details">
                  Personal Information
                </TabsTrigger>
                <TabsTrigger value="service-details">
                  Service Details
                </TabsTrigger>
              </TabsList>

              <TabsContent
                value="personal-details"
                className="[&[data-state=inactive]]:hidden"
                forceMount
              >
                <PersonalDetailForm onValidityChange={setIsValid} />
              </TabsContent>
              <TabsContent
                value="service-details"
                className="[&[data-state=inactive]]:hidden"
                forceMount
              >
                <ServiceDetailForm />
              </TabsContent>
            </Tabs>
          </ScrollArea>

          <DialogFooter className="mt-4">
            <Button
              disabled={currentTab === "personal-details"}
              type="button"
              size="sm"
              className="rounded-full gap-1"
              onClick={toPrevTab}
              variant={"outline"}
            >
              <Icons.chevronLeft />
              Back
            </Button>
            {currentTab !== "service-details" && (
              <Button
                type="button"
                size="sm"
                className="rounded-full gap-1"
                onClick={toNextTab}
                variant={"outline"}
              >
                Next
                <Icons.chevronRight />
              </Button>
            )}
            {currentTab === "service-details" && (
              <Button
                disabled={!isValid}
                type="submit"
                size="sm"
                className="rounded-full gap-1 bg-green-500 hover:bg-green-400 text-white"
              >
                <Icons.check /> Submit
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
