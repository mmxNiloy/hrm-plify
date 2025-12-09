"use client";

import React from "react";
import { motion } from "motion/react";
import Image from "next/image";

export default function AnimatedLogo() {
  return (
    <motion.div
      animate={{
        scale: [1.25, 1],
        opacity: [0, 1],
      }}
      transition={{
        duration: 0.5,
        ease: "easeIn",
      }}
      className="flex flex-col gap-6 items-center justify-center scale-125 opacity-0"
    >
      <Image
        src={"/site-logo.svg"}
        priority
        unoptimized
        height={0}
        width={0}
        className="w-8/12"
        alt={`Revolo HR`}
      />
      {/* Uncomment if needed
          <p className="from-blue-600 to-purple-500 bg-gradient-to-br text-white font-bold text-xl md:text-2xl xl:text-3xl rounded-md md:rounded-xl px-4 py-2">
            HR Simplified
          </p>
          */}
    </motion.div>
  );
}
