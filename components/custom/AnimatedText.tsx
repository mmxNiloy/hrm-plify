"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.normalizeScroll(true); // Fix mobile scroll issues

export default function AnimatedText({
  children,
  duration = 0.2,
  stagger = 0.03,
  scrollTriggerStart = "top 80%", // Adjusted for mobile
}: {
  children: string;
  duration?: number;
  stagger?: number;
  scrollTriggerStart?: string;
}) {
  const textRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const words = gsap.utils.toArray(".word-span", textRef.current);
      if (!words.length) {
        console.warn("No words found for animation");
        return;
      }
      gsap.fromTo(
        words,
        { opacity: 0, y: 20 },
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
    { scope: textRef, dependencies: [duration, stagger, scrollTriggerStart] }
  );

  return (
    <span ref={textRef}>
      {children.split(" ").map((word, index, arr) => (
        <span
          key={index}
          className="word-span inline-block mr-1 opacity-0 translate-y-5 will-change-transform"
          style={{ transform: "translateZ(0)" }} // Force GPU acceleration
        >
          {word}
          {arr.length - 1 > index && <span> </span>}
        </span>
      ))}
    </span>
  );
}
