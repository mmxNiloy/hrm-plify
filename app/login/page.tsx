import AuthCard from "@/components/custom/Auth/AuthCard";
import React from "react";
import AnimatedLogo from "./components/animated-logo";

export default function LoginPage() {
  return (
    <main className="flex flex-col gap-4 md:gap-8 min-h-screen items-center -mt-14 md:-mt-16">
      <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 gap-2 items-center flex-1">
        {/* Logo Here */}
        <AnimatedLogo />

        {/* Login form here */}

        <AuthCard />
      </div>
    </main>
  );
}
