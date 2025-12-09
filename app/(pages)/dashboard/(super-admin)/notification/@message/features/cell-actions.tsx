import React from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { IContactDemo } from "@/schema/IContactDemoSchema";
import DemoContactDeleteAlertDialog from "../components/demo-contact-delete-alert-dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Props {
  data: IContactDemo;
}

export default function CellActions({ data }: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"ghost"}
          size={"icon"}
          className="size-6 [&_svg]:size-4"
        >
          <Menu />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-40">
        <DemoContactDeleteAlertDialog id={data.id} />
      </PopoverContent>
    </Popover>
  );
}
