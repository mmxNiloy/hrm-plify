"use client";
import { createContext } from "react";
export interface INavDrawerControlContextProps {
  closeDrawer: () => void;
}

export const NavDrawerControlContext = createContext<
  INavDrawerControlContextProps | undefined
>(undefined);
