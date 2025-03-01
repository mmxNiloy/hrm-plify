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
import "./styles.css";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface IFeatureItem {
  title: string;
  description: string;
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heading1Ref = useRef<HTMLParagraphElement>(null); // Section 1 heading
  const heading2Ref = useRef<HTMLParagraphElement>(null); // Section 2 heading
  const heading3Ref = useRef<HTMLParagraphElement>(null); // Section 3 heading
  const heading4Ref = useRef<HTMLParagraphElement>(null); // Section 4 heading
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
      // Heading animations (word-by-word)
      const animateHeading = (
        ref: React.RefObject<HTMLParagraphElement | null>
      ) => {
        if (ref.current) {
          const words = ref.current.textContent?.split(" ") || [];
          ref.current.innerHTML = words
            .map((word) => `<span class="word">${word}</span>`)
            .join(" ");

          gsap.to(ref.current, { opacity: 1, duration: 0 }); // Make heading visible
          gsap.fromTo(
            ref.current.querySelectorAll(".word"),
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.1,
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

      animateHeading(heading1Ref);
      animateHeading(heading2Ref);
      animateHeading(heading3Ref);
      animateHeading(heading4Ref);

      // Subheader animation (fade-in)
      const animateSubheader = (
        ref: React.RefObject<HTMLParagraphElement | null>
      ) => {
        if (ref.current) {
          gsap.to(ref.current, { opacity: 1, duration: 0 }); // Make visible instantly
          gsap.fromTo(
            ref.current,
            { opacity: 0 },
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
        gsap.to(section1Image, { opacity: 1, duration: 0 }); // Make visible instantly
        gsap.fromTo(
          section1Image,
          { opacity: 0 },
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
        gsap.to(image, { opacity: 1, duration: 0 }); // Make visible instantly
        gsap.fromTo(
          image,
          { x: -100, opacity: 0 },
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
        gsap.to(specialtiesContainer, { opacity: 1, duration: 0 });
        gsap.fromTo(
          specialtiesContainer,
          { x: 100, opacity: 0 },
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
        gsap.to(featuresContainer, { opacity: 1, duration: 0 });
        gsap.fromTo(
          featuresContainer,
          { x: 100, opacity: 0 },
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
        gsap.to(item, { opacity: 1, duration: 0 });
        gsap.fromTo(
          item,
          { y: 50, opacity: 0 },
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
        gsap.to(item, { opacity: 1, duration: 0 });
        gsap.fromTo(
          item,
          { opacity: 0 },
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
    //! New landing Page
    //#region New Landing P
    <main
      ref={containerRef}
      className="flex flex-col gap-4 md:gap-8 min-h-screen items-center py-6 md:py-8 lg:-mt-[8rem]"
    >
      {/* Section 1: Control & Compliance */}
      <section className="w-11/12 flex items-center justify-center min-h-screen overflow-clip rounded-[3.25rem] from-[#f5561c]/[0.102] to-[#bd1cc2]/[0.052] bg-gradient-to-bl relative lg:pt-40">
        <div className="absolute -left-[6.25%] -top-1/2 lg:-top-1/3 w-1/2 lg:w-1/3 aspect-square rounded-full from-[#f5561c]/[0.129] to-[#bd1cc2]/[0.129] bg-gradient-to-tr" />
        <div className="absolute -right-[6.25%] top-1/2 lg:top-1/3 w-1/2 lg:w-1/3 aspect-square rounded-full from-[#f5561c]/[0.129] to-[#bd1cc2]/[0.129] bg-gradient-to-tr" />
        <div className="flex flex-col gap-4 items-center justify-center self-center lg:pb-8 px-16">
          <p
            ref={heading1Ref}
            className="text-2xl md:text-4xl lg:text-7xl font-extrabold heading"
          >
            Control Compliance, Stress Less
          </p>
          <p
            ref={subheader1Ref}
            className="text-center font-semibold text-sm md:text-base lg:text-xl subheader"
          >
            The HR software that helps you manage, develop, and retain
            <br />
            your most valuable asset: your people.
          </p>
          <Link href={"/book-a-demo"} passHref>
            <Button className="hidden text-lg rounded-lg w-32 from-[#bd1cc2] to-[#f5561c] transition-colors hover:from-[#e528ec] hover:to-[#f36936] bg-gradient-to-r px-6 font-semibold">
              Join Us
            </Button>
          </Link>
          <GradientBorderContainer className="bg-white rounded-[2rem] w-10/12 h-fit z-10 section-1-image">
            <Image
              unoptimized
              src={"/landing-page/img-1.png"}
              width={0}
              height={0}
              className="rounded-[2rem] object-contain object-center z-20 w-full"
              alt={"System Showcase #1"}
            />
          </GradientBorderContainer>
        </div>
      </section>

      {/* Section 2: Client Trust(count) and Client Showcase */}
      <section className="flex flex-col gap-4">
        <p
          ref={heading2Ref}
          className="mt-16 text-xl md:text-3xl lg:text-6xl font-semibold text-center heading"
        >
          Companies that trust us with HR
        </p>
        <div className="w-full lg:container py-2">
          <CompanyCarousel />
        </div>
      </section>

      {/* Section 3: Our Specialties */}
      <section className="w-full py-8 md:py-16 flex flex-col gap-8 items-center justify-center from-[#e51cd8]/[0.051] to-[#635be8]/[0.051] bg-gradient-to-br">
        <p
          ref={heading3Ref}
          className="text-xl md:text-3xl lg:text-6xl font-semibold bg-clip-text text-transparent from-[#f5561c] to-[#bd1cc2] bg-gradient-to-br heading"
        >
          What makes us different?
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4 w-11/12 items-center justify-center">
          <GradientBorderContainer className="rounded-[2rem] w-full h-fit preview-image">
            <div className="w-full bg-white rounded-[2rem]">
              <Image
                unoptimized
                src={"/landing-page/img-2.png"}
                width={0}
                height={0}
                className="rounded-[2rem] w-full object-contain object-center px-4"
                alt={"System Showcase #2"}
              />
            </div>
          </GradientBorderContainer>
          <ul className="flex flex-col gap-4 specialties-container">
            {ourSpecialties.map((spec, index) => (
              <li
                key={`our-spec-list-item-${index}`}
                className="from-[#bd1cc2]/[0.051] to-[#f5561c]/[0.15] bg-gradient-to-r rounded-xl px-8 py-2 specialty-item"
              >
                <p className="flex gap-1 font-extrabold lg:text-lg items-center">
                  <Icons.siteSparkle /> {spec.title}
                </p>
                <p className="text-sm md:text-base pl-6">{spec.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Section 4: Our Features */}
      <>
        <div className="flex flex-col gap-0.5">
          <p
            ref={heading4Ref}
            className="text-xl md:text-3xl lg:text-6xl font-semibold bg-clip-text text-transparent from-[#e51cd8] to-[#635be8] bg-gradient-to-br heading"
          >
            Features
          </p>
          <span className="h-1 rounded-full w-full from-[#f5561c] to-[#bd1cc2] bg-gradient-to-br" />
        </div>
        <section className="w-11/12 rounded-[3.25rem] py-8 md:py-16 flex flex-col gap-8 items-center justify-center from-[#017bce]/[0.051] to-[#019e8f]/[0.051] bg-gradient-to-r">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4 w-11/12 items-center justify-center">
            <GradientBorderContainer className="rounded-[2rem] h-fit w-full preview-image">
              <div className="w-full bg-white rounded-[2rem]">
                <Image
                  unoptimized
                  src={"/landing-page/img-3.jpg"}
                  width={0}
                  height={0}
                  className="rounded-[2rem] w-full object-contain object-center px-4"
                  alt={"System Showcase #3"}
                />
              </div>
            </GradientBorderContainer>
            <div className="grid grid-cols-3 gap-4 features-container">
              {ourFeatures.map((feat, index) => (
                <div
                  key={`our-features-grid-item-${index}`}
                  className="flex flex-col items-center justify-center gap-2 min-h-16 text-balance text-center from-[#bd1cc2] to-[#f5561c] bg-gradient-to-r px-4 py-2 rounded-lg text-white feature-item"
                >
                  <p className="font-extrabold lg:text-lg">{feat.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </>
    </main>
    //#endregion
  );
}
