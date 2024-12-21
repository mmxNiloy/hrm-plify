"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getCompanyCount } from "@/app/(server)/actions/getCompanyCount";

gsap.registerPlugin(ScrollTrigger);

export default function CompanyCountText() {
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const ref = useRef<HTMLSpanElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  const getTotal = useCallback(async () => {
    setLoading(true);

    const mTotal = await getCompanyCount();
    if (mTotal.data) setTotal(mTotal.data.ans);
    else setTotal(0);

    setLoading(false);
  }, []);

  useEffect(() => {
    getTotal();
  }, [getTotal]);

  useEffect(() => {
    if (loading) {
      // Start an indefinite count-up animation while loading
      animationRef.current = gsap.to(ref.current, {
        textContent: "999",
        duration: 1,
        repeat: -1,
        ease: "linear",
        modifiers: {
          textContent: (value) => Math.floor(Number(value) % 1000),
        },
      });
    } else {
      // Stop the indefinite animation once the loading is complete
      if (animationRef.current) animationRef.current.kill();

      // Animate the count-up to the total when in view
      gsap.fromTo(
        ref.current,
        { textContent: 0 },
        {
          textContent: total,
          duration: 2,
          ease: "power2.out",
          snap: { textContent: 1 }, // Ensures the number snaps to whole values
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%", // Animation starts when the element enters the viewport
          },
          onUpdate: function () {
            if (ref.current) {
              ref.current.textContent = Math.floor(
                Number(ref.current.textContent)
              ).toString();
            }
          },
        }
      );
    }
  }, [loading, total]);

  return (
    <p className="mt-16 text-4xl font-extrabold text-center">
      We have <span ref={ref}>0</span>+ clients worldwide
    </p>
  );
}
