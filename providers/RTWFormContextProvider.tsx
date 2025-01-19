"use client";
import React, { useState } from "react";
import { IEmployeeWithUserMetadata } from "@/schema/EmployeeSchema";
import RTWFormContext from "@/context/RTWFormContext";

export default function RTWFormContextProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [selectedEmployee, setSelectedEmployee] =
    useState<IEmployeeWithUserMetadata>();
  const [dateOfCheck, setDateOfCheck] = useState<string>();
  return (
    <RTWFormContext.Provider
      value={{
        selectedEmployee,
        setSelectedEmployee,
        dateOfCheck,
        setDateOfCheck,
      }}
    >
      {children}
    </RTWFormContext.Provider>
  );
}

export { RTWFormContext };
