import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { ButtonGradient } from "@/styles/button.tailwind";
import React from "react";

export default function EmployeeOnboardingDialogSkeleton() {
  return (
    <Button disabled className={ButtonGradient}>
      <Icons.plus /> Add an Employee
    </Button>
  );
}
