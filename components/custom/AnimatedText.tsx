"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedText({
  children,
  duration = 0.2,
  stagger = 0.03,
  scrollTriggerStart = "top 80%",
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

      // Detect mobile for adjustments
      const isMobile = window.matchMedia("(max-width: 768px)").matches;

      // ScrollTrigger animation (default)
      gsap.fromTo(
        words,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: isMobile ? duration * 1.5 : duration, // Slower on mobile for visibility
          stagger: isMobile ? stagger * 1.5 : stagger, // More pronounced stagger
          scrollTrigger: {
            trigger: textRef.current,
            start: isMobile ? "top 90%" : scrollTriggerStart, // Closer to viewport edge on mobile
            end: "bottom 20%", // Allow animation to complete before leaving view
            toggleActions: "play none none reset", // Reset on scroll out
          },
        }
      );

      // Optional: Fallback animation if ScrollTrigger isn’t desired on mobile
      // Uncomment this block to use a simple entrance animation instead
      /*
    if (isMobile) {
      gsap.fromTo(
        words,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: duration,
          stagger: stagger,
          delay: 0.3, // Slight delay for entrance
        }
      );
    }
    */
    },
    { scope: textRef, dependencies: [duration, stagger, scrollTriggerStart] }
  );

  return (
    <span ref={textRef}>
      {children.split(" ").map((word, index, arr) => (
        <span
          key={index}
          className="word-span inline-block mr-1"
          style={{
            opacity: 0, // Set initial state inline
            transform: "translateY(20px) translateZ(0)", // Match GSAP initial state
            willChange: "opacity, transform", // Optimize for animation
          }}
        >
          {word}
          {arr.length - 1 > index && <span> </span>}
        </span>
      ))}
    </span>
  );
}
