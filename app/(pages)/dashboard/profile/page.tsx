"use server";
import React from "react";
import Image from "next/image";
import { AvatarPicker } from "@/components/ui/avatar-picker";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import Footer from "@/components/custom/Footer";
import { cookies } from "next/headers";
import { IUser } from "@/schema/UserSchema";
import { getFullNameOfUser } from "@/utils/Misc";
import { ICompany } from "@/schema/CompanySchema";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import TextCapsule from "@/components/custom/TextCapsule";
import CameraButton from "@/components/custom/Profile/CameraButton";
import ProfileEditButton from "@/components/custom/Profile/ProfileEditButton";

export default async function ProfilePage() {
  const user = JSON.parse(
    cookies().get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  const hasCompany =
    user.user_roles?.roles.role_name === "Employee" ||
    user.user_roles?.roles.role_name === "Company Admin";

  return (
    <main className="container flex flex-col gap-2">
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
              <AvatarPicker className="size-48 -mt-24 border border-muted-foreground/50 shadow-lg" />
              <ProfileEditButton />
            </div>
          </div>

          <div className="px-8 py-4 flex flex-col gap-2">
            <p className="flex-grow text-2xl font-bold">
              {getFullNameOfUser(user)}
            </p>
            {hasCompany && (
              <p className="flex-grow text-base flex gap-2 items-center">
                <Icons.company /> {user.usercompany?.companies?.company_name}
              </p>
            )}
            <div className="flex gap-2">
              <TextCapsule className="bg-green-500">
                <Icons.idCard />
                {user.user_roles?.roles.role_name}
              </TextCapsule>
              <TextCapsule className="bg-blue-500">
                <Icons.mail />
                {user.email}
              </TextCapsule>
            </div>

            {/* Profile completeness alert card */}
            <div className="bg-red-100 rounded-md p-4 flex flex-col gap-2 w-full md:w-1/2">
              <p className="text-xl font-semibold">
                Welcome, {getFullNameOfUser(user)}!
              </p>
              <p>
                You&apos;re almost there. Please provide the necessary
                information to complete setting up your profile and start making
                the most of HRMplify.
              </p>
              {/* <Progress
                  max={100}
                  value={progressValue}
                  className={`${
                    progressValue >= 80
                      ? "[&>*]:bg-green-500"
                      : progressValue >= 66
                      ? "[&>*]:bg-lime-500"
                      : progressValue >= 33
                      ? "[&>*]:bg-orange-500"
                      : "[&>*]:bg-red-500"
                  }`}
                /> */}

              <Button
                size="sm"
                className="bg-blue-500 hover:bg-blue-500 text-white rounded-full gap-2"
              >
                <Icons.todo />
                Comlplete Now (WIP)
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </main>
  );
}
