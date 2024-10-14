import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { ButtonBlue } from "@/styles/button.tailwind";
import React from "react";

export default function EmployeeOnboardingDialogSkeleton() {
  return (
    <Button disabled className={ButtonBlue}>
      <Icons.plus /> Add an Employee
    </Button>
  );
}
