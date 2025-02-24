"use client";
import Icons from "@/components/ui/icons";
import Image from "next/image";
import SiteConfig from "@/utils/SiteConfig";
import AuthCard from "@/components/custom/Auth/AuthCard";
import Footer from "@/components/custom/Footer";
import CompanyCarousel from "@/components/custom/CompanyCarousel";
import CompanyCountText from "@/components/custom/CompanyCountText";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Home() {
  const logoRef = useRef(null);
  const authCardRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      logoRef.current,
      { scale: 1.25, opacity: 1 },
      { scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" }
    ).to(logoRef.current, { x: 0, duration: 0.8, ease: "power2.out" });

    tl.fromTo(
      authCardRef.current,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
      "-=0.5"
    );
  });

  return (
    //! New landing Page
    //#region New Landing P
    <main className="flex flex-col gap-4 md:gap-8 bg-[#241F21] min-h-screen items-center py-6 md:py-8">
      <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 gap-2 items-center flex-1">
        {/* Logo Here */}
        <div
          ref={logoRef}
          className="flex flex-col gap-6 items-center justify-center"
        >
          <Image
            src={"/site-logo-dark.svg"}
            priority
            unoptimized
            height={0}
            width={0}
            className="w-8/12"
            alt={`Revolo HR`}
          />

          <p className="from-blue-600 to-purple-500 bg-gradient-to-br text-white font-bold text-xl md:text-2xl xl:text-3xl rounded-md md:rounded-xl px-4 py-2">
            HR Simplified
          </p>
        </div>

        {/* Login form here */}
        <div ref={authCardRef}>
          <AuthCard />
        </div>
      </div>

      {/* Main Content: Company Count and Showcase */}
      <div className="container flex flex-col gap-4">
        <p className="mt-16 text-4xl font-extrabold text-center text-white">
          Clients That Have Trusted Us
          <br /> With Their HR
        </p>

        {/* <p className="text-white text-xl text-center">
          Here are some of our clients
        </p> */}

        <CompanyCarousel />
      </div>

      {/* Main Content: About S/W */}
      <div className="container text-white flex flex-col gap-8 items-center justify-center">
        <Image
          height={0}
          width={0}
          src={"/site-logo-dark.svg"}
          className="w-1/5 dark:invert"
          alt={`${SiteConfig.siteName} logo`}
        />
        <div className="px-32 flex flex-col gap-2 items-center">
          <p className="from-blue-600 to-purple-500 bg-gradient-to-br text-white font-bold text-xl md:text-2xl xl:text-3xl rounded-md md:rounded-xl px-4 py-2">
            HR Simplified
          </p>

          <p className="text-center text-xl font-semibold">
            {SiteConfig.siteName} delivers an exceptional HR management
            experience, equipping you and your team with the tools to excel in
            every aspect of human resources. From employee engagement to
            performance management, and from payroll to compliance,{" "}
            {SiteConfig.siteName} empowers organizations worldwide to create
            outstanding workplaces where people thrive.
          </p>
        </div>
      </div>

      {/* Footer Here */}
      <div className="flex items-center gap-8">
        <Link href={"#?_ref=RevoloHR"} passHref>
          <Icons.fb className="size-10 cursor-pointer fill-white" />
        </Link>

        <Link href={"#?_ref=RevoloHR"} passHref>
          <Icons.linkedin className="size-10 cursor-pointer fill-white" />
        </Link>

        <Link href={"#?_ref=RevoloHR"} passHref>
          <Icons.youtube className="size-10 cursor-pointer fill-white" />
        </Link>

        <Link href={"#?_ref=RevoloHR"} passHref>
          <Icons.instagram className="size-10 cursor-pointer fill-white" />
        </Link>
      </div>

      <Footer />
    </main>
    //#endregion
  );
}
