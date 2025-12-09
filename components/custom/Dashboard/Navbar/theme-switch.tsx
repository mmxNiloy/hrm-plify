"use client";

import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import React from "react";

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  return (
    <Switch
      id="theme-switch"
      defaultChecked={theme === "dark"}
      onCheckedChange={() => {
        setTheme(theme === "dark" ? "light" : "dark");
      }}
    />
  );
}
