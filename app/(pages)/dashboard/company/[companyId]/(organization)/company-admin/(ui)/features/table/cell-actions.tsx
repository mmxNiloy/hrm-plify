import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ICompanyUser } from "@/schema/UserSchema";
import React from "react";
import {
  CompanyAdminDeleteAlertDialog,
  CompanyAdminEditDialog,
} from "../../components";

interface Props {
  data: ICompanyUser;
  updateAccess?: boolean;
}

export default function CellActions({ data, updateAccess }: Props) {
  return (
    <Popover>
      <PopoverTrigger disabled={!updateAccess} asChild>
        <Button size="icon" variant={"ghost"} className="[&_svg]:size-4">
          <Icons.menu />
        </Button>
      </PopoverTrigger>

      {updateAccess && (
        <PopoverContent className="w-48 flex flex-col gap-1">
          <CompanyAdminEditDialog data={data} />
          <CompanyAdminDeleteAlertDialog user_id={data.user_id} />
        </PopoverContent>
      )}
    </Popover>
  );
}
