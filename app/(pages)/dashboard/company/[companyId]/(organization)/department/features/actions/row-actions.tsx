"use client";

import { IDepartment } from "@/schema/CompanySchema";
import { Menu } from "lucide-react";
import React, { useState } from "react";
import DepartmentEditDialog from "../../components/department-edit-dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import DepartmentDeleteAlertDialog from "../../components/department-delete-alert-dialog";

interface Props {
  data: IDepartment;
  updateAccess?: boolean;
}

export default function RowActions({ data, updateAccess }: Props) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger disabled={!updateAccess}>
        <Menu className="size-4" />
      </PopoverTrigger>

      {updateAccess && (
        <PopoverContent align="end" className="w-40">
          <DepartmentEditDialog data={data} />
          <DepartmentDeleteAlertDialog
            onSuccess={() => setOpen(false)}
            departmentId={data.department_id}
          />
        </PopoverContent>
      )}
    </Popover>
  );
}
