"use client";
import React, { useCallback, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import { useToast } from "@/components/ui/use-toast";
import { IUser } from "@/schema/UserSchema";

let didMount: boolean = false;

export default function UserContextProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const { toast } = useToast();

  const getSession = useCallback(async (): Promise<IUser | undefined> => {
    const req = await fetch("/api/get_session");
    const res = await req.json();
    const user = res.user as IUser;

    if (req.ok) {
      toast({
        title: `Welcome, ${user.first_name}`,
        duration: 1500,
        className: "bg-green-500 left-0 top-4",
      });
      return user as IUser;
    } else return undefined;
  }, [toast]);

  const refreshToken = useCallback(() => {
    getSession().then((token) => {
      setUser(token);
      // console.log("Auth token", token);
    });
  }, [getSession]);

  useEffect(() => {
    if (!didMount) {
      didMount = true;
      refreshToken();
    }
  }, [refreshToken]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext };
