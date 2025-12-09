"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IDesignation } from "@/schema/DesignationSchema";
import { Menu } from "lucide-react";
import React, { useState } from "react";
import {
  DesignationDeleteAlertDialog,
  DesignationEditDialog,
} from "../../components";

interface Props {
  data: IDesignation;
  updateAccess?: boolean;
}

export default function CellActions({ data, updateAccess }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger disabled={!updateAccess}>
        <Menu className="size-4" />
      </PopoverTrigger>

      {updateAccess && (
        <PopoverContent align="end" className="w-40">
          <DesignationEditDialog data={data} />
          <DesignationDeleteAlertDialog
            onSuccess={() => setOpen(false)}
            designationId={data.designation_id}
          />
        </PopoverContent>
      )}
    </Popover>
  );
}
