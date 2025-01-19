"use client";

import React, { HTMLAttributes, useEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface CounterProps extends HTMLAttributes<HTMLParagraphElement> {
  value: number; // The target value to count up or down to/from
  variant?: "up" | "down"; // Optional, default is "up"
}

const Counter = React.forwardRef<HTMLParagraphElement, CounterProps>(
  ({ className, value, variant = "up", ...props }, ref) => {
    const counterRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
      const startValue = variant === "up" ? 0 : value; // Determine the starting value
      const endValue = variant === "up" ? value : 0; // Determine the target value

      gsap.fromTo(
        counterRef.current,
        { textContent: startValue },
        {
          textContent: endValue,
          duration: 2, // Duration of the animation (can be adjusted)
          ease: "power1.out", // Easing function
          snap: { textContent: 1 }, // Ensure integer values
          onUpdate: function () {
            if (counterRef.current) {
              // Update the counter text with the animated value
              counterRef.current.textContent = Math.floor(
                Number(counterRef.current.textContent)
              ).toString();
            }
          },
        }
      );
    }, [value, variant]);

    return (
      <p className={cn("text-4xl font-bold text-center", className)} ref={ref}>
        <span ref={counterRef}>0</span>
      </p>
    );
  }
);
Counter.displayName = "Counter";

export default Counter;
