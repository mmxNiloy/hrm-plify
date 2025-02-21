"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import gsap from "gsap";
import { ICompany } from "@/schema/CompanySchema";
import { AvatarPicker } from "../ui/avatar-picker";
import { Skeleton } from "../ui/skeleton";
import { getSampleCompanies } from "@/app/(server)/actions/getSampleCompanies";
import AvatarNamePlaceholder from "./AvatarNamePlaceholder";
import TextCapsule from "./TextCapsule";
import Icons from "../ui/icons";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import SiteConfig from "@/utils/SiteConfig";

export default function CompanyCarousel() {
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

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
              className="basis-1/2 md:basis-1/3 lg:basis-1/4"
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
      className="w-full px-8"
      plugins={[
        //@ts-ignore
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      <CarouselContent>
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

function CompanyCard({ comp }: { comp: ICompany }) {
  return (
    <div className="w-full px-4 py-2 rounded-md drop-shadow bg-white backdrop-blur flex gap-2 items-center justify-between">
      <div className="flex gap-2">
        <div className="flex flex-col gap-2 items-center justify-center">
          <AvatarPicker
            readOnly
            src={comp.logo}
            skeleton={<AvatarNamePlaceholder name={comp.company_name} />}
            className="size-8 p-0"
          />
          {/* <Link
            href={`${comp.website}?_ref=${SiteConfig.siteName}HRMS&_clickId=${
              SiteConfig.siteName
            }-${Date.now()}`}
            target="_blank"
            className="hover:underline"
            passHref
          >
            <TextCapsule className="text-xs bg-sky-500 hover:bg-sky-400">
              <Icons.externalLink />
              Visit
            </TextCapsule>
          </Link> */}
        </div>
        <div className="flex flex-col gap-2 items-center justify-center">
          <p className="font-bold text-xl line-clamp-1 text-ellipsis">
            {comp.company_name}
          </p>

          {/* <div className="flex flex-col gap-2 *:text-xs">
            <TextCapsule className="bg-blue-500">
              <Icons.building className="size-3" />
              {comp.headquarters ?? "N/A"}
            </TextCapsule>

            <TextCapsule className="bg-orange-500">
              <Icons.factory className="size-3" />
              {comp.industry ?? "N/A"}
            </TextCapsule>
            <TextCapsule className={comp.is_active ? "bg-green-500" : ""}>
              {comp.is_active ? "Active" : "Inactive"}
            </TextCapsule>
          </div> */}
        </div>
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
