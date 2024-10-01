"use client";
import OffDaysDataTable from "@/app/Components/Rota/OffDaysDataTable";
import DutyRosterDataTable from "@/app/Components/Rota/DutyRosterDataTable";
import ShiftManagementDataTable from "@/app/Components/Rota/ShiftManagementDataTable";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ButtonBlue } from "@/styles/button.tailwind";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserAccessDashboardPage() {
  const pathName = usePathname();
  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">User Access Management</p>

      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">User Access Management</CardTitle>
          </CardHeader>

          <CardContent>
            <ShiftManagementDataTable showOptions={true} />
          </CardContent>

          <CardFooter>
            <Link href={`${pathName}/shift`}>
              <Button className={ButtonBlue}>View All</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Off Days</CardTitle>
            <CardDescription className="sr-only">
              Off Days Table Preview Card
            </CardDescription>
          </CardHeader>

          <CardContent>
            <OffDaysDataTable showOptions={false} />
          </CardContent>

          <CardFooter>
            <Link href={`${pathName}/off-days`}>
              <Button className={ButtonBlue}>View All</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="text-lg">
            <CardTitle>Duty Roster</CardTitle>
            <CardDescription className="sr-only">
              Duty Roster Table Preview Card
            </CardDescription>
          </CardHeader>

          <CardContent>
            <DutyRosterDataTable showOptions={false} />
          </CardContent>

          <CardFooter>
            <Link href={`${pathName}/duty-roster`} passHref>
              <Button className={ButtonBlue}>View All</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
