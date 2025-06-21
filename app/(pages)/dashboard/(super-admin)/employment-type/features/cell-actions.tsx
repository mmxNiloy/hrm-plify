"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
import { Button } from "@/components/ui/button";
import { Edit, EllipsisVertical, HistoryIcon, Trash } from "lucide-react";
import EmploymentTypeEditDialog from "../components/employment-type-edit-dialog";
import { IEmploymentType } from "@/schema/EmploymentTypeSchema";
import EmploymentTypeToggleAlertDialog from "../components/employment-type-toggle-alert-dialog";
import { cn } from "@/lib/utils";

interface Props {
  data: IEmploymentType;
}

export default function CellActions({ data }: Props) {
  // TODO: Add state management here for on-success dismiss.
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          variant={"ghost"}
          size={"icon"}
          className="[&_svg]:size-4 rounded-full size-6"
        >
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <EmploymentTypeEditDialog
          size="sm"
          data={data}
          variant="ghost"
          className="w-full justify-start [&_svg]:size-4 text-xs px-2 gap-0.5"
        >
          <Edit className="mr-1 size-4" />
          Edit
        </EmploymentTypeEditDialog>

        <EmploymentTypeToggleAlertDialog
          size="sm"
          variant={"ghost"}
          className={cn(
            "w-full justify-start [&_svg]:size-4 px-2 gap-0.5",
            data.isActive
              ? "text-red-500 hover:text-red-400"
              : "text-blue-500 hover:text-blue-400"
          )}
          data={data}
        >
          <span className="mr-1 *:size-4">
            {data.isActive ? <Trash /> : <HistoryIcon />}
          </span>
          {data.isActive ? "Delete" : "Recover"}
        </EmploymentTypeToggleAlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
