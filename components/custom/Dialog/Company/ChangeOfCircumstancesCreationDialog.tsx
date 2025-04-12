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
import EmployeeDetailForm from "../../Form/Company/Employee/EmployeeDetailForm";
import PassportAndVisaDetailForm from "../../Form/Company/Employee/PassportAndVisaDetailForm";
import EUSSAndDBSDetailForm from "../../Form/Company/Employee/EUSSAndDBSDetailForm";
import NIDAndOtherDetailForm from "../../Form/Company/Employee/NIDAndOtherDetailForm";

type TabValue =
  | "employee-details"
  | "passport-and-visa-details"
  | "euss-and-dbs-details"
  | "nid-and-other-details";

export default function ChangeOfCircumstancesCreationDialog() {
  const [currentTab, setCurrentTab] = useState<TabValue>("employee-details");
  const [isValid, setIsValid] = useState<boolean>(false);

  const toNextTab = useCallback(() => {
    var nextTab: TabValue = currentTab;
    switch (nextTab) {
      case "employee-details":
        nextTab = "passport-and-visa-details";
        break;
      case "passport-and-visa-details":
        nextTab = "euss-and-dbs-details";
        break;
      case "euss-and-dbs-details":
        nextTab = "nid-and-other-details";
        break;
      case "nid-and-other-details":
        break;
    }

    setCurrentTab(nextTab);
  }, [currentTab]);

  const toPrevTab = useCallback(() => {
    var prevTab: TabValue = currentTab;
    switch (prevTab) {
      case "employee-details":
        break;
      case "passport-and-visa-details":
        prevTab = "employee-details";
        break;
      case "euss-and-dbs-details":
        prevTab = "passport-and-visa-details";
        break;
      case "nid-and-other-details":
        prevTab = "euss-and-dbs-details";
        break;
    }

    setCurrentTab(prevTab);
  }, [currentTab]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="bg-blue-500 hover:bg-blue-400 text-white rounded-full gap-1"
        >
          <Icons.plus /> Add a Change of Circumstances
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-screen-md lg:max-w-2xl xl:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex gap-1 items-center">
            <Icons.files /> Add a Change of Circumstances
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
          <ScrollArea className="h-[55vh] sm:h-[60vh]">
            {/* Employee creation form here */}
            <Tabs
              value={currentTab}
              defaultValue={currentTab}
              onValueChange={(v) => setCurrentTab(v as TabValue)}
            >
              <TabsList className="w-full">
                <TabsTrigger value="employee-details">
                  Employee Information
                </TabsTrigger>
                <TabsTrigger value="passport-and-visa-details">
                  Passport & Visa Details
                </TabsTrigger>
                <TabsTrigger value="euss-and-dbs-details">
                  EUSS & DBS Details
                </TabsTrigger>
                <TabsTrigger value="nid-and-other-details">
                  NID & Other Details
                </TabsTrigger>
              </TabsList>

              <TabsContent
                value="employee-details"
                className="[&[data-state=inactive]]:hidden"
                forceMount
              >
                <EmployeeDetailForm />
              </TabsContent>
              <TabsContent
                value="passport-and-visa-details"
                className="[&[data-state=inactive]]:hidden"
                forceMount
              >
                <PassportAndVisaDetailForm />
              </TabsContent>
              <TabsContent
                value="euss-and-dbs-details"
                className="[&[data-state=inactive]]:hidden"
                forceMount
              >
                <EUSSAndDBSDetailForm />
              </TabsContent>
              <TabsContent
                value="nid-and-other-details"
                className="[&[data-state=inactive]]:hidden"
                forceMount
              >
                <NIDAndOtherDetailForm />
              </TabsContent>
            </Tabs>
          </ScrollArea>

          <DialogFooter className="mt-4">
            <Button
              disabled={currentTab === "employee-details"}
              type="button"
              size="sm"
              className="rounded-full gap-1"
              onClick={toPrevTab}
              variant={"outline"}
            >
              <Icons.chevronLeft />
              Back
            </Button>
            {currentTab !== "nid-and-other-details" && (
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
            {currentTab === "nid-and-other-details" && (
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
