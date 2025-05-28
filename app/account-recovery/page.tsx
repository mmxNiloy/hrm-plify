"use client";
import AuthCard from "@/components/custom/Auth/AuthCard";
import Image from "next/image";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import AccountRecoveryCard from "@/components/custom/Auth/AccountRecoveryCard";
import SiteConfig from "@/utils/SiteConfig";

export default function AccountRecoveryPage() {
  const logoRef = useRef<HTMLDivElement>(null);
  const accountRecoveryCardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.fromTo(
        logoRef.current,
        { scale: 1.25, opacity: 0 }, // Initial hidden state
        { scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" }
      ).to(logoRef.current, { x: 0, duration: 0.8, ease: "power2.out" });

      tl.fromTo(
        accountRecoveryCardRef.current,
        { x: 100, opacity: 0 }, // Initial hidden state
        { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
        "-=0.5"
      );
    },
    { scope: containerRef }
  );

  return (
    <main
      ref={containerRef}
      className="flex flex-col gap-4 md:gap-8 min-h-screen items-center -mt-14 md:-mt-16"
    >
      <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 gap-2 items-center flex-1">
        {/* Logo Here */}
        <div
          ref={logoRef}
          className="flex flex-col gap-6 items-center justify-center scale-125 opacity-0"
        >
          <Image
            src={"/nest-hrm-logo.png"}
            priority
            unoptimized
            height={0}
            width={0}
            className="w-8/12"
            alt={SiteConfig.appName}
          />
          {/* Uncomment if needed
          <p className="from-blue-600 to-purple-500 bg-gradient-to-br text-white font-bold text-xl md:text-2xl xl:text-3xl rounded-md md:rounded-xl px-4 py-2">
            HR Simplified
          </p>
          */}
        </div>

        {/* Account recovery form here */}
        <div
          ref={accountRecoveryCardRef}
          className="translate-x-[100px] opacity-0"
        >
          <AccountRecoveryCard />
        </div>
      </div>
    </main>
  );
}
