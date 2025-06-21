import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
import { Button } from "@/components/ui/button";
import { EditIcon, EllipsisVertical, HistoryIcon, Trash } from "lucide-react";
import UserEditDialog from "../components/user-edit-dialog";
import { IPermission, IUser } from "@/schema/UserSchema";
import { cn } from "@/lib/utils";
import UserDeleteAlertDialog from "../components/user-delete-alert-dialog";

interface Props {
  data: IUser;
  permissions: IPermission[];
  updateAccess?: boolean;
}

export default function CellActions({
  data,
  permissions,
  updateAccess = false,
}: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          variant={"ghost"}
          size={"icon"}
          className="[&_svg]:size-4 size-6"
        >
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <UserEditDialog
          disabled={!updateAccess}
          size="sm"
          variant={"ghost"}
          className="w-full justify-start [&_svg]:size-4 text-xs px-2 gap-0.5"
          data={data}
          permissions={permissions}
        >
          <EditIcon />
          Edit
        </UserEditDialog>

        <UserDeleteAlertDialog
          disabled={!updateAccess}
          size="sm"
          variant={"ghost"}
          className={cn(
            "w-full justify-start [&_svg]:size-4 px-2 gap-0.5",
            data.status === "active"
              ? "text-red-500 hover:text-red-400"
              : "text-blue-500 hover:text-blue-400"
          )}
          userId={data.user_id}
        >
          <span className="mr-1 *:size-4">
            {data.status === "active" ? <Trash /> : <HistoryIcon />}
          </span>
          {data.status === "active" ? "Delete" : "Recover"}
        </UserDeleteAlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
