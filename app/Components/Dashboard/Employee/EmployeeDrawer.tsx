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

export default function EmployeeDrawer() {
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
      <DrawerContent className="px-4 h-screen gap-1 md:gap-2 top-0 right-auto left-0 mt-0 min-w-64 rounded-none">
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
            Naviation drawer for Employee Dashboard
          </DrawerDescription>
        </DrawerHeader>
        <Separator />
        <div className="flex flex-col gap-2">
          <Link href={"/dashboard/employee"} className="w-full" passHref>
            <DrawerClose asChild>
              <Button
                variant="ghost"
                className={cn(
                  "w-full gap-4 justify-start hover:underline",
                  path === "/dashboard/employee"
                    ? "bg-blue-500 hover:bg-blue-400 text-white"
                    : ""
                )}
              >
                <Icons.home /> Employee Dashboard
              </Button>
            </DrawerClose>
          </Link>

          <Link href={"/dashboard/employee/all"} className="w-full" passHref>
            <DrawerClose asChild>
              <Button
                variant="ghost"
                className={cn(
                  "w-full gap-4 justify-start hover:underline",
                  path === "/dashboard/employee/all"
                    ? "bg-blue-500 hover:bg-blue-400 text-white"
                    : ""
                )}
              >
                <Icons.employee /> Employee
              </Button>
            </DrawerClose>
          </Link>

          <Accordion
            type="single"
            collapsible
            defaultValue={
              path === "/dashboard/employee/change-of-circumstances" ||
              path == "/dashboard/employee/change-of-circumstances/add"
                ? "change-of-circumstances"
                : undefined
            }
          >
            <AccordionItem value="change-of-circumstances">
              <AccordionTrigger>
                <Button variant="ghost" className="w-full gap-4 justify-start">
                  <Icons.edit /> Change of Circumstances
                </Button>
              </AccordionTrigger>
              <AccordionContent>
                <Link
                  href={"?_ref=change_of_circumstances_add"}
                  className="w-full"
                  passHref
                >
                  <DrawerClose asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full gap-4 justify-start hover:underline",
                        path ===
                          "/dashboard/employee/change-of-circumstances/add"
                          ? "bg-blue-500 hover:bg-blue-400 text-white"
                          : ""
                      )}
                    >
                      <Icons.plus /> Add
                    </Button>
                  </DrawerClose>
                </Link>
                <Link
                  href={"?_ref=change_of_circumstances_view"}
                  className="w-full"
                  passHref
                >
                  <DrawerClose asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full gap-4 justify-start hover:underline",
                        path === "/dashboard/employee/change-of-circumstances"
                          ? "bg-blue-500 hover:bg-blue-400 text-white"
                          : ""
                      )}
                    >
                      <Icons.visible /> View
                    </Button>
                  </DrawerClose>
                </Link>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Link href={"?_ref=contract-agreement"} className="w-full" passHref>
            <DrawerClose asChild>
              <Button
                variant="ghost"
                className={cn(
                  "w-full gap-4 justify-start hover:underline",
                  path === "/dashboard/employee/contract-agreement"
                    ? "bg-blue-500 hover:bg-blue-400 text-white"
                    : ""
                )}
              >
                <Icons.handshake /> Contract Agreement
              </Button>
            </DrawerClose>
          </Link>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
