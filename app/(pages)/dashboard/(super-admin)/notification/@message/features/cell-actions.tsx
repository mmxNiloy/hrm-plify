import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
import { Button } from "@/components/ui/button";
import { Edit, EllipsisVertical, ExternalLink, Trash2 } from "lucide-react";
import Link from "next/link";
import { IContactDemo } from "@/schema/IContactDemoSchema";
import DemoContactDeleteAlertDialog from "../components/demo-contact-delete-alert-dialog";

interface Props {
  data: IContactDemo;
}

export default function CellActions({ data }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant={"ghost"} size={"icon"}>
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DemoContactDeleteAlertDialog id={data.id} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
