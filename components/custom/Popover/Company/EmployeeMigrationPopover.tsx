"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React, { useCallback, useEffect, useState } from "react";
import AnimatedTrigger from "../AnimatedTrigger";
import Icons from "@/components/ui/icons";
import { IEmployeeWithUserMetadata } from "@/schema/EmployeeSchema";
import { ComboBox, LabelledComboBox } from "@/components/ui/combobox";
import { getFullNameOfUser } from "@/utils/Misc";
import { MultiSelect } from "../../Multiselect";
import { Button } from "@/components/ui/button";
import { ButtonSuccess } from "@/styles/button.tailwind";
import { updateEmployeesAsMigrant } from "@/app/(server)/actions/updateEmployeesAsMigrant";
import { useToast } from "@/components/ui/use-toast";
import { ToastSuccess } from "@/styles/toast.tailwind";
import { usePathname, useRouter } from "next/navigation";

export default function EmployeeMigrationPopover({
  employees,
}: {
  employees: IEmployeeWithUserMetadata[];
}) {
  const pathname = usePathname();

  const [selectedEmployees, setSelectedEmployees] = useState<string[]>(
    employees
      .filter((item) => item.is_foreign)
      .map((item) => `${item.employee_id}`)
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setSelectedEmployees(
      employees
        .filter((item) => item.is_foreign)
        .map((item) => `${item.employee_id}`)
    );
  }, [employees]);

  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = useCallback(async () => {
    setLoading(true);

    // console.log("Selected Employees", selectedEmployees);

    const emps = employees.map((item) => ({
      employee_id: item.employee_id,
      is_foreign: false,
    }));

    const result = await updateEmployeesAsMigrant(
      emps.map((item) => {
        if (selectedEmployees.find((e) => e === `${item.employee_id}`))
          return { employee_id: item.employee_id, is_foreign: true };
        else return item;
      })
    );

    if (result.error) {
      toast({
        title: "Update Failed",
        description: `Failed to update employee information. Cause: ${result.error.message}`,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Update Successful",
        className: ToastSuccess,
      });

      setLoading(false);
      setOpen(false);
      router.replace(`${pathname}?page=1&limit=5`);
    }

    setLoading(false);
  }, [employees, pathname, router, selectedEmployees, toast]);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <AnimatedTrigger
          label={"Mark Migrant Employees"}
          Icon={<Icons.usersCheck />}
        />
      </PopoverTrigger>
      <PopoverContent
        onInteractOutside={(e) => {
          if (loading) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
        className="flex flex-col gap-2"
      >
        <MultiSelect
          options={employees.map((item) => ({
            label: `${getFullNameOfUser(item.user)}${
              item.nationality ? ` (${item.nationality})` : ""
            }`,
            value: `${item.employee_id}`,
          }))}
          defaultValue={selectedEmployees}
          // value={selectedEmployees}
          onValueChange={(e) => {
            // console.log("Value Changed", e);
            setSelectedEmployees(e);
          }}
        />

        <Button
          disabled={loading}
          className={ButtonSuccess}
          onClick={handleSubmit}
        >
          <Icons.check /> Submit
        </Button>
      </PopoverContent>
    </Popover>
  );
}
