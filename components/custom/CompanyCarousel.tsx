"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { ICompany } from "@/schema/CompanySchema";
import { AvatarPicker } from "../ui/avatar-picker";
import { Skeleton } from "../ui/skeleton";
import { getFeaturedCompanies } from "@/app/(server)/actions/getFeaturedCompanies";
import AvatarNamePlaceholder from "./AvatarNamePlaceholder";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ICompanyItem {
  company_name: string;
  logo?: string;
  className?: string;
}

export default function CompanyCarousel() {
  const [companies, setCompanies] = useState<ICompanyItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const hardcodedFeaturedCompanyNames = useMemo(
    () => [
      { company_name: "Jay Raj", logo: "/trust-company/1.svg" },
      { company_name: "Baranda", logo: "/trust-company/2.svg" },
      { company_name: "The Old Bengal", logo: "/trust-company/3.svg" },
      {
        company_name: "St Brendans Residential Home",
        logo: "/trust-company/4.svg",
      },
      { company_name: "Savci", logo: "/trust-company/5.svg" },
      {
        company_name: "The Motor Group",
        logo: "/trust-company/6.svg",
        className: "bg-secondary-foreground",
      },
      {
        company_name: "Maidenhead Spice",
        logo: "/trust-company/7.svg",
        className: "bg-secondary-foreground",
      },
      { company_name: "Intelligent Property", logo: "/trust-company/8.svg" },
      { company_name: "Silverwood Property", logo: "/trust-company/9.svg" },
      { company_name: "Magpie Nest Finance", logo: "/trust-company/10.svg" },
      { company_name: "Ether Wroldwide", logo: "/trust-company/11.svg" },
      { company_name: "Mangia E Bevi", logo: "/trust-company/12.svg" },
      {
        company_name: "Al Pomodoro",
        logo: "/trust-company/13.svg",
        className: "bg-secondary-foreground",
      },
      { company_name: "EFES BBQ", logo: "/trust-company/14.svg" },
      { company_name: "Deshi Fashion", logo: "/trust-company/15.svg" },
      { company_name: "AutoZone", logo: "/trust-company/16.png" },
    ],
    []
  );

  const loadData = useCallback(async () => {
    setLoading(true);

    //! Uncomment this section to get featured companies from the DB
    // const mCompanies = await getFeaturedCompanies();
    // if (mCompanies.error) setCompanies([]);
    // else setCompanies(mCompanies.data);

    // Remove this line when the client comes to their senses.
    setCompanies(hardcodedFeaturedCompanyNames);

    setLoading(false);
  }, [hardcodedFeaturedCompanyNames]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (loading) {
    return (
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full px-8"
        plugins={[
          //@ts-ignore
          Autoplay({
            delay: 2000,
          }),
        ]}
      >
        <CarouselContent>
          {Array.from({ length: 6 }).map((item, index) => (
            <CarouselItem
              key={`company-card-skeleton-${index}`}
              className="basis-1 sm:basis-1/2 lg:basis-1/4"
            >
              <CompanyCardSkeleton />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    );
  }

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full px-2 md:px-4 lg:px-8"
      plugins={[
        //@ts-ignore
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      <CarouselContent className="py-2">
        {companies.map((item, index) => (
          <CarouselItem
            key={`company-card-${index}`}
            className="basis-1/2 md:basis-1/3 lg:basis-1/4"
          >
            <CompanyCard comp={item} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

function CompanyCard({ comp }: { comp: ICompanyItem }) {
  return (
    <div
      className={cn(
        "w-full px-3 py-3 sm:px-5 sm:py-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-200 flex items-center gap-3 sm:gap-4"
      )}
    >
      {/* Logo Container */}
      <div className="relative flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16">
        {comp.logo ? (
          <Image
            src={comp.logo}
            alt={`${comp.company_name} logo`}
            fill
            className={cn("object-contain rounded-md", comp.className)}
            sizes="(max-width: 640px) 48px, 64px" // Responsive sizes
            priority={false} // Set to true if logos are above the fold
            placeholder="blur" // Optional: Add a blurDataURL for better UX
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAHfgLNAXqNkgAAAABJRU5ErkJggg=="
          />
        ) : (
          <AvatarPicker
            readOnly
            src={comp.logo}
            skeleton={<AvatarNamePlaceholder name={comp.company_name} />}
            className={cn("size-6 sm:size-8 p-0", comp.className)}
          />
        )}
      </div>

      {/* Company Name */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm sm:text-base md:text-lg text-gray-800 line-clamp-1 text-ellipsis">
          {comp.company_name}
        </p>
      </div>
    </div>
  );
}

function CompanyCardSkeleton() {
  return (
    <div className="w-full px-4 py-2 rounded-md drop-shadow bg-white flex gap-2 items-center justify-between">
      <div className="flex w-full items-center justify-center gap-2">
        <Skeleton className="size-8 rounded-full invert-[0.25]" />
        {/* <div className="flex flex-col gap-4 items-center justify-center">
           <Skeleton className="w-16 h-4" /> 
        </div> */}
        <Skeleton className="flex-1 h-6 invert-[0.25]" />
        {/* <div className="flex flex-col gap-2 w-full items-center justify-center">
          <Skeleton className="w-16 h-4" />
          <Skeleton className="w-16 h-4" />
          <Skeleton className="w-16 h-4" />
        </div> */}
      </div>
    </div>
  );
}
