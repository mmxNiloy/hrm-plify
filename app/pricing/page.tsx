"use client";

import Icons from "@/components/ui/icons";
import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedText from "@/components/custom/AnimatedText";

gsap.registerPlugin(ScrollTrigger);

export default function PricingPage() {
  // Features for each plan
  const features = [
    {
      title: "Access to compliance software",
      plans: {
        essential: "yes",
        professional: "yes",
        enterprise: "yes",
      },
    },
    {
      title: "Sponsorship tracking",
      plans: {
        essential: "yes",
        professional: "yes",
        enterprise: "yes",
      },
    },
    {
      title: "Basic email support",
      plans: {
        essential: "yes",
        professional: "yes",
        enterprise: "yes",
      },
    },
    {
      title: "HR compliance consultation",
      plans: {
        essential: "no",
        professional: "Quarterly HR compliance consultation",
        enterprise: "Monthly HR compliance consultation",
      },
    },
    {
      title: "Assistance with Home Office audits",
      plans: {
        essential: "no",
        professional: "yes",
        enterprise: "yes",
      },
    },
    {
      title: "Priority email & phone support",
      plans: {
        essential: "no",
        professional: "yes",
        enterprise: "yes",
      },
    },
    {
      title: "Dedicated HR advisor",
      plans: {
        essential: "no",
        professional: "no",
        enterprise: "yes",
      },
    },
    {
      title: "Customized compliance strategy",
      plans: {
        essential: "no",
        professional: "no",
        enterprise: "yes",
      },
    },
    {
      title: "Employee visa sponsorship review",
      plans: {
        essential: "no",
        professional: "no",
        enterprise: "yes",
      },
    },
    {
      title: "Priority escalation handling",
      plans: {
        essential: "no",
        professional: "no",
        enterprise: "yes",
      },
    },
    {
      title: "Recruitment assistance",
      plans: {
        essential: "no",
        professional: "no",
        enterprise: "yes",
      },
    },
  ];

  // Additional considerations data
  const additionalConsiderations = [
    {
      title: "Customised Quotes",
      description:
        "For businesses with specific compliance needs, Revolo HR offers tailored pricing.",
      gradient: "from-[#017bce]/20 to-[#019e8f]/20",
      textColor: "#017bce",
    },
    {
      title: "Annual Discount",
      description:
        "10% discount for clients who opt for an annual subscription.",
      gradient: "from-[#e51cd8]/20 to-[#635be8]/20",
      textColor: "#635be8",
    },
    {
      title: "Onboarding Support",
      description: "Included in all plans at no extra cost.",
      gradient: "from-[#bd1cc2]/20 to-[#f5561c]/20",
      textColor: "#f5561c",
    },
    {
      title: "Flexibility",
      description: "Businesses can upgrade or downgrade at any time.",
      gradient: "from-[#017bce]/20 to-[#019e8f]/20",
      textColor: "#017bce",
    },
    {
      title: "Recruitment Assistance",
      description:
        "Support in finding suitable candidates for sponsored roles, guidance on compliance in hiring, and initial candidate screening (Enterprise Plan only).",
      gradient: "from-[#e51cd8]/20 to-[#635be8]/20",
      textColor: "#635be8",
    },
  ];

  // Function to split features and bold text after "+"
  const renderFeatures = (features: string) => {
    const parts = features.split(" + ");
    return (
      <>
        {parts.map((part, index) => (
          <span key={index}>
            {index > 0 && <span className="font-bold"> + </span>}
            <span className={index > 0 ? "font-bold" : ""}>{part}</span>
          </span>
        ))}
      </>
    );
  };

  // Function to render feature status
  const renderFeatureStatus = (status: "yes" | "no" | string) => {
    if (status === "yes")
      return <Icons.boxChecked className="text-green-500" />;
    if (status === "no") return <Icons.boxCrossed className="text-red-500" />;
    return <Icons.boxChecked className="text-green-500" />;
  };

  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Animate plans cards (slide in from left)
      const planCards = gsap.utils.toArray(".plan-card");
      gsap.fromTo(
        planCards,
        { x: -100, opacity: 0 }, // Initial state
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".plans-section",
            start: "top 80%",
          },
        }
      );

      // Animate additional considerations cards (slide in from bottom)
      const additionalCards = gsap.utils.toArray(".additional-card");
      gsap.fromTo(
        additionalCards,
        { y: 100, opacity: 0 }, // Initial state
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".additional-section",
            start: "top 80%",
          },
        }
      );
    },
    { scope: container }
  );

  return (
    <main
      ref={container}
      className="flex flex-col gap-4 md:gap-8 min-h-screen items-center justify-center py-6 md:py-8"
    >
      <div className="flex flex-col gap-0.5">
        <p className="text-2xl md:text-4xl lg:text-7xl font-extrabold bg-clip-text text-transparent from-[#e51cd8] to-[#635be8] bg-gradient-to-br">
          <AnimatedText>Plans</AnimatedText>
        </p>
        <span className="h-1 rounded-full w-full from-[#f5561c] to-[#bd1cc2] bg-gradient-to-br" />
      </div>

      <section className="plans-section w-11/12 *:max-w-lg flex flex-col md:flex-row gap-6 items-start justify-center">
        {/* Essential Plan Column */}
        <div className="plan-card w-full md:w-1/3 bg-gradient-to-br from-[#017bce]/20 to-[#019e8f]/20 backdrop-blur-sm rounded-2xl shadow-xl p-6 flex flex-col gap-4 opacity-0 -translate-x-[100px]">
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Essential
          </h2>
          <p className="text-xl font-semibold text-[#017bce] text-center">
            £75/month
          </p>
          <p className="text-gray-600 text-center">Up to 10 employees</p>
          <div className="flex flex-col gap-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="w-6 h-6 flex items-center justify-center">
                  {renderFeatureStatus(feature.plans.essential)}
                </span>
                <span className="text-gray-700">{feature.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Professional Plan Column - Popular Choice */}
        <div className="plan-card w-full md:w-1/3 bg-gradient-to-br from-[#e51cd8]/20 to-[#635be8]/20 backdrop-blur-md rounded-2xl shadow-xl p-6 flex flex-col gap-4 transition-all duration-300 hover:shadow-2xl relative opacity-0 -translate-x-[100px]">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#e51cd8] text-white text-sm font-semibold px-3 py-1 rounded-full">
            Most Popular
          </div>
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Professional
          </h2>
          <p className="text-xl font-semibold text-[#635be8] text-center">
            £150/month
          </p>
          <p className="text-gray-600 text-center">Up to 20 employees</p>
          <div className="flex flex-col gap-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="w-6 h-6 flex items-center justify-center">
                  {renderFeatureStatus(feature.plans.professional)}
                </span>
                <span className="text-gray-700">
                  {feature.plans.professional !== "yes" &&
                  feature.plans.professional !== "no" ? (
                    <>
                      <b>{feature.plans.professional.split(" ")[0]} </b>
                      {feature.plans.professional
                        .split(" ")
                        .filter((item, index) => index > 0)
                        .join(" ")}
                    </>
                  ) : (
                    feature.title
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Enterprise Plan Column - Highlighted */}
        <div className="plan-card w-full md:w-1/3 bg-gradient-to-br from-[#bd1cc2]/20 to-[#f5561c]/20 backdrop-blur-md rounded-2xl shadow-2xl p-6 flex flex-col gap-4 transform md:scale-105 transition-all duration-300 hover:shadow-3xl relative z-10 opacity-0 -translate-x-[100px]">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#f5561c] text-white text-sm font-semibold px-3 py-1 rounded-full">
            Best Value
          </div>
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Enterprise
          </h2>
          <p className="text-xl font-semibold text-[#f5561c] text-center">
            £250/month
          </p>
          <p className="text-gray-600 text-center">Up to 50 employees</p>
          <div className="flex flex-col gap-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="w-6 h-6 flex items-center justify-center">
                  {renderFeatureStatus(feature.plans.enterprise)}
                </span>
                <span className="text-gray-700">
                  {feature.plans.enterprise !== "yes" &&
                  feature.plans.enterprise !== "no" ? (
                    <>
                      <b>{feature.plans.enterprise.split(" ")[0]} </b>
                      {feature.plans.enterprise
                        .split(" ")
                        .filter((item, index) => index > 0)
                        .join(" ")}
                    </>
                  ) : (
                    feature.title
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose RevoloHR Section */}
      <section className="additional-section w-11/12 py-8">
        <div className="flex flex-col gap-0.5 mb-8 items-center">
          <p className="text-2xl md:text-4xl lg:text-6xl font-extrabold bg-clip-text text-transparent from-[#e51cd8] to-[#635be8] bg-gradient-to-br">
            <AnimatedText>Why Choose RevoloHR?</AnimatedText>
          </p>
          <span className="h-1 rounded-full w-1/4 from-[#f5561c] to-[#bd1cc2] bg-gradient-to-br" />
        </div>
        <div className="container grid grid-cols-12 lg:[&>*:nth-child(4)]:col-start-3 lg:[&>*:nth-child(5)]:col-start-7 gap-6">
          {additionalConsiderations.map((item, index) => (
            <div
              key={index}
              className={`additional-card col-span-full md:col-span-6 lg:col-span-4 bg-gradient-to-br ${item.gradient} backdrop-blur-sm rounded-xl p-6 flex flex-col gap-2 shadow-lg hover:shadow-xl transition-shadow opacity-0 translate-y-[100px]`}
            >
              <h3 className={`text-lg font-bold text-[${item.textColor}]`}>
                {item.title}
              </h3>
              <p className="text-gray-700 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
