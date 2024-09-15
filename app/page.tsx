"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import LoginForm from "./Components/Auth/LoginForm";
import Icons from "@/components/ui/icons";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import Image from "next/image";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar/Navbar";
import Link from "next/link";
import RegistrationForm from "./Components/Auth/RegistrationForm";
import AuthCard from "./Components/Auth/AuthCard";
import SiteConfig from "@/utils/SiteConfig";

export default function Home() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [AutoScroll()]);
  return (
    <main>
      <Navbar />

      <div className="bg-[url('/blurred-hotel-reception-with-people-sitting.jpg')] bg-no-repeat gap-4 bg-center bg-cover flex flex-row px-16 py-8 h-[512px]">
        <div className="w-1/2 flex flex-col justify-center  rounded-[2rem] px-8 gap-2">
          <h1 className="text-4xl font-extrabold text-primary">
            Amplify your productivity with {SiteConfig.siteName}!
          </h1>
          <p className="font-semibold text-lg text-secondary-foreground">
            Enhance performance of your HR team and strengthen your people with
            sophisticated HR software
          </p>

          <div className="mt-8 flex flex-row items-center justify-center has-[input]:focus-within:ring-2 ring-offset-2 ring-primary rounded-full">
            <Input
              type="email"
              className="rounded-s-full ring-0 focus-visible:ring-0 focus:ring-0 focus-within:ring-0"
              placeholder="Enter your email"
            />

            <Button className="bg-blue-500 hover:bg-blue-400 text-white rounded-e-full ring-0 focus-visible:ring-0 focus:ring-0 focus-within:ring-0">
              Subscribe to our newsletter
            </Button>
          </div>
        </div>

        <div className="w-1/2 flex items-center justify-center">
          <AuthCard />
        </div>
      </div>

      <p className="mt-16 text-4xl font-extrabold text-center">
        We have XX+ users worldwide
      </p>
      <p className="text-muted-foreground text-xl text-center">
        Here are some of our clients
      </p>

      <div className="embla container" ref={emblaRef}>
        <div className="embla__container gap-4">
          {Array.from({ length: 15 }, (_, index) => index).map((item) => (
            <div
              className="embla__slide flex gap-1 px-2 py-4 bg-muted rounded-md"
              key={`customer-slide-${item}`}
            >
              <Icons.user /> Customer #{item + 1}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 bg-[url('/red-white-abstract-bg.jpg')] bg-cover bg-center flex flex-col gap-2 items-center justify-center">
        <Image
          height={0}
          width={0}
          src={"/site-logo.svg"}
          className="h-16 w-fit"
          alt={`${SiteConfig.siteName} logo`}
        />
        <div className="container px-32">
          <h1 className="text-4xl font-extrabold text-center text-rose-600">
            HR Simplified
          </h1>

          <p className="text-center text-xl font-semibold text-muted-foreground">
            {SiteConfig.siteName} delivers an exceptional HR management
            experience, equipping you and your team with the tools to excel in
            every aspect of human resources.
          </p>

          <p className="text-center text-xl font-semibold text-muted-foreground">
            From employee engagement to performance management, and from payroll
            to compliance, {SiteConfig.siteName} empowers organizations
            worldwide to create outstanding workplaces where people thrive.
          </p>
        </div>

        <div className="cursor-pointer bg-muted border-4 border-primary rounded-xl my-32 flex flex-col items-center justify-center h-64 aspect-video bg-no-repeat">
          <Icons.play className="size-16" />
        </div>
      </div>

      {/* <div className="p-8 bg-[url('/bg-white-yellow-shapes.jpg')] bg-cover bg-center bg-no-repeat grid grid-cols-2 gap-x-4 gap-y-32">
        <div className="flex flex-col gap-2 w-full">
          <Image
            unoptimized
            height={0}
            width={0}
            className="aspect-video rounded-2xl shadow-lg w-full object-cover object-center"
            alt={"Employees Stock Image"}
            src="/employees.jpg"
          />
          <div className="grid grid-cols-5 *:cursor-pointer *:text-green-500  has-[div]:rounded-2xl gap-1">
            <div className="flex flex-col gap-1 items-center">
              <Icons.users className="size-14 hover:size-16 transition-all" />
              <p className="text-lg font-semibold text-center">
                Employee Management
              </p>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <Icons.userSearch className="size-14 hover:size-16 transition-all" />
              <p className="text-lg font-semibold text-center">Recruitment</p>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <Icons.logout className="size-14 hover:size-16 transition-all" />
              <p className="text-lg font-semibold text-center">
                Leave Management
              </p>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <Icons.todo className="size-14 hover:size-16 transition-all" />
              <p className="text-lg font-semibold text-center">
                Attendance Tracking
              </p>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <Icons.receipt className="size-14 hover:size-16 transition-all" />
              <p className="text-lg font-semibold text-center">Receipt</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 justify-center">
          <p className="text-4xl font-extrabold">Employee & HR Management</p>
          <p className="text-lg font-semibold text-muted-foreground">
            We provide a wide range of Employee and HR management solutions
            tailored to your needs.
          </p>
          <Button
            variant={"link"}
            className="text-lg self-end w-min gap-2 items-center justify-center"
          >
            Learn more
            <Icons.chevronRight className="rounded-full size-6 bg-green-500 text-white" />{" "}
          </Button>
        </div>

        <div className="flex flex-col gap-2 justify-center">
          <p className="text-4xl font-extrabold">Administrative Tools</p>
          <p className="text-lg font-semibold text-muted-foreground">
            Administering and controlling your organization is a breeze with
            HRMplfy.
          </p>
          <Button
            variant={"link"}
            className="text-lg self-start w-min gap-2 items-center justify-center"
          >
            Learn more
            <Icons.chevronRight className="rounded-full size-6 bg-amber-500 text-white" />{" "}
          </Button>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <Image
            unoptimized
            height={0}
            width={0}
            className="aspect-video rounded-2xl shadow-lg w-full object-cover object-center"
            alt={
              "vecteezy_close-up-of-a-business-professional-using-a-calculator"
            }
            src="/vecteezy_close-up-of-a-business-professional-using-a-calculator_2261026.jpg"
          />
          <div className="grid grid-cols-4 *:cursor-pointer *:text-amber-500  has-[div]:rounded-2xl gap-1">
            <div className="flex flex-col gap-1 items-center">
              <Icons.cog className="size-14 hover:size-16 transition-all" />
              <p className="text-lg font-semibold text-center">Settings</p>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <Icons.userCog className="size-14 hover:size-16 transition-all" />
              <p className="text-lg font-semibold text-center">User Access</p>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <Icons.files className="size-14 hover:size-16 transition-all" />
              <p className="text-lg font-semibold text-center">
                Document Management
              </p>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <Icons.money className="size-14 hover:size-16 transition-all" />
              <p className="text-lg font-semibold text-center">Billing</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <Image
            unoptimized
            height={0}
            width={0}
            className="aspect-video rounded-2xl shadow-lg w-full object-cover object-center"
            alt={
              "vecteezy_close-up-of-a-business-professional-using-a-calculator"
            }
            src="/vecteezy_two-business-partners-presenting-a-new-project-at-work_1226591.jpg"
          />
          <div className="grid grid-cols-4 *:cursor-pointer *:text-blue-500  has-[div]:rounded-2xl gap-1">
            <div className="flex flex-col gap-1 items-center">
              <Icons.chart className="size-14 hover:size-16 transition-all" />
              <p className="text-lg font-semibold text-center">
                Organogram Chart
              </p>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <Icons.list className="size-14 hover:size-16 transition-all" />
              <p className="text-lg font-semibold text-center">
                Rota Scheduling
              </p>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <Icons.file className="size-14 hover:size-16 transition-all" />
              <p className="text-lg font-semibold text-center">
                Sponsor Compliance
              </p>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <Icons.calendar className="size-14 hover:size-16 transition-all" />
              <p className="text-lg font-semibold text-center">
                Task Management
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 justify-center">
          <p className="text-4xl font-extrabold">Planning & Compliance</p>
          <p className="text-lg font-semibold text-muted-foreground">
            Plan ahead and stay up-to-code.
          </p>
          <Button
            variant={"link"}
            className="text-lg self-start w-min gap-2 items-center justify-center"
          >
            Learn more
            <Icons.chevronRight className="rounded-full size-6 bg-blue-500 text-white" />{" "}
          </Button>
        </div>

        <div className="col-span-full flex flex-col items-center container">
          <p className="text-2xl font-bold">
            Do you want to elevate your business today?
          </p>
          <p className="text-lg text-muted-foreground">Join us today!</p>
          <Button className="rounded-full w-64 bg-green-500 hover:bg-green-400 text-white">
            Register
          </Button>
        </div>
      </div> */}

      <Footer />
    </main>
  );
}
