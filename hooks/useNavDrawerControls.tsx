"use client";
import { NavDrawerControlContext } from "@/context/NavDrawerControlContext";
import React, { useContext } from "react";

export default function useNavDrawerControls() {
  const context = useContext(NavDrawerControlContext);

  if (!context) {
    return {
      closeDrawer: () => {},
    };
  }

  return context;
}
