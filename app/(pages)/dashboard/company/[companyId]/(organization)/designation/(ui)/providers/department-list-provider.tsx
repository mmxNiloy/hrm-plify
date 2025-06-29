"use client";
import { IDepartment } from "@/schema/CompanySchema";
import React from "react";
import DepartmentListContext from "./department-list-context";

interface Props {
  departments: IDepartment[];
  children: React.ReactNode;
}

export default function DepartmentListProvider({
  departments,
  children,
}: Props) {
  const context = DepartmentListContext;

  return (
    <context.Provider value={{ departments }}>{children}</context.Provider>
  );
}
