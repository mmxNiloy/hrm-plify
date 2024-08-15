import React, { useState } from "react";
import { IUser } from "@/schema/UserSchema";

type Props = {
  user: IUser | undefined;
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
};
const UserContext = React.createContext<Props>({
  user: undefined,
  setUser: () => undefined,
});

export default UserContext;
