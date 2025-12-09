"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";
import RegistrationForm from "../Form/Auth/RegistrationForm";
import { Button } from "@/components/ui/button";
import LoginForm from "../Form/Auth/LoginForm";
import { motion } from "motion/react";
import { parseAsStringEnum, useQueryState } from "nuqs";

export default function AuthCard() {
  const [currentForm, setCurrentForm] = useQueryState(
    "auth",
    parseAsStringEnum(["login", "register"]).withDefault("login").withOptions({
      shallow: true,
      throttleMs: 300,
    })
  );

  if (currentForm === "login") {
    return (
      <motion.div
        animate={{
          x: [20, 0],
          opacity: [0, 1],
        }}
        transition={{
          delay: 0.25,
          duration: 0.5,
          ease: "easeIn",
        }}
      >
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
      </motion.div>
    );
  }

  return (
    <motion.div
      animate={{
        x: [20, 0],
        opacity: [0, 1],
      }}
      transition={{
        delay: 0.25,
        duration: 0.5,
        ease: "easeIn",
      }}
    >
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
            onClick={() => setCurrentForm("login")}
            className="gap-2 w-full font-semibold text-lg rounded-md bg-blue-500 hover:bg-blue-400 text-white"
          >
            Login
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
