import React, { useState } from "react";
import { IUser } from "@/schema/UserSchema";
import { IEmployeeWithUserMetadata } from "@/schema/EmployeeSchema";

interface Props {
  selectedEmployee: IEmployeeWithUserMetadata | undefined;
  setSelectedEmployee: React.Dispatch<
    React.SetStateAction<IEmployeeWithUserMetadata | undefined>
  >;
  dateOfCheck: string | undefined;
  setDateOfCheck: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const RTWFormContext = React.createContext<Props>({
  selectedEmployee: undefined,
  setSelectedEmployee: () => undefined,
  dateOfCheck: undefined,
  setDateOfCheck: () => undefined,
});

export default RTWFormContext;
