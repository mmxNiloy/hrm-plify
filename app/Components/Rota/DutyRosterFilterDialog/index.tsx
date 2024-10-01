import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Icons from "@/components/ui/icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IDepartment } from "@/schema/CompanySchema";
import { IDesignation } from "@/schema/DesignationSchema";
import { IEmployeeWithUserMetadata } from "@/schema/EmployeeSchema";
import { IShift } from "@/schema/RotaSchema";
import { ButtonSuccess, ButtonWarn } from "@/styles/button.tailwind";
import { DialogContentWidth } from "@/styles/dialog.tailwind";
import React from "react";
import DutyRosterFilterFormFragment from "./form-fragment";

interface Props {
  departments?: IDepartment[];
  designations?: IDesignation[];
  employees?: IEmployeeWithUserMetadata[];
  shifts?: IShift[];
}

export default function DutyRosterFilterDialog({
  departments = [],
  designations = [],
  employees = [],
  shifts = [],
}: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={ButtonWarn}>
          <Icons.filter /> Filter Duty Roster
        </Button>
      </DialogTrigger>

      <DialogContent className={DialogContentWidth}>
        <DialogHeader>
          <DialogTitle>Filter Duty Roster</DialogTitle>
          <DialogDescription>
            Filter Duty Roster By the following fields
          </DialogDescription>
        </DialogHeader>

        <form>
          <ScrollArea className="h-[70vh]">
            <div className="grid grid-cols-1 lg:grid-cols-2 p-4 gap-4">
              <DutyRosterFilterFormFragment
                showEmployee
                departments={departments}
                designations={designations}
                employees={employees}
                shifts={shifts}
              />
            </div>
          </ScrollArea>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                className="rounded-full"
                variant={"destructive"}
                size="sm"
              >
                <Icons.cross /> Close
              </Button>
            </DialogClose>
            {/* <DialogClose asChild> */}
            <Button type="submit" className={ButtonSuccess} size="sm">
              <Icons.check /> Apply
            </Button>
            {/* </DialogClose> */}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
