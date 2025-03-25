"use server";
import React from "react";
import Image from "next/image";
import { AvatarPicker } from "@/components/ui/avatar-picker";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import { bitCount32, getFullNameOfUser } from "@/utils/Misc";
import TextCapsule from "@/components/custom/TextCapsule";
import CameraButton from "@/components/custom/Profile/CameraButton";
import ProfileEditButton from "@/components/custom/Profile/ProfileEditButton";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ButtonGradient } from "@/styles/button.tailwind";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import JoinOrCreateCompanyDialog from "@/components/custom/Dialog/Profile/JoinOrCreateCompanyDialog";
import JoinCompanyPopover from "@/components/custom/Popover/Profile/JoinCompanyPopover";
import CompanyCreationDialog from "@/components/custom/Dialog/Company/CompanyCreationDialog";
import { Metadata } from "next";
import { getUserData } from "@/app/(server)/actions/getUserData";
import SiteConfig from "@/utils/SiteConfig";

enum ProfileStep {
  ROLE = 1,
  COMPANY = 2,
  COMPANY_ROLE = 4,
  COMPANY_STATUS = 8,
  COMPANY_CONTACT = 16,
  COMPANY_ESTD = 32,
  COMPANY_HQ = 64,
  COMPANY_INDUSTRY = 128,
  COMPANY_LOGO = 256,
  COMPANY_WEBSITE = 512,
  COMPANY_EMAIL = 1024,
}

function getProfileCompletion(user: IUser) {
  var status = 0;
  if (user.user_roles) status |= ProfileStep.ROLE;
  if (user.usercompany) {
    status |= ProfileStep.COMPANY;
    if (
      user.usercompany.company_role_id ||
      user.usercompany.roles.role_name.length > 0
    )
      status |= ProfileStep.COMPANY_ROLE;
    if (user.usercompany.isActive) status |= ProfileStep.COMPANY_STATUS;
    if (user.usercompany.companies?.contact_number)
      status |= ProfileStep.COMPANY_CONTACT;
    if (user.usercompany.companies?.founded_year)
      status |= ProfileStep.COMPANY_ESTD;
    if (user.usercompany.companies?.headquarters)
      status |= ProfileStep.COMPANY_HQ;
    if (user.usercompany.companies?.industry)
      status |= ProfileStep.COMPANY_INDUSTRY;
    if (user.usercompany.companies?.logo) status |= ProfileStep.COMPANY_LOGO;
    if (user.usercompany.companies?.website)
      status |= ProfileStep.COMPANY_WEBSITE;
    if (user.usercompany.companies?.email) status |= ProfileStep.COMPANY_EMAIL;
  }

  return status;
}

export async function generateMetadata(): Promise<Metadata> {
  const user = await getUserData();
  return {
    title: `${SiteConfig.siteName} | ${
      user ? getFullNameOfUser(user) : "User Profile"
    }`,
  };
}

export default async function ProfilePage() {
  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  const hasCompany =
    user.user_roles?.roles.role_name === "Employee" ||
    user.user_roles?.roles.role_name === "Company Admin";
  const isAdmin =
    user.user_roles?.roles.role_name === "Super Admin" ||
    user.user_roles?.roles.role_name === "Admin";

  const profileStatus = getProfileCompletion(user);
  const isProfileIncomplete = profileStatus & 0x07ff; /// 0 -> complete, incomplete otherwise

  return (
    <main className="container flex flex-col gap-2">
      <JoinOrCreateCompanyDialog
        defaultOpen={!hasCompany && !isAdmin}
        user={user}
      />

      <div className="flex flex-col gap-2 bg-background rounded-lg">
        {/* Profile overview card */}
        <div className="flex flex-col gap-4">
          <div className="rounded-lg relative flex flex-col items-center justify-between">
            <Image
              height={0}
              width={0}
              unoptimized
              priority
              src={
                "/vecteezy_white-abstract-geometric-shapes-background-ideal-for-poster_22925498.jpg"
              }
              alt="Cover Photo"
              style={{ aspectRatio: 4 / 1 }}
              className="rounded-t-lg w-full absolute"
            />

            <CameraButton />

            <span className="w-full" style={{ aspectRatio: 4 / 1 }} />

            <div className="px-8 w-full flex flex-row items-end justify-between">
              <AvatarPicker
                key={`profile-avatar-`}
                name="file"
                className="size-48 -mt-24 border border-muted-foreground/50 shadow-lg"
              />
              <ProfileEditButton />
            </div>
          </div>

          <div className="px-8 py-4 flex flex-col gap-2">
            <p className="flex-grow text-2xl font-bold flex gap-2 items-center">
              {getFullNameOfUser(user)}
              {isProfileIncomplete && !isAdmin && (
                <Popover>
                  <PopoverTrigger title="Your profile is incomplete" asChild>
                    <Button
                      size={"icon"}
                      variant={"ghost"}
                      className="rounded-full"
                    >
                      <Icons.warn className="fill-yellow-300 stroke-yellow-700" />
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent>
                    <div className={"flex flex-col gap-4"}>
                      <Label className="font-semibold">
                        Complete the following steps
                      </Label>
                      <p className="text-sm">
                        Overall progress ({bitCount32(profileStatus)}/10)
                      </p>
                      <Progress value={bitCount32(profileStatus) * 10} />
                      <div
                        className={cn(
                          "flex gap-2 items-center text-sm [&>svg]:size-4",
                          profileStatus & ProfileStep.ROLE
                            ? "text-green-500"
                            : "text-red-500"
                        )}
                      >
                        {profileStatus & ProfileStep.ROLE ? (
                          <Icons.boxChecked />
                        ) : (
                          <Icons.boxCrossed />
                        )}{" "}
                        Get assigned a Role
                      </div>
                      <div
                        className={cn(
                          "flex gap-2 items-center text-sm [&>svg]:size-4",
                          profileStatus & ProfileStep.COMPANY
                            ? "text-green-500"
                            : "text-red-500"
                        )}
                      >
                        {profileStatus & ProfileStep.ROLE ? (
                          <Icons.boxChecked />
                        ) : (
                          <Icons.boxCrossed />
                        )}{" "}
                        Join or create a company
                      </div>

                      {hasCompany && (
                        <>
                          <p className="text-sm">Company Information</p>
                          <div
                            className={cn(
                              "flex gap-2 items-center text-sm [&>svg]:size-4",
                              profileStatus & ProfileStep.COMPANY_CONTACT
                                ? "text-green-500"
                                : "text-red-500"
                            )}
                          >
                            {profileStatus & ProfileStep.ROLE ? (
                              <Icons.boxChecked />
                            ) : (
                              <Icons.boxCrossed />
                            )}{" "}
                            Add company contact information
                          </div>

                          <div
                            className={cn(
                              "flex gap-2 items-center text-sm [&>svg]:size-4",
                              profileStatus & ProfileStep.COMPANY_ESTD
                                ? "text-green-500"
                                : "text-red-500"
                            )}
                          >
                            {profileStatus & ProfileStep.ROLE ? (
                              <Icons.boxChecked />
                            ) : (
                              <Icons.boxCrossed />
                            )}{" "}
                            Add company&apos;s founding year
                          </div>
                        </>
                      )}

                      {!hasCompany ? (
                        <div className="flex flex-col gap-2 items-center">
                          <JoinCompanyPopover user={user} />
                          <p className="text-sm">Or</p>
                          <CompanyCreationDialog
                            asClient
                            Icon={<Icons.badgeCheck />}
                          />
                        </div>
                      ) : (
                        <Link href={"/dashboard"} passHref>
                          <Button className={ButtonGradient}>
                            Complete now
                            <Icons.chevronRight />
                          </Button>
                        </Link>
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
              )}
            </p>
            {hasCompany && (
              <p className="flex-grow text-base flex gap-2 items-center">
                <Icons.company /> {user.usercompany?.companies?.company_name}
              </p>
            )}
            <div className="flex gap-2">
              <TextCapsule className="bg-green-500">
                <Icons.idCard />
                {user.user_roles?.roles.role_name ?? "Guest"}
              </TextCapsule>
              <TextCapsule className="bg-blue-500">
                <Icons.mail />
                {user.email}
              </TextCapsule>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-8 py-4">
            <div className="border relative rounded-md row-span-2">
              {!user.usercompany && (
                <div className="absolute size-full bg-muted/50 backdrop-blur flex flex-col gap-2 items-center justify-center">
                  <p className="text-lg font-semibold">
                    You are not affiliated with a company yet.
                  </p>
                  <div className="flex gap-4 items-center">
                    <JoinCompanyPopover user={user} />
                    <p className="text-base font-semibold">Or</p>
                    <CompanyCreationDialog
                      asClient
                      Icon={<Icons.badgeCheck />}
                    />
                  </div>
                </div>
              )}

              <div className="p-4 flex flex-col gap-4">
                <p className="text-xl font-semibold flex gap-2">
                  <Icons.company />
                  My Company
                </p>
                <div className="flex flex-col gap-2">
                  <Label>Company Name</Label>
                  <Input
                    readOnly
                    defaultValue={user.usercompany?.companies?.company_name}
                    placeholder="Company Name"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Company Headquarters</Label>
                  <Input
                    readOnly
                    defaultValue={user.usercompany?.companies?.headquarters}
                    placeholder="Company Headquarters"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Company Website</Label>
                  <Input
                    readOnly
                    defaultValue={user.usercompany?.companies?.website}
                    placeholder="Company Website"
                  />
                </div>

                <Link className="w-full" passHref href={"/dashboard"}>
                  <Button className={cn(ButtonGradient, "w-full")}>
                    View details
                    <Icons.chevronRight />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="border relative rounded-md row-span-3">
              <div className="p-4 flex flex-col gap-4">
                <p className="text-xl font-semibold flex gap-2">
                  <Icons.user />
                  User Information
                </p>
                <div className="flex flex-col gap-2">
                  <Label>First Name</Label>
                  <Input
                    readOnly
                    defaultValue={user.first_name}
                    placeholder="First Name"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Middle Name</Label>
                  <Input
                    readOnly
                    defaultValue={user.middle_name}
                    placeholder="Middle Name"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Last Name</Label>
                  <Input
                    readOnly
                    defaultValue={user.last_name}
                    placeholder="Last Name"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Email</Label>
                  <Input
                    readOnly
                    defaultValue={user.email}
                    placeholder="Email"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label>Role</Label>
                  <Input
                    readOnly
                    defaultValue={user.user_roles?.roles.role_name ?? "Guest"}
                    placeholder="Role"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label>Date of Joinning</Label>
                  <Input
                    readOnly
                    defaultValue={new Date(user.created_at).toLocaleDateString(
                      "en-GB"
                    )}
                    placeholder="Date of Joining"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </main>
  );
}
