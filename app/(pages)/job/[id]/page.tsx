"use server";
import { getJobListing } from "@/app/(server)/actions/getJobListing";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import JobListingFormFragment from "@/components/custom/Form/Fragment/Recruitment/JobListingFormFragment";
import Navbar from "@/components/custom/Navbar/Navbar";
import TextCapsule from "@/components/custom/TextCapsule";
import { AvatarPicker } from "@/components/ui/avatar-picker";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { ButtonSuccess } from "@/styles/button.tailwind";
import { stringToColor } from "@/utils/Misc";
import Link from "next/link";
import React from "react";
import Markdown from "react-markdown";

interface IDProps {
  id: string;
}

interface Props {
  params: Promise<IDProps>;
}

export default async function JobByIdPage({ params }: Props) {
  const jobId = (await params).id;

  const { data, error } = await getJobListing(jobId);

  if (error) {
    return (
      <main>
        <Navbar />
        <ErrorFallbackCard error={error} />
      </main>
    );
  }

  if (data.isPublished == 0) {
    // Unpublished job listing
    return (
      <main>
        <Navbar />
        <div className="container w-full h-screen flex flex-col gap-2 items-center justify-center">
          <Icons.squirrel className="size-32" />
          <p>Oops! The requested job is not published yet!</p>
          <p className="text-lg font-semibold">
            Please report any discrepencies to{" "}
            <b>{data.company?.company_name}</b>
          </p>
          {data.company?.contact_number && (
            <Link passHref href={`tel:${data.company.contact_number}`}>
              <p className="text-lg hover:underline">
                Contact: <b>{data.company.contact_number}</b>
              </p>
            </Link>
          )}
          {data.company?.website && (
            <Link passHref href={data.company.website}>
              <p className="text-lg hover:underline">
                Website: <b>{data.company?.website}</b>
              </p>
            </Link>
          )}
        </div>
      </main>
    );
  }

  const today = new Date();
  const today_0Hour = Date.UTC(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const deadline = new Date(data.lastDate);
  return (
    <main>
      <Navbar />

      {/* Job listing inactive message */}
      {data.status == 0 && (
        <div className="bg-red-500 items-center justify-center text-white text-lg font-semibold flex gap-2">
          <Icons.warn />
          This job is currently not available.{" "}
          {deadline.getMilliseconds() < today_0Hour
            ? "The application deadline is over."
            : ""}
        </div>
      )}

      <div className="container p-4 flex flex-col gap-2">
        {/* Company Name and logo here */}
        <div className="flex gap-2 items-center">
          <AvatarPicker
            className="size-24 p-0"
            readOnly
            src={data.company?.logo}
            skeleton={
              <span
                style={{
                  backgroundColor: stringToColor(
                    data.company?.company_name ?? "Company"
                  ),
                }}
                className={
                  "flex items-center justify-center text-xl size-10 bg-muted rounded-full text-white"
                }
              >
                {data.company?.company_name.charAt(0).toUpperCase() ?? "C"}
              </span>
            }
          />

          <div className="flex flex-col gap-2">
            <h4 className="text-2xl font-bold">{data.company?.company_name}</h4>

            <div className="flex gap-2 items-center">
              {data.company?.headquarters && (
                <TextCapsule
                  title={`Headquarters at: ${data.company.headquarters}`}
                  className="text-white bg-blue-500"
                >
                  <Icons.building />
                  {data.company.headquarters}
                </TextCapsule>
              )}

              {data.company?.contact_number && (
                <Link href={`tel:${data.company.contact_number}`} passHref>
                  <TextCapsule
                    title={`Contact: ${data.company.contact_number}`}
                    className="text-white bg-emerald-500"
                  >
                    <Icons.phone />
                    {data.company.contact_number}
                  </TextCapsule>
                </Link>
              )}

              {data.company?.website && (
                <Link href={`${data.company.website}`} passHref>
                  <TextCapsule
                    title={`Website: ${data.company.website}`}
                    className="text-white bg-amber-500 hover:underline"
                  >
                    <Icons.externalLink />
                    Visit Website
                  </TextCapsule>
                </Link>
              )}
            </div>
          </div>

          <span className="flex-grow" />

          <Button className={ButtonSuccess} disabled={data.status == 0}>
            <Icons.badgeCheck />
            Apply Now
          </Button>
        </div>

        {/* Job description */}
        <Markdown className={"prose"}>{data.desc}</Markdown>
      </div>
    </main>
  );
}
