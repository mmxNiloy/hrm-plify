"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import gsap from "gsap";
import { ICompany } from "@/schema/CompanySchema";
import { AvatarPicker } from "../ui/avatar-picker";
import { Skeleton } from "../ui/skeleton";
import { getSampleCompanies } from "@/app/(server)/actions/getSampleCompanies";

export default function CompanyCarousel() {
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const loadData = useCallback(async () => {
    setLoading(true);

    const mCompanies = await getSampleCompanies();
    if (mCompanies.error) setCompanies([]);
    else setCompanies(mCompanies.data);

    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    if (loading || companies.length === 0) return;

    const container = containerRef.current;
    const slides = container?.children;

    if (!container || !slides) return;

    // Duplicate the slides for a seamless looping effect
    const slideWidth = slides[0].clientWidth;
    const totalSlides = slides.length;

    const timeline = gsap.timeline({
      repeat: -1, // Infinite loop
      defaults: { ease: "linear" },
    });

    timeline.to(container, {
      x: `-${slideWidth * totalSlides}px`, // Move the container to the end
      duration: totalSlides * 2, // Adjust the duration for speed
    });

    return () => {
      timeline.kill(); // Clean up the animation
    };
  }, [loading, companies]);

  if (loading) {
    return <Skeleton className="w-full h-16" />;
  }

  return (
    <div className="container overflow-hidden relative" ref={carouselRef}>
      <div
        className="flex gap-4 items-center"
        ref={containerRef}
        style={{ display: "flex" }}
      >
        {companies.map((item, index) => (
          <div
            className="min-w-64 flex gap-2 px-2 py-4 from-sky-200 to-blue-400 bg-gradient-to-br shadow-sm drop-shadow-sm rounded-md"
            key={`customer-slide-${index}`}
          >
            <AvatarPicker
              src={item.logo}
              readOnly
              className="min-w-10 min-h-10 size-10 p-0"
            />
            <p className="font-semibold text-lg line-clamp-1 text-ellipsis">
              {item.company_name}
            </p>
          </div>
        ))}
        {/* Duplicate slides for seamless scrolling */}
        {companies.map((item, index) => (
          <div
            className="min-w-64 flex gap-2 px-2 py-4 from-sky-200 to-blue-400 bg-gradient-to-br shadow-sm drop-shadow-sm rounded-md"
            key={`customer-slide-duplicate-${index}`}
          >
            <AvatarPicker
              src={item.logo}
              readOnly
              className="min-w-10 min-h-10 size-10 p-0"
            />
            <p className="font-semibold text-lg line-clamp-1 text-ellipsis">
              {item.company_name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
