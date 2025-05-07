import Link from "next/link";
import React from "react";
import TextCapsule from "../../TextCapsule";
import Icons from "@/components/ui/icons";
import { shortenText } from "@/utils/Text";
import SiteConfig from "@/utils/SiteConfig";
import AvatarNamePlaceholder from "../../AvatarNamePlaceholder";
import { AvatarPicker } from "@/components/ui/avatar-picker";
import { ICompany } from "@/schema/CompanySchema";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ICompanySearchCommandCardProps {
  company: ICompany;
}

export default function CompanySearchCommandCard({
  company,
}: ICompanySearchCommandCardProps) {
  return (
    <div className="h-full w-full p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col gap-3 hover:scale-105 hover:ring-blue-500 hover:ring-1">
      <Link
        href={`/dashboard/company/${company.company_id}/`}
        className="block h-full"
        aria-label={`View details for ${company.company_name}`}
      >
        <div>
          <div className="flex items-center gap-3 mb-3">
            <AvatarPicker
              readOnly
              src={company.logo}
              skeleton={
                <AvatarNamePlaceholder
                  className="size-full"
                  name={company.company_name}
                />
              }
              className="size-12 p-0.5 ring-2 ring-gray-100 dark:ring-gray-700 rounded-full"
              aria-label={`${company.company_name} logo`}
            />
            <div>
              <h3 className="font-semibold text-base text-gray-900 dark:text-white">
                {shortenText(company.company_name, 20)}
              </h3>
              {company.founded_year && (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Founded: {company.founded_year}
                </p>
              )}
            </div>
          </div>

          <div className="flex-1 space-y-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <TextCapsule className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs">
                    <Icons.building className="size-3" />
                    <span className="flex-1 line-clamp-1 text-ellipsis">
                      {company.headquarters ?? "N/A"}
                    </span>
                  </TextCapsule>
                </TooltipTrigger>
                <TooltipContent
                  className="z-[9999]"
                  align="start"
                  side="bottom"
                >
                  <strong>HQ:</strong>&nbsp;{company.headquarters ?? "N/A"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <TextCapsule className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 text-xs">
                    <Icons.factory className="size-3" />
                    <span className="flex-1 line-clamp-1 text-ellipsis">
                      {company.industry ?? "N/A"}
                    </span>
                  </TextCapsule>
                </TooltipTrigger>
                <TooltipContent className="z-[9999]" align="start">
                  <strong>Industry:</strong>&nbsp;{company.industry ?? "N/A"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TextCapsule
              className={
                company.is_active
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs"
                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 text-xs"
              }
            >
              {company.is_active ? "Active" : "Inactive"}
            </TextCapsule>
            {company.contact_number && (
              <TextCapsule className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 text-xs">
                <Icons.phone className="size-3" />
                {shortenText(company.contact_number, 18)}
              </TextCapsule>
            )}
          </div>
        </div>
      </Link>
      <Link
        href={`${company.website}?_ref=${SiteConfig.siteName}HRMS&_clickId=${
          SiteConfig.siteName
        }-${Date.now()}`}
        target="_blank"
        className="inline-flex items-center gap-1 px-2 py-1 bg-sky-500 text-white text-xs rounded-full w-full justify-center"
        aria-label={`Visit ${company.company_name} website`}
      >
        <Icons.externalLink className="size-3" />
        Visit Website
      </Link>
    </div>
  );
}
