"use client";
import React, { useCallback, useState } from "react";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Icons from "@/components/ui/icons";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function RegisterPage() {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [pwdErrorMsg, setPwdErrorMsg] = useState<string>("");
  const [emailErrorMsg, setEmailErrorMsg] = useState<string>("");
  const [contactErrorMsg, setContactErrorMsg] = useState<string>("");

  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const pwd = e.target.value.trim();

      if (pwd.length < 8) {
        setPwdErrorMsg("Password must be at least 8 characters long.");
      } else if (!/[a-z]/.test(pwd)) {
        setPwdErrorMsg(
          "Password must have at least one lower case letter (a-z)."
        );
      } else if (!/[A-Z]/.test(pwd)) {
        setPwdErrorMsg(
          "Password must have at least one upper case letter (A-Z)."
        );
      } else if (!/[0-9]/.test(pwd)) {
        setPwdErrorMsg("Password must have at least one digit (0-9).");
      } else if (!/[!@#$%^&*]/.test(pwd)) {
        setPwdErrorMsg(
          "Password must have at least one special symbol (!@#$%^&*)."
        );
      } else if (/[^a-zA-Z0-9!@#$%^&*]/.test(pwd)) {
        setPwdErrorMsg("Password contains invalid symbols.");
      } else {
        setPwdErrorMsg("");
      }
    },
    []
  );

  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const email = e.target.value.trim();
      if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        setEmailErrorMsg("");
      } else setEmailErrorMsg("Invalid Email address");
    },
    []
  );

  const handleContactChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const contact = e.target.value.trim();

      if (
        /^(?:\+?\d{1,3})?[-.\s]?\(?\d{1,4}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
          contact
        )
      ) {
        setContactErrorMsg("");
      } else {
        setContactErrorMsg("Invalid contact number");
      }
    },
    []
  );

  return (
    <main className="bg-[url('/bg-white-yellow-shapes.jpg')] bg-no-repeat bg-center bg-cover min-h-screen">
      <Navbar />
      <div className="gap-4 grid grid-cols-2 px-16 py-8">
        <div>TODO: Panel 1: Screen shots and features goes here.</div>
        <Card className="bg-accent/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex gap-2">
              <Icons.key className="rotate-90" /> Sign-up
            </CardTitle>
            <CardDescription>
              Sign-up to HRMplify and get started today!
            </CardDescription>
          </CardHeader>

          <form
            action="/api/register"
            method="POST"
            encType="multipart/form-data"
          >
            <CardContent>
              <div className="flex flex-col gap-2">
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="first-name-input">First Name</Label>
                    <Input
                      id="first-name-input"
                      placeholder="First Name"
                      required
                      name="first_name"
                      className="rounded-full valid:border-green-500 valid:focus-within:ring-green-500"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="last-name-input">Last Name</Label>
                    <Input
                      id="last-name-input"
                      placeholder="Last Name"
                      required
                      name="last_name"
                      className="rounded-full valid:border-green-500 valid:focus-within:ring-green-500"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="contact-input">Contact</Label>
                  <Input
                    id="contact-input"
                    type="tel"
                    placeholder="Contact"
                    required
                    name="contact"
                    onChange={handleContactChange}
                    className={cn(
                      "rounded-full",
                      contactErrorMsg.length > 0
                        ? "border-red-500 focus-visible:ring-red-500 "
                        : "valid:border-green-500 valid:focus-within:ring-green-500"
                    )}
                  />
                  {contactErrorMsg.length > 0 && (
                    <p className="text-red-500 text-xs">{contactErrorMsg}</p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="email-input">Email</Label>
                  <Input
                    id="email-input"
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    onChange={handleEmailChange}
                    className={cn(
                      "rounded-full",
                      emailErrorMsg.length > 0
                        ? "border-red-500 focus-visible:ring-red-500 "
                        : "valid:border-green-500 valid:focus-within:ring-green-500"
                    )}
                  />
                  {emailErrorMsg.length > 0 && (
                    <p className="text-xs text-red-500">{emailErrorMsg}</p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="password-input">Password</Label>
                  <div
                    className={cn(
                      "flex flex-row rounded-full has-[input:focus-visible]:ring-2 ring-offset-2",
                      pwdErrorMsg.length > 0 ? "ring-red-500" : "ring-green-500"
                    )}
                  >
                    <Input
                      id="password-input"
                      type={passwordVisible ? "text" : "password"}
                      placeholder="Password"
                      required
                      minLength={8}
                      maxLength={32}
                      name="password"
                      onChange={handlePasswordChange}
                      className={cn(
                        "rounded-s-full border-e-0 ring-0 focus-within:ring-0 focus-visible:ring-0",
                        pwdErrorMsg.length > 0
                          ? "border-red-500"
                          : "border-green-500"
                      )}
                    />
                    <Button
                      type="button"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                      size="icon"
                      variant={"outline"}
                      className={cn(
                        "rounded-e-full border-s-0 ring-0",
                        pwdErrorMsg.length > 0
                          ? "border-red-500"
                          : "border-green-500"
                      )}
                    >
                      {passwordVisible ? <Icons.hidden /> : <Icons.visible />}
                    </Button>
                  </div>
                  {pwdErrorMsg.length > 0 && (
                    <p className="text-red-500 text-xs">{pwdErrorMsg}</p>
                  )}
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-2">
              <Button
                disabled={
                  contactErrorMsg.length > 0 ||
                  emailErrorMsg.length > 0 ||
                  pwdErrorMsg.length > 0
                }
                type="submit"
                size="sm"
                className="w-full rounded-full bg-green-500 hover:bg-green-400 gap-2"
              >
                <Icons.badgeCheck /> Sign-up
              </Button>

              <p className="mt-4">Already have an account?</p>

              <Link href={"/"} passHref className="w-full">
                <Button
                  type="button"
                  size="sm"
                  className="w-full rounded-full bg-blue-500 hover:bg-blue-400 gap-2"
                >
                  <Icons.login /> Login
                </Button>
              </Link>
            </CardFooter>
          </form>
        </Card>
      </div>

      <Footer />
    </main>
  );
}
