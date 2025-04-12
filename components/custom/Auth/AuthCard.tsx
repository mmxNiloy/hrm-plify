"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icons from "@/components/ui/icons";
import React, { useCallback, useState } from "react";
import RegistrationForm from "../Form/Auth/RegistrationForm";
import { Button } from "@/components/ui/button";
import LoginForm from "../Form/Auth/LoginForm";
import { animated, useSpring } from "@react-spring/web";
import Link from "next/link";

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
    <Card className="backdrop-blur-sm border-none">
      <CardHeader>
        <CardTitle className="text-center text-2xl md:text-4xl font-bold">
          Login
        </CardTitle>
      </CardHeader>
      <CardContent className="w-72 sm:w-96 md:w-[32rem]">
        <LoginForm />
      </CardContent>
    </Card>
  ) : (
    // <animated.div style={{ ...regAnimSprings }}>
    // </animated.div>
    <Card className="from-fuchsia-600/60 to-orange-600/80 bg-gradient-to-br border-none backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-center text-2xl md:text-4xl font-bold">
          Sign-up
        </CardTitle>
      </CardHeader>
      <CardContent className="w-[32rem]">
        <RegistrationForm />

        <p className="text-center mt-4 mb-2 font-semibold text-lg text-secondary-foreground">
          Already have an account?
        </p>
        <Button
          onClick={handleLoginformSlide}
          className="gap-2 w-full font-semibold text-lg rounded-md bg-blue-500 hover:bg-blue-400 text-white"
        >
          Login
        </Button>
      </CardContent>
    </Card>
  );
}
