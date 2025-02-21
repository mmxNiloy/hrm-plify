"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Icons from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";

export default function LoginForm() {
  const { toast } = useToast();
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();

      setLoading(true);

      const fd = new FormData(e.currentTarget);
      // Try to call api from here
      try {
        const apiRes = await fetch("/api/login", {
          method: "POST",
          body: fd,
        });

        if (apiRes.ok) {
          toast({
            title: "Login successful!",
            className: "bg-green-500 text-white",
          });

          router.replace("/dashboard");
        } else {
          toast({
            title: "Login failed",
            description: "Invalid email or password. Try again.",
            variant: "destructive",
          });
        }
      } catch (_) {
        toast({
          title: "Login failed",
          description:
            "We're hhaving trouble processing your request at the moment. Please try again later.",
          variant: "destructive",
        });
      }

      setLoading(false);
    },
    [toast, router]
  );

  return (
    <form
      onSubmit={handleLogin}
      className="w-full h-fit flex flex-col gap-1 md:gap-4"
    >
      <div className="flex flex-col gap-1 justify-center">
        {/* <Label
          htmlFor="email-input"
          className="after:content-['*'] after:ml-0.5 after:text-red-500"
        >
          Email
        </Label> */}
        <Input
          disabled={loading}
          className="rounded-md border-primary/30"
          required
          id="email-input"
          type="email"
          placeholder="Email"
          name="email"
        />
      </div>

      <div className="flex flex-col gap-1 justify-center">
        <PasswordInput name="password" minLength={3} required />
      </div>

      <div className="flex flex-row gap-2 items-center">
        <Checkbox
          disabled={loading}
          id="remember-me-checkbox"
          name="remember-me"
          className="bg-white border-none ring-2 ring-gray-600"
        />
        <Label htmlFor="remember-me-checkbox" className="text-sm">
          Remember me
        </Label>
      </div>

      <Button
        disabled={loading}
        type="submit"
        size={"sm"}
        className="bg-green-500 hover:bg-green-400 text-white rounded-md gap-1 md:gap-2 font-bold text-lg"
      >
        {loading ? (
          <>
            <Icons.spinner className="animate-spin ease-in-out" /> Loading...
          </>
        ) : (
          <>Login</>
        )}
      </Button>
    </form>
  );
}
