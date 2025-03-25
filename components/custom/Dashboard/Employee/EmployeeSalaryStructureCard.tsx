"use client";

import { getLeaveStats } from "@/app/(server)/actions/employee/getLeaveStats";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Icons from "@/components/ui/icons";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { IEmployeeLeaveStats } from "@/schema/StatsSchema";
import { Button } from "@/components/ui/button";
import { ButtonGradient } from "@/styles/button.tailwind";
import { ISalaryStructure } from "@/schema/Payroll";
import { getEmployeeSalaryStructure } from "@/app/(server)/actions/getEmployeeSalaryStructure";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function EmployeeSalaryStructureCard({
  employeeID,
}: {
  employeeID: number;
}) {
  const [salary, setSalary] = useState<ISalaryStructure>();
  const [hasError, setHasError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const getData = useCallback(async () => {
    setLoading(true);

    const result = await getEmployeeSalaryStructure(employeeID);

    if (result.error) {
      setHasError(true);
    } else {
      setHasError(false);
      setSalary(result.data.data);
    }

    setLoading(false);
  }, [employeeID]);

  // Populate data initially
  useEffect(() => {
    getData();
  }, [getData]);

  if (loading) {
    return (
      <Card className="flex flex-col gap-2">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Salary Structure
          </CardTitle>
          <CardDescription className="sr-only">
            Your Salary Structure.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-1 text-xl flex-col gap-2 items-center justify-center">
          <Icons.spinner className="size-24 animate-spin" />
          Loading...
        </CardContent>
      </Card>
    );
  }

  if (hasError) {
    return (
      <Card className="flex flex-col gap-2">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Salary Structure
          </CardTitle>
          <CardDescription className="sr-only">
            Your Salary Structure.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-1 text-xl flex-col gap-2 items-center justify-center">
          <Icons.error className="size-24" />
          Failed to load data
          <Button
            disabled={loading}
            onClick={getData}
            size={"sm"}
            className={ButtonGradient}
          >
            <Icons.resend /> Refresh
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col gap-2">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Salary Structure
        </CardTitle>
        <CardDescription className="sr-only">
          Your Salary Structure.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col flex-1 gap-2">
        <div className="flex flex-col gap-2 col-span-full">
          <Label>Basic Salary</Label>
          <Input
            key={`basic-salary-${salary?.basic_salary}`}
            defaultValue={salary?.basic_salary ?? 0}
            min={0}
            name="basic_salary"
            placeholder="Basic Salary"
            required
            readOnly
          />
        </div>

        <div className="flex flex-col gap-2 col-span-full">
          <Label>House Allowance</Label>
          <Input
            key={`house-allowance-${salary?.house_allowance}`}
            defaultValue={salary?.house_allowance ?? 0}
            min={0}
            name="house_allowance"
            placeholder="House Allowance"
            required
            readOnly
          />
        </div>

        <div className="flex flex-col gap-2 col-span-full">
          <Label>Medical Allowance</Label>
          <Input
            key={`medical-allowance-${salary?.medical_allowance}`}
            defaultValue={salary?.medical_allowance ?? 0}
            min={0}
            name="medical_allowance"
            placeholder="Medical Allowance"
            required
            readOnly
          />
        </div>

        <div className="flex flex-col gap-2 col-span-full">
          <Label>Transport Allowance</Label>
          <Input
            key={`transport-allowance-${salary?.transport_allowance}`}
            defaultValue={salary?.transport_allowance ?? 0}
            min={0}
            name="transport_allowance"
            placeholder="Transport Allowance"
            required
            readOnly
          />
        </div>
      </CardContent>
    </Card>
  );
}
