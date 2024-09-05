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

export default function EmployeeDrawer({ companyId }: { companyId: number }) {
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
          <Link
            href={`/dashboard/employee/company/${companyId}`}
            className="w-full"
            passHref
          >
            <DrawerClose asChild>
              <Button
                variant="ghost"
                className={cn(
                  "w-full gap-4 justify-start hover:underline",
                  path === "/dashboard/employee" ||
                    path === `/dashboard/employee/company/${companyId}`
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
                <Icons.employees /> All Employees
              </Button>
            </DrawerClose>
          </Link>

          <Link
            href={"/dashboard/employee/migrant"}
            className="w-full"
            passHref
          >
            <DrawerClose asChild>
              <Button
                variant="ghost"
                className={cn(
                  "w-full gap-4 justify-start hover:underline",
                  path === "/dashboard/employee/migrant"
                    ? "bg-blue-500 hover:bg-blue-400 text-white"
                    : ""
                )}
              >
                <Icons.users /> Migrant Employees
              </Button>
            </DrawerClose>
          </Link>

          <Link
            href={"/dashboard/employee/change-of-circumstances"}
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
                <Icons.files /> Change of Circumstances
              </Button>
            </DrawerClose>
          </Link>

          <Link
            href={"/dashboard/employee/contract-agreement"}
            className="w-full"
            passHref
          >
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
