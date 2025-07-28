import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Edit, Menu, Trash2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import BankDeleteAlertDialog from "../../components/bank-delete-alert-dialog";

interface Props {
  bankId: number;
}

export default function CellActions({ bankId }: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="justify-start [&_svg]:size-4 text-xs px-2 gap-0.5"
          size="icon"
          variant={"ghost"}
        >
          <Menu />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40" align="end">
        <Link href={`/dashboard/bank/${bankId}`} passHref>
          <Button
            className="w-full justify-start [&_svg]:size-4 text-xs px-2 gap-0.5"
            size="sm"
            variant={"ghost"}
          >
            <Edit />
            Edit
          </Button>
        </Link>

        <BankDeleteAlertDialog
          bankId={bankId}
          className="text-red-500 hover:text-red-500/90"
          size="sm"
          variant="ghost"
        >
          <Trash2 />
          Delete
        </BankDeleteAlertDialog>
      </PopoverContent>
    </Popover>
  );
}
