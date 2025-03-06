"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { ICompany } from "@/schema/CompanySchema";
import { AvatarPicker } from "../ui/avatar-picker";
import { Skeleton } from "../ui/skeleton";
import { getFeaturedCompanies } from "@/app/(server)/actions/getFeaturedCompanies";
import AvatarNamePlaceholder from "./AvatarNamePlaceholder";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function CompanyCarousel() {
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const hardcodedFeaturedCompanyNames = useMemo(
    () => [
      { company_name: "East West Holdings" },
      { company_name: "Revolo Consultancy International" },
      { company_name: "Wycombe Green" },
      { company_name: "RCI Chartered Accountants" },
      { company_name: "Wisdom Property Developments" },
      { company_name: "Silverwood Property Holdings" },
      { company_name: "The Motor Group" },
      { company_name: "Intelligent Property Assets" },
      { company_name: "Construction for Generations" },
      { company_name: "Bengal Spice" },
      { company_name: "Tropical Holdings" },
      { company_name: "Maidenhead Green" },
      { company_name: "East West Services London" },
      { company_name: "Magpie Nest Holdings" },
      { company_name: "Bramingham Wood" },
      { company_name: "B’s Online" },
      { company_name: "Beckenham Ltd" },
      { company_name: "Apollo Global Research & Consultancy" },
      { company_name: "Next Ways" },
      { company_name: "Abroad Next" },
      { company_name: "Artemis Consultancy" },
      { company_name: "Magpie Nest Finance" },
      { company_name: "Earthbound Services" },
      { company_name: "Winnersh Motors" },
      { company_name: "Hampsted Ltd" },
      { company_name: "Limbury Mead" },
      { company_name: "Progress Tax and Accounts" },
      { company_name: "3 Counties Holdings" },
      { company_name: "SSD Networks" },
      { company_name: "Revolution Tax Services" },
      { company_name: "Burnham Green" },
      { company_name: "Jay Raj" },
      { company_name: "Baranda" },
      { company_name: "The Old Bengal" },
      { company_name: "St Brendans Residential Home" },
      { company_name: "Savci" },
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
    setCompanies(hardcodedFeaturedCompanyNames as ICompany[]);

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
          <p className="font-bold md:text-lg lg:text-xl line-clamp-1 text-ellipsis">
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
