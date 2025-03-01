"use client";
import GradientBorderContainer from "@/components/ui/gradient-border-container";
import Icons from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./styles.css";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface IItem {
  title: string;
  bullets: React.JSX.Element[];
}

interface IFeature {
  section: string;
  subtitle: string;
  image: string;
  overlayImage?: string;
  overlayImgAlt?: string;
  imgAlt: string;
  items: IItem[];
}

export default function FeaturesPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sloganRef = useRef<HTMLHeadingElement>(null);

  const features: IFeature[] = [
    {
      section: "Compliance & Document Management",
      subtitle: "Stay Compliant, Stay Organised",
      image: "/landing-page/img-1.png",
      imgAlt: "Software Showcase #1",
      items: [
        {
          title: "Never Miss a Deadline or Regulation Update",
          bullets: [
            <>
              Reduce compliance risks by 100% with automated alerts for expiring
              documents and policy changes.
            </>,
            <>
              Avoid legal penalties with 100% up-to-date records and timely
              renewal reminders.
            </>,
          ],
        },
        {
          title: "Centralised & Secure Document Storage",
          bullets: [
            <>
              Store all essential documents in one place, cutting down document
              search time by <b>80%.</b>
            </>,
            <>Ensure data security and fully personalised controlled access.</>,
          ],
        },
        {
          title: "Full Transparency with Audit Trails",
          bullets: [
            <>
              Every document change is logged, creating a 100% traceable record
              for audits and regulatory checks.
            </>,
            <>
              Improve compliance tracking with instant access to version history
              and approval logs.
            </>,
          ],
        },
      ],
    },

    {
      section: "Absence & Leave Management",
      subtitle: "Clear, Simple, and Efficient",
      image: "/landing-page/img-4.png",
      imgAlt: "Software Showcase #4",
      items: [
        {
          title: "No More Confusion, No More Conflicts",
          bullets: [
            <>
              Reduce leave-related misunderstandings by <b>100%</b> with a
              real-time calendar showing who&apos;s off and when.
            </>,
            <>
              Minimise scheduling conflicts by <b>80%</b> to plan ahead and
              ensure proper coverage.
            </>,
          ],
        },
        {
          title: "Fast, Hassle-Free Approvals",
          bullets: [
            <>Leave requests go directly to the right person</>,
            <>
              No more chasing emails—automated workflows keep everything moving
              smoothly.
            </>,
          ],
        },
        {
          title: "Custom Leave Policies That Fit Your Business",
          bullets: [
            <>
              Set up 100% tailored leave policies to match your company&apos;s
              needs.
            </>,
            <>
              Generate accurate absence reports in seconds, helping you track
              trends and improve workforce planning.
            </>,
          ],
        },
      ],
    },
    {
      section: "Centralised Employee Database",
      subtitle: "",
      items: [
        {
          title: "Keep All Employee Information in One Place",
          bullets: [
            <>
              Store and manage <b>100%</b> of employee details in a single,
              secure system.
            </>,
            <>
              Reduce time spent searching for records by <b>80%</b> with quick
              and easy access.
            </>,
            <>
              Eliminate 90% of errors and duplicate entries by keeping
              everything in one place.
            </>,
          ],
        },
        {
          title: "Instant Updates, No Extra Work",
          bullets: [
            <>
              Save <b>100%</b> of your time with automatic updates across the
              system.
            </>,
            <>
              Reduce repetitive data entry by <b>100%</b>—update once, and it
              reflects everywhere.
            </>,
          ],
        },
        {
          title: "Safe and Secure",
          bullets: [
            <>
              Protect sensitive information with 256-bit encryption, the same
              level used by banks.
            </>,
            <>Control access with 100% customisable permission settings.</>,
            <>
              Keep employee data secure with 24/7 system monitoring and backup.
            </>,
          ],
        },
      ],
      image: "/landing-page/img-5.png",
      imgAlt: "Software Showcase #5",
    },
    {
      section: "Employee Self-Service & HR Efficiency",
      subtitle: "",
      image: "/landing-page/img-6.png",
      imgAlt: "Software Showcase #6",
      overlayImage: "/landing-page/img-7.png",
      overlayImgAlt: "Software Showcase #7",
      items: [
        {
          title: "Empower Employees, Reduce HR Workload",
          bullets: [
            <>
              Cut down HR queries by <b>100%</b> employees can check leave
              balances, payslips, and update personal details themselves.
            </>,
            <>
              Reduce waiting time by <b>90%</b> with instant access to essential
              information, improving employee satisfaction.
            </>,
          ],
        },
        {
          title: "Seamless Access Anytime, Anywhere",
          bullets: [
            <>
              Free up HR teams to focus on high-value tasks instead of handling
              repetitive requests.
            </>,
            <>
              Increase efficiency by 100% —no more delays or bottlenecks in HR
              processes.
            </>,
          ],
        },
        {
          title: "Less Admin Work, More Strategic Focus",
          bullets: [
            <>
              Set up <b>100%</b> tailored leave policies to match your
              company&apos;s needs.
            </>,
            <>
              Reduce manual data entry by <b>80%</b>, cutting down errors and
              improving overall productivity.
            </>,
          ],
        },
      ],
    },
  ];

  useGSAP(
    () => {
      // 1. Animate slogan words
      if (sloganRef.current) {
        const words = sloganRef.current.textContent?.split(" ") || [];
        sloganRef.current.innerHTML = words
          .map((word) => `<span class="word">${word}</span>`)
          .join(" ");

        gsap.to(sloganRef.current, { opacity: 1, duration: 0 });

        gsap.fromTo(
          ".word",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power3.out",
          }
        );
      }

      // 2 & 3. Animate preview images and feature cards
      gsap.utils.toArray(".feature-section").forEach((section: any, index) => {
        const imageContainer = section.querySelector(".image-container");
        const featureCard = section.querySelector(".feature-card");
        const direction = (index & 1) === 1 ? 1 : -1;

        // Image animation
        gsap.fromTo(
          imageContainer,
          { x: 100 * direction, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: imageContainer,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Feature card animation
        gsap.fromTo(
          featureCard,
          { x: -100 * direction, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: featureCard,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // 4. Animate bullet points
        const bulletItems = section.querySelectorAll(".bullet-item");
        gsap.fromTo(
          bulletItems,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: featureCard,
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
      className="flex flex-col gap-4 md:gap-8 min-h-screen items-center py-6 md:py-8"
    >
      {/* Slogan */}
      <h1
        ref={sloganRef}
        className="container text-xl sm:text-2xl md:text-3xl lg:text-6xl text-center font-extrabold slogan-text"
      >
        You Run Your Business, We&apos;ll Handle the HR 100% Compliance, 24/7
        Efficiency, and Seamless Operations
      </h1>

      {features.map((feat, fIdx) => (
        <section
          key={`feature-section-${fIdx}`}
          className={cn(
            "w-full py-8 md:py-16 flex flex-col gap-8 items-center justify-center feature-section",
            (fIdx & 1) == 0
              ? "from-[#f5561c]/[0.102] to-[#ffffff]/[0.102] bg-gradient-to-r"
              : "bg-white"
          )}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4 w-11/12 items-center justify-center">
            {/* Image preview */}
            <div
              className={cn(
                "relative rounded-[2rem] bg-white w-full order-1 image-container",
                (fIdx & 1) != 0 ? "lg:order-1" : "lg:-order-1"
              )}
            >
              <GradientBorderContainer className="rounded-[2rem] w-full h-fit">
                <Image
                  unoptimized
                  src={feat.image}
                  width={0}
                  height={0}
                  className="w-full object-contain object-center rounded-[2rem]"
                  alt={feat.imgAlt}
                />
              </GradientBorderContainer>

              {feat.overlayImage && (
                // gradient border container
                <GradientBorderContainer
                  className={cn(
                    "rounded-[2rem] w-full h-fit absolute top-[40%]",
                    (fIdx & 1) == 0 ? "-left-10" : "-right-10"
                  )}
                >
                  <Image
                    unoptimized
                    src={feat.overlayImage}
                    width={0}
                    height={0}
                    className="w-full object-contain object-center rounded-[2rem] z-10"
                    alt={feat.overlayImgAlt ?? "Software Showcase Overlay"}
                  />
                </GradientBorderContainer>
              )}
            </div>

            {/* Feature card */}
            <div className="flex flex-col gap-2 feature-card">
              <p className="text-xl sm:text-2xl md:text-3xl font-extrabold">
                {feat.section}
              </p>
              <p className="md:text-xl font-bold">{feat.subtitle}</p>
              {/* List of features */}
              <ul className="flex flex-col gap-4">
                {feat.items.map((featureItem, itmIdx) => (
                  <li
                    key={`section-${fIdx}-feature-${itmIdx}`}
                    className="from-[#bd1cc2]/[0.051] to-[#f5561c]/[0.15] bg-gradient-to-r rounded-xl px-8 py-2"
                  >
                    {/* Title */}
                    <p className="flex gap-1 font-extrabold lg:text-lg items-center">
                      <Icons.siteSparkle /> {featureItem.title}
                    </p>
                    {/* Bullet points */}
                    <ul className="list list-inside list-disc pl-6">
                      {featureItem.bullets.map((bullet, bullIdx) => (
                        <li
                          key={`section-${fIdx}-feature-${itmIdx}-bullet-${bullIdx}`}
                          className="list-item bullet-item"
                        >
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}
