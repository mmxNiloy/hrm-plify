import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IEmployeeWithUserMetadata } from "@/schema/EmployeeSchema";
import { Edit, Menu } from "lucide-react";
import React from "react";
import RemoveEmployeeAlertDialog from "../../components/remove-employee-alert-dialog";
import Icons from "@/components/ui/icons";
import Link from "next/link";

interface Props {
  data: IEmployeeWithUserMetadata;
  updateAccess?: boolean;
}

export default function CellActions({ data, updateAccess }: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          disabled={!updateAccess}
          variant={"ghost"}
          size="icon"
          className="size-6 [&_svg]:size-4"
        >
          <Menu />
        </Button>
      </PopoverTrigger>

      {updateAccess && (
        <PopoverContent align="end" className="w-40">
          <Link className="w-full" href={`./edit/${data.employee_id}`} passHref>
            <Button
              variant={"ghost"}
              size="sm"
              className="w-full justify-start [&_svg]:size-4 text-xs px-2 gap-0.5"
            >
              <Edit />
              Edit
            </Button>
          </Link>

          <RemoveEmployeeAlertDialog
            disabled={data.status !== "ACTIVE" && data.status !== "LEAVE"}
            data={data}
            variant={"ghost"}
            size="sm"
            className="w-full justify-start [&_svg]:size-4 text-xs px-2 gap-0.5 text-red-500 hover:text-red-500/90"
          >
            <Icons.userX />
            Remove
          </RemoveEmployeeAlertDialog>
        </PopoverContent>
      )}
    </Popover>
  );
}
