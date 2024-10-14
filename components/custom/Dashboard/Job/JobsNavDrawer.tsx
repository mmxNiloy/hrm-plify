"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Icons from "@/components/ui/icons";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function JobsNavDrawer({ companyId }: { companyId: number }) {
  const path = usePathname();
  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button
          size={"icon"}
          className="rounded-e-full fixed right-auto left-0 top-1/2 bottom-auto"
        >
          <Icons.chevronRight />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="px-4 h-screen gap-1 md:gap-2 top-0 right-auto left-0 mt-0 min-w-72 rounded-none overflow-y-scroll">
        <DrawerHeader className="p-0 py-2">
          <div className="flex items-center gap-2">
            <DrawerClose asChild>
              <Button variant={"ghost"} size={"icon"} className="rounded-full">
                <Icons.chevronLeft />
              </Button>
            </DrawerClose>
            <DrawerTitle>Navigation</DrawerTitle>
          </div>

          <DrawerDescription className="sr-only">
            Naviation drawer for Jobs Dashboard
          </DrawerDescription>
        </DrawerHeader>
        <Separator />
        <div className="flex flex-col gap-2">
          <Link
            href={`/dashboard/company/${companyId}/job`}
            className="w-full"
            passHref
          >
            <DrawerClose asChild>
              <Button
                variant="ghost"
                className={cn(
                  "w-full gap-4 justify-start hover:underline",

                  path === `/dashboard/company/${companyId}/job`
                    ? "bg-blue-500 hover:bg-blue-400 text-white"
                    : ""
                )}
              >
                <Icons.home /> Jobs Dashboard
              </Button>
            </DrawerClose>
          </Link>

          {/* Jobs Navigation */}
          <Accordion type="single" collapsible>
            <AccordionItem value="job">
              <AccordionTrigger>Job</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-2">
                <Link
                  href={`/dashboard/company/${companyId}/job/all`}
                  className="w-full"
                  passHref
                >
                  <DrawerClose asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full gap-4 justify-start hover:underline",
                        path === `/dashboard/company/${companyId}/job/all`
                          ? "bg-blue-500 hover:bg-blue-400 text-white"
                          : ""
                      )}
                    >
                      Job List
                    </Button>
                  </DrawerClose>
                </Link>

                <Link
                  href={`/dashboard/company/${companyId}/job/posting`}
                  className="w-full"
                  passHref
                >
                  <DrawerClose asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full gap-4 justify-start hover:underline",
                        path === `/dashboard/company/${companyId}/job/posting`
                          ? "bg-blue-500 hover:bg-blue-400 text-white"
                          : ""
                      )}
                    >
                      Job Posting
                    </Button>
                  </DrawerClose>
                </Link>

                <Link
                  href={`/dashboard/company/${companyId}/job/published`}
                  className="w-full"
                  passHref
                >
                  <DrawerClose asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full gap-4 justify-start hover:underline",
                        path === `/dashboard/company/${companyId}/job/published`
                          ? "bg-blue-500 hover:bg-blue-400 text-white"
                          : ""
                      )}
                    >
                      Job Published
                    </Button>
                  </DrawerClose>
                </Link>

                <Link
                  href={`/dashboard/company/${companyId}/job/applied`}
                  className="w-full"
                  passHref
                >
                  <DrawerClose asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full gap-4 justify-start hover:underline",
                        path === `/dashboard/company/${companyId}/job/applied`
                          ? "bg-blue-500 hover:bg-blue-400 text-white"
                          : ""
                      )}
                    >
                      Job Applied
                    </Button>
                  </DrawerClose>
                </Link>

                <Link
                  href={`/dashboard/company/${companyId}/job/short-listing`}
                  className="w-full"
                  passHref
                >
                  <DrawerClose asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full gap-4 justify-start hover:underline",
                        path ===
                          `/dashboard/company/${companyId}/job/short-listing`
                          ? "bg-blue-500 hover:bg-blue-400 text-white"
                          : ""
                      )}
                    >
                      Short Listing
                    </Button>
                  </DrawerClose>
                </Link>

                <Link
                  href={`/dashboard/company/${companyId}/job/interview`}
                  className="w-full"
                  passHref
                >
                  <DrawerClose asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full gap-4 justify-start hover:underline",
                        path === `/dashboard/company/${companyId}/job/interview`
                          ? "bg-blue-500 hover:bg-blue-400 text-white"
                          : ""
                      )}
                    >
                      Interview
                    </Button>
                  </DrawerClose>
                </Link>

                <Link
                  href={`/dashboard/company/${companyId}/job/hired`}
                  className="w-full"
                  passHref
                >
                  <DrawerClose asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full gap-4 justify-start hover:underline",
                        path === `/dashboard/company/${companyId}/job/hired`
                          ? "bg-blue-500 hover:bg-blue-400 text-white"
                          : ""
                      )}
                    >
                      Hired
                    </Button>
                  </DrawerClose>
                </Link>

                <Link
                  href={`/dashboard/company/${companyId}/job/rejected`}
                  className="w-full"
                  passHref
                >
                  <DrawerClose asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full gap-4 justify-start hover:underline",
                        path === `/dashboard/company/${companyId}/job/rejected`
                          ? "bg-blue-500 hover:bg-blue-400 text-white"
                          : ""
                      )}
                    >
                      Rejected
                    </Button>
                  </DrawerClose>
                </Link>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Link
            href={`/dashboard/company/${companyId}/job/offer-letter`}
            className="w-full"
            passHref
          >
            <DrawerClose asChild>
              <Button
                variant="ghost"
                className={cn(
                  "w-full gap-4 justify-start hover:underline",
                  path === `/dashboard/company/${companyId}/job/offer-letter`
                    ? "bg-blue-500 hover:bg-blue-400 text-white"
                    : ""
                )}
              >
                Generate Offer Letter
              </Button>
            </DrawerClose>
          </Link>

          <Link
            href={`/dashboard/company/${companyId}/job/search`}
            className="w-full"
            passHref
          >
            <DrawerClose asChild>
              <Button
                variant="ghost"
                className={cn(
                  "w-full gap-4 justify-start hover:underline",
                  path === `/dashboard/company/${companyId}/job/search`
                    ? "bg-blue-500 hover:bg-blue-400 text-white"
                    : ""
                )}
              >
                Search
              </Button>
            </DrawerClose>
          </Link>

          <Link
            href={`/dashboard/company/${companyId}/job/search/status`}
            className="w-full"
            passHref
          >
            <DrawerClose asChild>
              <Button
                variant="ghost"
                className={cn(
                  "w-full gap-4 justify-start hover:underline",
                  path === `/dashboard/company/${companyId}/job/search/status`
                    ? "bg-blue-500 hover:bg-blue-400 text-white"
                    : ""
                )}
              >
                Status Search
              </Button>
            </DrawerClose>
          </Link>

          <Link
            href={`/dashboard/company/${companyId}/job/message-center`}
            className="w-full"
            passHref
          >
            <DrawerClose asChild>
              <Button
                variant="ghost"
                className={cn(
                  "w-full gap-4 justify-start hover:underline",
                  path === `/dashboard/company/${companyId}/job/message-center`
                    ? "bg-blue-500 hover:bg-blue-400 text-white"
                    : ""
                )}
              >
                Message Center
              </Button>
            </DrawerClose>
          </Link>

          <Accordion type="single" collapsible>
            <AccordionItem value="mock-interview">
              <AccordionTrigger>Mock Interview</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-2">
                <Link
                  href={`/dashboard/company/${companyId}/job/mock-interview/interview-forms`}
                  className="w-full"
                  passHref
                >
                  <DrawerClose asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full gap-4 justify-start hover:underline",
                        path ===
                          `/dashboard/company/${companyId}/job/mock-interview/interview-forms`
                          ? "bg-blue-500 hover:bg-blue-400 text-white"
                          : ""
                      )}
                    >
                      Interview Forms
                    </Button>
                  </DrawerClose>
                </Link>
                <Link
                  href={`/dashboard/company/${companyId}/job/mock-interview`}
                  className="w-full"
                  passHref
                >
                  <DrawerClose asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full gap-4 justify-start hover:underline",
                        path ===
                          `/dashboard/company/${companyId}/job/mock-interview`
                          ? "bg-blue-500 hover:bg-blue-400 text-white"
                          : ""
                      )}
                    >
                      Mock Interview
                    </Button>
                  </DrawerClose>
                </Link>
                <Link
                  href={`/dashboard/company/${companyId}/job/mock-interview/capstone-assessment-report`}
                  className="w-full"
                  passHref
                >
                  <DrawerClose asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full gap-4 justify-start hover:underline",
                        path ===
                          `/dashboard/company/${companyId}/job/mock-interview/capstone-asessment-report`
                          ? "bg-blue-500 hover:bg-blue-400 text-white"
                          : ""
                      )}
                    >
                      Capstone Assessment Report
                    </Button>
                  </DrawerClose>
                </Link>
                <Link
                  href={`/dashboard/company/${companyId}/job/mock-interview/cognitive-ability-assessment-report`}
                  className="w-full"
                  passHref
                >
                  <DrawerClose asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full gap-4 justify-start hover:underline",
                        path ===
                          `/dashboard/company/${companyId}/job/cognitive-ability-assessment-report`
                          ? "bg-blue-500 hover:bg-blue-400 text-white"
                          : ""
                      )}
                    >
                      Cognitive Ability Assessment Report
                    </Button>
                  </DrawerClose>
                </Link>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
