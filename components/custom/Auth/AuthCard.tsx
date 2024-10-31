"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icons from "@/components/ui/icons";
import React, { useCallback, useState } from "react";
import RegistrationForm from "../Form/Auth/RegistrationForm";
import { Button } from "@/components/ui/button";
import LoginForm from "../Form/Auth/LoginForm";
import { animated, useSpring } from "@react-spring/web";

type FormType = "login-form" | "registration-form";

export default function AuthCard() {
  const [currentForm, setCurrentForm] = useState<FormType>("login-form");
  const [regAnimSprings, regAnimController] = useSpring(() => ({
    from: { x: 0, opacity: 1 },
  }));

  const [loginAnimSprings, loginAnimController] = useSpring(() => ({
    from: {
      x: 0,
      opacity: 1,
    },
  }));

  const handleRegFormSlide = useCallback(() => {
    setCurrentForm("registration-form");
    regAnimController.start({
      from: { x: 20, opacity: 0 },
      to: { x: 0, opacity: 1 },
    });
  }, [regAnimController]);

  const handleLoginformSlide = useCallback(() => {
    setCurrentForm("login-form");
    loginAnimController.start({
      from: { x: 20, opacity: 0 },
      to: { x: 0, opacity: 1 },
    });
  }, [loginAnimController]);

  return currentForm === "login-form" ? (
    // <animated.div style={{ ...loginAnimSprings }} >
    // </animated.div>
    <Card className="bg-muted/60 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent className="w-[32rem]">
        <LoginForm />

        <p className="text-center mt-4 mb-2">Don&apos;t have an account?</p>
        <Button
          onClick={handleRegFormSlide}
          type="button"
          className="gap-2 w-full rounded-full bg-blue-500 hover:bg-blue-400 text-white"
        >
          <Icons.badgeCheck /> Sign-up
        </Button>
      </CardContent>
    </Card>
  ) : (
    // <animated.div style={{ ...regAnimSprings }}>
    // </animated.div>
    <Card className="bg-muted/60 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Sign-up</CardTitle>
      </CardHeader>
      <CardContent className="w-[32rem]">
        <RegistrationForm />

        <p className="text-center mt-4 mb-2">Already have an account?</p>
        <Button
          onClick={handleLoginformSlide}
          className="gap-2 w-full rounded-full bg-blue-500 hover:bg-blue-400 text-white"
        >
          <Icons.login /> Login
        </Button>
      </CardContent>
    </Card>
  );
}
