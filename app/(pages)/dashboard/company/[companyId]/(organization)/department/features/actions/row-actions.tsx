import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IDepartment } from "@/schema/CompanySchema";
import { EllipsisVertical } from "lucide-react";
import React from "react";
import DepartmentEditPopover from "../../components/department-edit-popover";

export default function RowActions({ data }: { data: IDepartment }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full">
        <EllipsisVertical className="size-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <DepartmentEditPopover data={data} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
