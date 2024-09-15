"use client";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import React, { useState, useCallback } from "react";

export default function RegistrationForm() {
  // Field states
  const [firstName, setFirstName] = useState<string>("");
  const [middleName, setMiddleName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [pwdErrorMsg, setPwdErrorMsg] = useState<string>("");
  const [emailErrorMsg, setEmailErrorMsg] = useState<string>("");
  const [contactErrorMsg, setContactErrorMsg] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const pwd = e.target.value.trim();
      setPassword(pwd);

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
      setEmail(email);
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

  const handleRegister = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      e.stopPropagation();

      setLoading(true);

      // Try to call api from here
      try {
        const apiRes = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fname: firstName,
            middleName,
            lname: lastName,
            email,
            password,
          }),
        });

        if (apiRes.ok) {
          toast({
            title: "Registered!",
            description: "Your account has been registered. Try logging in!",
            className: "bg-green-500 text-white",
          });
        } else {
          toast({
            title: "Registration failed",
            description: JSON.stringify(await apiRes.json()),
            variant: "destructive",
          });
        }
      } catch (_) {
        toast({
          title: "Registration failed!",
          description:
            "We're having trouble processing your request. Try again later.",
          variant: "destructive",
        });
      }

      setLoading(false);
    },
    [toast]
  );

  return (
    <form className="w-full h-fit flex flex-col gap-1 md:gap-4">
      <div className="grid grid-cols-3 gap-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="first-name-input">First Name</Label>
          <Input
            disabled={loading}
            id="first-name-input"
            placeholder="First Name"
            required
            onChange={(e) => setFirstName(e.target.value.trim())}
            name="first_name"
            className="rounded-full valid:border-green-500 valid:focus-within:ring-green-500"
          />
        </div>

        <div className="flex-col gap-2">
          <Label htmlFor="middle-name-input">Middle Name</Label>
          <Input
            onChange={(e) => setMiddleName(e.target.value.trim())}
            disabled={loading}
            id="first-name-input"
            placeholder="Middle Name"
            name="middle_name"
            className="rounded-full"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="last-name-input">Last Name</Label>
          <Input
            onChange={(e) => setLastName(e.target.value.trim())}
            disabled={loading}
            id="last-name-input"
            placeholder="Last Name"
            required
            name="last_name"
            className="rounded-full valid:border-green-500 valid:focus-within:ring-green-500"
          />
        </div>
      </div>
      <div className="flex-col gap-2 hidden">
        <Label htmlFor="contact-input">Contact</Label>
        <Input
          disabled={loading}
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
          disabled={loading}
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
            "flex flex-row rounded-full has-[input:focus-visible]:ring-2 ring-offset-2 ring-primary",
            pwdErrorMsg.length > 0
              ? "ring-red-500"
              : password.length > 0
              ? "ring-green-500"
              : ""
          )}
        >
          <Input
            disabled={loading}
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
                : password.length > 0
                ? "border-green-500"
                : ""
            )}
          />
          <Button
            disabled={loading}
            type="button"
            onClick={() => setPasswordVisible(!passwordVisible)}
            size="icon"
            variant={"outline"}
            className={cn(
              "rounded-e-full border-s-0 ring-0",
              pwdErrorMsg.length > 0
                ? "border-red-500"
                : password.length > 0
                ? "border-green-500"
                : ""
            )}
          >
            {passwordVisible ? <Icons.hidden /> : <Icons.visible />}
          </Button>
        </div>
        {pwdErrorMsg.length > 0 && (
          <p className="text-red-500 text-xs">{pwdErrorMsg}</p>
        )}
      </div>

      <Button
        disabled={
          loading ||
          contactErrorMsg.length > 0 ||
          emailErrorMsg.length > 0 ||
          pwdErrorMsg.length > 0
        }
        onClick={handleRegister}
        size="sm"
        className="w-full rounded-full bg-green-500 hover:bg-green-400 gap-2"
      >
        {loading ? (
          <Icons.spinner className="animate-spin ease-in-out" />
        ) : (
          <Icons.badgeCheck />
        )}{" "}
        {loading ? "Processing..." : "Sign-up"}
      </Button>
    </form>
  );
}
