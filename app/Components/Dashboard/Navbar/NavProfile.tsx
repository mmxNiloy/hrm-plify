"use client";
import Icons from "@/components/ui/icons";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import React from "react";

export default function NavProfile() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex flex-col gap-2 px-4 py-2">
      <div className="w-64">
        {/* Profile card */}
        <div className="bg-accent rounded-md flex flex-col gap-2 p-2">
          <div className="flex gap-1">
            {/* Avatar */}
            <Icons.user className="size-16" />
            <div className="flex flex-col gap-1">
              <p className="w-32 text-start font-semibold">John Doe</p>
              <p className="w-32 text-start text-xs">johndoe@email.com</p>
              <p className="w-32 text-start text-xs">Designation</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="theme-switch">Dark mode</Label>
        <Switch
          id="theme-switch"
          defaultChecked={theme === "dark"}
          onCheckedChange={() => {
            setTheme(theme === "dark" ? "light" : "dark");
          }}
        />
      </div>
    </div>
  );
}
