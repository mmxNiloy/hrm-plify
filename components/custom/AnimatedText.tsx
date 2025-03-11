"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedText({
  children,
  duration = 0.2,
  stagger = 0.03,
  scrollTriggerStart = "top 90%",
  className,
}: {
  children: string;
  duration?: number;
  stagger?: number;
  scrollTriggerStart?: string;
  className?: string;
}) {
  const textRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const words = gsap.utils.toArray(".word-span", textRef.current);
      gsap.fromTo(
        words,
        { opacity: 0, y: 20 }, // Initial state
        {
          opacity: 1,
          y: 0,
          duration: duration,
          stagger: stagger,
          scrollTrigger: {
            trigger: textRef.current,
            start: scrollTriggerStart,
          },
        }
      );
    },
    { scope: textRef }
  );

  return (
    <span ref={textRef}>
      {children.split(" ").map((word, index, arr) => (
        <span
          key={index}
          className={cn(
            "word-span inline-block mr-1 opacity-0 translate-y-5",
            className
          )}
        >
          {word}
          {arr.length - 1 > index && <span>&nbsp;</span>}
        </span>
      ))}
    </span>
  );
}
