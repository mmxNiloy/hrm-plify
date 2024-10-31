"use server";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { IUser } from "@/schema/UserSchema";
import { ButtonBlue, ButtonSuccess } from "@/styles/button.tailwind";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function GuestDashboard() {
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  redirect("/dashboard/profile");

  return (
    <main className="container flex flex-col gap-2">
      <p className="text-2xl font-semibold">
        Welcome, {user.first_name} {user.last_name}
      </p>
      <div className="grid grid-cols-2 gap-4">
        <div className="border rounded-md p-8 gap-4 flex flex-col items-center justify-center from-purple-600 to-blue-200 bg-gradient-to-br">
          <p className="text-2xl font-semibold text-white text-start w-full">
            Create a company
          </p>
          <p className="text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum sed
            tempora in repellendus libero alias quidem id quos vero dolorem
            vitae voluptate reprehenderit soluta earum illo, esse sunt
            doloremque velit.
          </p>

          <span className="flex-grow"></span>

          <Button className={cn(ButtonBlue, "w-full")}>
            <Icons.company /> Create a company
          </Button>
        </div>

        <div className="border rounded-md p-8 gap-4 flex flex-col items-center justify-center from-green-600/85 to-amber-200/25 bg-gradient-to-br">
          <p className="text-2xl font-semibold text-white text-start w-full">
            Join a company
          </p>
          <p className="text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum sed
            tempora in repellendus libero alias quidem id quos vero dolorem
            vitae voluptate reprehenderit soluta earum illo, esse sunt
            doloremque velit.
          </p>
          <div className="flex flex-col gap-2 w-full">
            <Label className="text-lg text-white">
              Join now using an invitation link or code
            </Label>
            <div className="flex gap-2">
              <Input
                className="rounded-full"
                placeholder="Join using an invitation link or code"
              />
              <Button className={ButtonSuccess}>Join</Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
