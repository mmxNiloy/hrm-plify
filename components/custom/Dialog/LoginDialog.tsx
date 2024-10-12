import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Icons from "@/components/ui/icons";
import { Separator } from "@/components/ui/separator";
import React from "react";
import LoginForm from "../Form/Auth/LoginForm";

export default function LoginDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-amber-400 hover:bg-amber-300 gap-1 md:gap-2">
          <Icons.key /> Login
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex gap-1 md:gap-2">
            <Icons.key /> Login
          </DialogTitle>
          <DialogDescription className="sr-only">
            Fill up te following form and login to HRMplify
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <LoginForm />

        <Separator />

        <div className="flex flex-col gap-1 md:gap-2">
          <p className="text-lg font-semibold text-center">
            Don&apos;t have an account?
          </p>
          <Button
            type="button"
            className="bg-blue-500 hover:bg-blue-400 gap-1 md:gap-2"
          >
            <Icons.badgeCheck /> Sign up
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
