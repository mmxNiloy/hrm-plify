import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IDesignation } from "@/schema/DesignationSchema";
import { Menu } from "lucide-react";
import React from "react";
import {
  DesignationDeleteAlertDialog,
  DesignationEditDialog,
} from "../../components";

interface Props {
  data: IDesignation;
  updateAccess?: boolean;
}

export default function CellActions({ data, updateAccess }: Props) {
  return (
    <Popover>
      <PopoverTrigger disabled={!updateAccess}>
        <Menu className="size-4" />
      </PopoverTrigger>

      {updateAccess && (
        <PopoverContent align="end" className="w-40">
          <DesignationEditDialog data={data} />
          <DesignationDeleteAlertDialog designationId={data.designation_id} />
        </PopoverContent>
      )}
    </Popover>
  );
}
