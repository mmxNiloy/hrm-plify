import React, { useState } from "react";
import { IUser } from "@/schema/UserSchema";
import { IEmployeeWithUserMetadata } from "@/schema/EmployeeSchema";

interface Props {
  eussDocError: Boolean;
  setEussDocError: React.Dispatch<React.SetStateAction<Boolean>>;
  dbsDocError: Boolean;
  setDbsDocError: React.Dispatch<React.SetStateAction<Boolean>>;
}

const EussDbsDialogContext = React.createContext<Props>({
  eussDocError: false,
  setEussDocError: () => false,
  dbsDocError: false,
  setDbsDocError: () => false,
});

export default EussDbsDialogContext;
