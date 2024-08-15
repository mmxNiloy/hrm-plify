"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Icons from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

export default function LoginForm() {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  return (
    <form
      action="/api/login"
      method="POST"
      className="w-full h-fit flex flex-col gap-1 md:gap-4"
    >
      <div className="flex flex-col gap-1 justify-center">
        <Label
          htmlFor="email-input"
          className="after:content-['*'] after:ml-0.5 after:text-red-500"
        >
          Email
        </Label>
        <Input
          className="rounded-full border-primary/30"
          required
          id="email-input"
          type="email"
          placeholder="Email"
          name="email"
        />
      </div>

      <div className="flex flex-col gap-1 justify-center">
        <Label
          htmlFor="password-input"
          className="after:content-['*'] after:ml-0.5 after:text-red-500"
        >
          Password
        </Label>
        <div className="flex flex-row">
          <Input
            className="rounded-s-full border-e-0 border-y border-s border-primary/30"
            required
            minLength={8}
            id="password-input"
            type={passwordVisible ? "text" : "password"}
            placeholder="Password"
            name="password"
          />
          <Button
            className="px-2 rounded-e-full border-s-0 border-y border-e border-primary/30"
            onClick={() => setPasswordVisible(!passwordVisible)}
            type="button"
            variant={"outline"}
            size="icon"
          >
            {passwordVisible ? <Icons.hidden /> : <Icons.visible />}
          </Button>
        </div>
      </div>

      <div className="flex flex-row gap-1 items-center">
        <Checkbox id="remember-me-checkbox" name="remember-me" />
        <Label htmlFor="remember-me-checkbox">Remember me</Label>
      </div>

      <Button
        type="submit"
        size={"sm"}
        className="bg-green-500 hover:bg-green-400 text-white rounded-full gap-1 md:gap-2"
      >
        <Icons.key /> Login
      </Button>
    </form>
  );
}
