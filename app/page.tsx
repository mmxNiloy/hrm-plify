"use client";
import Icons from "@/components/ui/icons";
import CompanyCarousel from "@/components/custom/CompanyCarousel";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import GradientBorderContainer from "@/components/ui/gradient-border-container";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import AnimatedText from "@/components/custom/AnimatedText";
import SiteConfig from "@/utils/SiteConfig";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface IFeatureItem {
  title: string;
  description: string;
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const subheader1Ref = useRef<HTMLParagraphElement>(null); // Section 1 subheader

  // For what makes us different section
  const ourSpecialties: IFeatureItem[] = [
    {
      title: "Avoid Costly Civil Penalties",
      description:
        "Our software ensures thorough right-to-work checks, safeguarding your company from illegal working penalties.",
    },
    {
      title: "Prevent Sponsorship License Revocation/Suspension",
      description:
        "Stay ahead of Home Office regulations with our automated compliance tools, minimizing the risk of license downgrades, suspensions, or revocations.",
    },
    {
      title: "Eliminate Business Sanctions",
      description:
        "Maintain a spotless compliance record and avoid being banned from sponsoring migrant workers with our proactive monitoring and reporting features.",
    },
    {
      title: "One Software, Complete UK Home Office Compliance",
      description:
        "Don't leave your business vulnerable. Our all-in-one HR software provides the tools and insights you need to confidently navigate the complexities of UK immigration and employment law.",
    },
  ];

  // Our features section
  const ourFeatures: IFeatureItem[] = [
    { title: "Compliance & Document Management", description: "" },
    { title: "Absence & Leave Management", description: "" },
    { title: "Centralised Employee Database", description: "" },
    { title: "Employee Self-Service & HR Efficiency", description: "" },
    { title: "Effortless Onboarding & Offboarding", description: "" },
    { title: "Powerful Reporting & Analytics", description: "" },
    { title: "Sponsorship Tracking", description: "" },
    { title: "Rota and Holiday Managment", description: "" },
    { title: "Right to Work Checks", description: "" },
  ];

  useGSAP(
    () => {
      // Subheader animation (fade-in)
      const animateSubheader = (
        ref: React.RefObject<HTMLParagraphElement | null>
      ) => {
        if (ref.current) {
          gsap.fromTo(
            ref.current,
            { opacity: 0 }, // Match initial state
            {
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: ref.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      };

      animateSubheader(subheader1Ref);

      // 1. Section 1 Image: Fade-in
      const section1Image = document.querySelector(".section-1-image");
      if (section1Image) {
        gsap.fromTo(
          section1Image,
          { opacity: 0 }, // Match initial state
          {
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section1Image,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 2. All Preview Images: Slide in from left
      gsap.utils.toArray(".preview-image").forEach((image: any) => {
        gsap.fromTo(
          image,
          { x: -100, opacity: 0 }, // Match initial state
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: image,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // 3. Specialties and Features Containers: Slide in from right
      const specialtiesContainer = document.querySelector(
        ".specialties-container"
      );
      const featuresContainer = document.querySelector(".features-container");

      if (specialtiesContainer) {
        gsap.fromTo(
          specialtiesContainer,
          { x: 100, opacity: 0 }, // Match initial state
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: specialtiesContainer,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (featuresContainer) {
        gsap.fromTo(
          featuresContainer,
          { x: 100, opacity: 0 }, // Match initial state
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: featuresContainer,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 4. Each Specialty: Slide in from bottom in order
      gsap.utils.toArray(".specialty-item").forEach((item: any) => {
        gsap.fromTo(
          item,
          { y: 50, opacity: 0 }, // Match initial state
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: specialtiesContainer,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // 5. Each Feature: Fade in
      gsap.utils.toArray(".feature-item").forEach((item: any) => {
        gsap.fromTo(
          item,
          { opacity: 0 }, // Match initial state
          {
            opacity: 1,
            duration: 0.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: featuresContainer,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <main
      ref={containerRef}
      className="flex flex-col gap-4 md:gap-8 min-h-screen items-center py-6 md:py-8 lg:-mt-[8rem]"
    >
      {/* Section 1: Control & Compliance */}
      <section className="w-11/12 flex items-center justify-center overflow-clip rounded-[3.25rem] from-[#f5561c]/[0.102] to-[#bd1cc2]/[0.052] bg-gradient-to-bl relative lg:pt-40">
        <div className="absolute -left-[10%] -top-[40%] w-3/4 sm:w-1/2 lg:w-1/3 aspect-square rounded-full bg-gradient-to-tr from-[#f5561c]/[0.129] to-[#bd1cc2]/[0.129]" />
        <div className="absolute -right-[10%] top-[60%] w-3/4 sm:w-1/2 lg:w-1/3 aspect-square rounded-full bg-gradient-to-tr from-[#f5561c]/[0.129] to-[#bd1cc2]/[0.129]" />
        <div className="flex flex-col gap-4 items-center justify-center pb-8 pt-8 px-8 lg:pt-0">
          <p className="text-xl sm:text-2xl md:text-4xl lg:text-6xl xl:text-7xl font-extrabold text-center max-w-3xl">
            <AnimatedText>{SiteConfig.siteDescription}</AnimatedText>
          </p>
          {/* Uncomment and adjust if needed */}
          {/* <p ref={subheader1Ref} className="text-center text-xs sm:text-sm md:text-base lg:text-xl font-semibold opacity-0">
            The HR software that helps you manage, develop, and retain your most valuable asset: your people.
          </p> */}
          {/* <Link href={"/book-a-demo"} passHref>
            <Button className="text-sm sm:text-base md:text-lg rounded-lg w-28 sm:w-32 md:w-36 px-4 sm:px-6 font-semibold bg-gradient-to-r from-[#bd1cc2] to-[#f5561c] hover:from-[#e528ec] hover:to-[#f36936]">
              Join Us
            </Button>
          </Link> */}
          <GradientBorderContainer className="bg-white rounded-2xl w-full max-w-4xl lg:max-w-5xl z-10">
            <Image
              unoptimized
              src={"/landing-page/img-1.png"}
              width={0}
              height={0}
              className="rounded-2xl w-full h-auto object-contain"
              alt={"System Showcase #1"}
            />
          </GradientBorderContainer>
        </div>
      </section>

      {/* Section 2: Client Trust and Showcase */}
      <section className="flex flex-col gap-4 w-full px-4 sm:px-0 items-center">
        <p className="mt-8 sm:mt-12 md:mt-16 text-lg sm:text-xl md:text-3xl lg:text-5xl font-semibold text-center">
          <AnimatedText>Companies that trust us with HR</AnimatedText>
        </p>
        <div className="w-full md:w-11/12 lg:w-10/12">
          <CompanyCarousel />
        </div>
      </section>

      {/* Section 3: Our Specialties */}
      <section className="w-full py-6 sm:py-8 md:py-12 lg:py-16 flex flex-col gap-6 sm:gap-8 items-center bg-gradient-to-br from-[#e51cd8]/[0.051] to-[#635be8]/[0.051] px-4 sm:px-8">
        <p className="text-lg sm:text-xl md:text-3xl lg:text-5xl font-semibold text-center">
          <AnimatedText
            duration={0.5}
            scrollTriggerStart="top 80%"
            className="bg-clip-text bg-gradient-to-br from-[#f5561c] to-[#bd1cc2] text-transparent"
          >
            What makes us different?
          </AnimatedText>
        </p>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 w-full sm:w-11/12">
          <GradientBorderContainer className="rounded-2xl w-full h-fit self-center">
            <div className="bg-white rounded-2xl">
              <Image
                unoptimized
                src={"/landing-page/img-2.png"}
                width={0}
                height={0}
                className="rounded-2xl w-full h-auto object-contain px-2 sm:px-4"
                alt={"System Showcase #2"}
              />
            </div>
          </GradientBorderContainer>
          <ul className="flex flex-col gap-3 sm:gap-4">
            {ourSpecialties.map((spec, index) => (
              <li
                key={`our-spec-list-item-${index}`}
                className="bg-gradient-to-r from-[#bd1cc2]/[0.051] to-[#f5561c]/[0.15] rounded-xl p-4 sm:p-6"
              >
                <p className="flex gap-1 items-center font-extrabold text-sm sm:text-base md:text-lg">
                  <Icons.siteSparkle /> {spec.title}
                </p>
                <p className="text-xs sm:text-sm md:text-base pl-4 sm:pl-6">
                  {spec.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Section 4: Our Features */}
      <section className="w-full flex flex-col gap-6 sm:gap-8 px-4 sm:px-8">
        <div className="flex flex-col gap-0.5 w-fit self-center">
          <p className="text-lg sm:text-xl md:text-3xl lg:text-5xl font-semibold text-center">
            <AnimatedText
              duration={0.5}
              scrollTriggerStart="top 80%"
              className="bg-clip-text bg-gradient-to-br from-[#e51cd8] to-[#635be8] text-transparent"
            >
              Features
            </AnimatedText>
          </p>
          <span className="h-1 rounded-full w-full bg-gradient-to-br from-[#f5561c] to-[#bd1cc2]" />
        </div>
        <div className="flex flex-col w-full lg:w-11/12 rounded-[3.25rem] py-6 sm:py-8 md:py-12 lg:py-16 bg-gradient-to-r from-[#017bce]/[0.051] to-[#019e8f]/[0.051] self-center items-center justify-center">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 w-11/12 items-center justify-center">
            <GradientBorderContainer className="rounded-2xl w-full h-fit">
              <div className="bg-white rounded-2xl">
                <Image
                  unoptimized
                  src={"/landing-page/img-3.png"}
                  width={0}
                  height={0}
                  className="rounded-2xl w-full h-auto object-contain px-2 sm:px-4"
                  alt={"System Showcase #3"}
                />
              </div>
            </GradientBorderContainer>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {ourFeatures.map((feat, index) => (
                <div
                  key={`our-features-grid-item-${index}`}
                  className="flex flex-col items-center justify-center gap-2 text-center bg-gradient-to-r from-[#bd1cc2] to-[#f5561c] p-3 sm:p-4 rounded-lg text-white"
                >
                  <p className="font-extrabold text-xs sm:text-sm md:text-base lg:text-lg">
                    {feat.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
