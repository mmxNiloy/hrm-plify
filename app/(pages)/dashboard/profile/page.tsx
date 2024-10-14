import React from "react";
import Image from "next/image";
import { AvatarPicker } from "@/components/ui/avatar-picker";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import DashboardNavbar from "@/components/custom/Dashboard/Navbar/DashboardNavbar";
import Footer from "@/components/custom/Footer";

export default function ProfilePage() {
  return (
    <main className="bg-pink-50/75">
      <DashboardNavbar />

      <div className="container py-8">
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

              <Button
                className="rounded-full absolute top-6 right-6 shadow-lg bg-white hover:bg-white hover:text-sky-400 text-sky-500"
                size={"icon"}
              >
                <Icons.camera />
              </Button>

              <span className="w-full" style={{ aspectRatio: 4 / 1 }} />

              <div className="px-8 w-full flex flex-row items-end justify-between">
                <AvatarPicker className="size-48 -mt-24 border border-muted-foreground/50 shadow-lg" />
                <Button size="icon" variant={"ghost"} className="rounded-full">
                  <Icons.pencil />
                </Button>
              </div>
            </div>

            <div className="px-8 py-4 flex flex-col gap-2">
              <div className="flex felx-row gap-2">
                <p className="flex-grow text-2xl font-bold">John Doe</p>

                <p className="flex-grow text-lg font-semibold flex gap-2">
                  <Icons.company /> Example Company
                </p>
              </div>
              <p>Designation</p>
              <p>johndoe@company.com</p>
              <p>Example address</p>

              {/* Profile completeness alert card */}
              <div className="bg-red-100 rounded-md p-4 flex flex-col gap-2 w-full md:w-1/2">
                <p className="text-xl font-semibold">Welcome, John!</p>
                <p>
                  You&apos;re almost there. Please provide the necessary
                  information to complete setting up your profile and start
                  making the most of HRMplify.
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
                  Comlplete Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
