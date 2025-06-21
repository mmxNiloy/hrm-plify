import { logout } from "@/app/(server)/actions/logout";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import React from "react";

export default function LogOutForm() {
  return (
    <form action={logout} method="POST">
      <Button variant={"destructive"} className="gap-2 w-full" size={"sm"}>
        <LogOut />
        Logout
      </Button>
    </form>
  );
}
